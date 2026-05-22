import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { randomUUID } from 'crypto';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './auth/auth.routes.js';
import { errorResponse } from './utils/response.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();

const normalizePath = (path) => {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
};

const getRouterPath = (regexp) => {
  if (!regexp?.source || regexp.fast_slash) {
    return '';
  }

  return regexp.source
    .replace('^\\/', '/')
    .replace('\\/?(?=\\/|$)', '')
    .replace(/\\\//g, '/')
    .replace(/\$$/, '');
};

const getValidationSchema = (routeStack = []) => {
  const schemaLayer = routeStack.find((layer) => layer.handle?.swaggerSchema);
  return schemaLayer?.handle?.swaggerSchema || null;
};

const collectRoutes = (stack, basePath = '') => {
  const routes = [];
 
  for (const layer of stack) {
    if (layer.route) {
      const path = normalizePath(`${basePath}${layer.route.path}`);
      const methods = Object.keys(layer.route.methods).map((method) => method.toUpperCase());
      const requestSchema = getValidationSchema(layer.route.stack);

      for (const method of methods) {
        routes.push({ method, path, requestSchema });
      }
    } else if (layer.name === 'router' && layer.handle?.stack) {
      const routerPath = getRouterPath(layer.regexp);
      routes.push(...collectRoutes(layer.handle.stack, normalizePath(`${basePath}${routerPath}`)));
    }
  }

  return routes
    .filter((route) => route.path.startsWith('/api/'))
    .filter((route) => !route.path.startsWith('/api-docs'));
};

const getExampleValue = (name, schema) => {
  if (name === 'name') return 'Harsh Kumar';
  if (name === 'email') return 'harsh@example.com';
  if (name === 'phone') return '9999999999';
  if (name === 'password') return 'password123';
  if (name === 'confirm_password') return 'password123';
  if (schema.type === 'number') return 1;
  if (schema.type === 'boolean') return true;
  if (schema.type === 'array') return [];
  if (schema.type === 'object') return {};
  return 'string';
};

const mapJoiType = (type) => {
  if (type === 'number') return 'number';
  if (type === 'boolean') return 'boolean';
  if (type === 'array') return 'array';
  if (type === 'object') return 'object';
  return 'string';
};

const applyJoiRules = (openApiSchema, joiSchema) => {
  for (const rule of joiSchema.rules || []) {
    if (rule.name === 'min' && joiSchema.type === 'string') {
      openApiSchema.minLength = rule.args?.limit;
    }

    if (rule.name === 'max' && joiSchema.type === 'string') {
      openApiSchema.maxLength = rule.args?.limit;
    }

    if (rule.name === 'email') {
      openApiSchema.format = 'email';
    }

    if (rule.name === 'pattern' && rule.args?.regex) {
      openApiSchema.pattern = String(rule.args.regex).replace(/^\/|\/$/g, '');
    }
  }
};

const convertJoiToOpenApi = (joiSchema) => {
  if (!joiSchema) {
    return {
      schema: {
        type: 'object',
        additionalProperties: true
      },
      example: {}
    };
  }

  if (joiSchema.type !== 'object') {
    const schema = { type: mapJoiType(joiSchema.type) };
    applyJoiRules(schema, joiSchema);
    return { schema, example: getExampleValue('value', schema) };
  }

  const properties = {};
  const required = [];
  const example = {};

  for (const [key, value] of Object.entries(joiSchema.keys || {})) {
    const propertySchema = {
      type: mapJoiType(value.type)
    };

    applyJoiRules(propertySchema, value);

    if (value.flags?.presence === 'required') {
      required.push(key);
    }

    properties[key] = propertySchema;
    example[key] = getExampleValue(key, propertySchema);
  }

  const schema = {
    type: 'object',
    properties,
    additionalProperties: false,
    ...(required.length > 0 ? { required } : {})
  };

  return { schema, example };
};

const buildSwaggerSpec = () => {
  const paths = {};
  const routes = collectRoutes(app._router?.stack || []);

  for (const route of routes) {
    const tag = route.path.split('/')[2] || 'API';
    const method = route.method.toLowerCase();
    const needsBody = ['post', 'put', 'patch'].includes(method);
    const isPublicAuthRoute = ['/api/auth/login', '/api/auth/register'].includes(route.path);
    const requestBody = convertJoiToOpenApi(route.requestSchema);

    paths[route.path] = paths[route.path] || {};
    paths[route.path][method] = {
      tags: [tag.charAt(0).toUpperCase() + tag.slice(1)],
      summary: `${route.method} ${route.path}`,
      ...(isPublicAuthRoute ? {} : { security: [{ bearerAuth: [] }] }),
      ...(needsBody
        ? {
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    ...requestBody.schema
                  },
                  example: requestBody.example
                }
              }
            }
          }
        : {}),
      responses: {
        200: {
          description: 'Successful response'
        },
        201: {
          description: 'Created successfully'
        },
        401: {
          description: 'Unauthorized'
        },
        422: {
          description: 'Validation failed'
        },
        500: {
          description: 'Internal server error'
        }
      }
    };
  }

  return {
    openapi: '3.0.0',
    info: {
      title: 'RSFintech API',
      version: '1.0.0',
      description: 'Auto-generated API documentation from Express routes.'
    },
    servers: [
      {
        url: process.env.API_BASE_URL || '/',
        description: 'Current server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths
  };
};

app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader('X-Request-Id', req.requestId);
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'RSFintech API Running Successfully'
  });
});

app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API is healthy',
    data: {
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

app.use('/api/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(buildSwaggerSpec(), {
  customSiteTitle: 'RSFintech API Docs',
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true
  }
}));

app.use((req, res) => {
  return errorResponse(res, 404, 'Route not found');
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  const isServerError = statusCode >= 500;
  const isInvalidJson = error.type === 'entity.parse.failed';
  const message = isInvalidJson
    ? 'Invalid JSON payload'
    : isServerError && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message;

  const logMeta = {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message: error.message,
    stack: error.stack,
    code: error.code,
    errno: error.errno,
    sqlState: error.sqlState,
    sqlMessage: error.sqlMessage
  };

  if (isServerError) {
    logger.error('Request failed', logMeta);
  } else {
    logger.warn('Request rejected', logMeta);
  }

  const errors = process.env.NODE_ENV === 'production'
    ? { requestId: req.requestId }
    : {
        requestId: req.requestId,
        code: error.code || null
      };

  return errorResponse(res, statusCode, message, errors);
});

export default app;
