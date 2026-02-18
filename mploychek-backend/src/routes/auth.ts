import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../data/store';
import { SECRET } from '../middleware/auth';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { userId, password, role } = req.body;

  if (!userId || !password || !role)
    return res.status(400).json({ message: 'userId, password and role are required' });

  const user = users.find(u => u.userId === userId && u.role === role);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, userId: user.userId, role: user.role },
    SECRET,
    { expiresIn: '8h' }
  );

  return res.json({
    token,
    user: { id: user.id, userId: user.userId, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
  });
});

export default router;