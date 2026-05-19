import { successResponse } from '../utils/response.js';

export class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const data = await this.authService.register(req.body);
      return successResponse(res, 201, 'Registration successful', data);
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const data = await this.authService.login(req.body);
      return successResponse(res, 200, 'Login successful', data);
    } catch (error) {
      return next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const user = this.authService.getProfile(req.user.id);
      return successResponse(res, 200, 'Profile fetched successfully', { user });
    } catch (error) {
      return next(error);
    }
  };
}
