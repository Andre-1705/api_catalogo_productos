import { AuthService } from '../services/auth.service.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y password son obligatorios' });
    }
    const result = await AuthService.login({ username, password });
    res.json(result);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ error: error.message });
  }
};

export const AuthController = { login };

