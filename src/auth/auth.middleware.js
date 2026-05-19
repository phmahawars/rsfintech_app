import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required',
      errors: null
    });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: Number(payload.sub),
      email: payload.email
    };

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      errors: null
    });
  }
};
