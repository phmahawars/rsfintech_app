import dotenv from 'dotenv';
import app from './app.js';
import { initializeContainer } from './bootstrap/container.js';

dotenv.config();

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }

    await initializeContainer();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();