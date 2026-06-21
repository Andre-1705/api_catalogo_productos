import jwt from 'jsonwebtoken';

const USERS = [
  { username: 'admin', password: '123456', role: 'admin' },
  { username: 'user', password: '123456', role: 'user' }
];

const login = async ({ username, password }) => {
  const user = USERS.find(u => u.username === username && 
                               u.password === password);
  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return { token, user: { username: user.username, role: user.role } };
};

export const AuthService = { login };

//Usuarios hardcodeados, contraseña en texto plano.
//El token incluye username y role, expira en 2 horas.