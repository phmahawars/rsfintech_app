const redactKeys = ['password', 'token', 'secret', 'authorization', 'cookie'];

const redact = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.entries(value).reduce((result, [key, item]) => {
    const shouldRedact = redactKeys.some((redactKey) => key.toLowerCase().includes(redactKey));
    result[key] = shouldRedact ? '[REDACTED]' : item;
    return result;
  }, {});
};

const write = (level, message, meta = null) => {
  const payload = {
    level,
    time: new Date().toISOString(),
    message,
    ...(meta ? { meta: redact(meta) } : {})
  };

  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  console.log(line);
};

export const logger = {
  info(message, meta) {
    write('info', message, meta);
  },

  warn(message, meta) {
    write('warn', message, meta);
  },

  error(message, meta) {
    write('error', message, meta);
  }
};
