import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { users, User } from '../data/store';
import { verifyToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', verifyToken, requireAdmin, (_req: AuthRequest, res: Response) => {
  res.json(users.map(({ password, ...u }) => u));
});

router.get('/me', verifyToken, (req: AuthRequest, res: Response) => {
  const user = users.find(u => u.id === req.user!.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...safe } = user;
  return res.json(safe);
});

router.post('/', verifyToken, requireAdmin, (req: AuthRequest, res: Response) => {
  const { userId, password, role, name, email } = req.body;
  if (!userId || !password || !role || !name || !email)
    return res.status(400).json({ message: 'All fields required' });

  if (users.find(u => u.userId === userId))
    return res.status(409).json({ message: 'User ID already exists' });

  const newUser: User = {
    id: uuid(), userId,
    password: bcrypt.hashSync(password, 10),
    role, name, email,
    createdAt: new Date().toISOString().split('T')[0],
  };
  users.push(newUser);
  const { password: _, ...safe } = newUser;
  return res.status(201).json(safe);
});

router.put('/:id', verifyToken, requireAdmin, (req: AuthRequest, res: Response) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });

  const { name, email, role, password } = req.body;
  const user = users[idx];
  users[idx] = {
    ...user,
    name: name || user.name,
    email: email || user.email,
    role: role || user.role,
    password: password ? bcrypt.hashSync(password, 10) : user.password,
  };
  const { password: _, ...safe } = users[idx];
  return res.json(safe);
});

router.delete('/:id', verifyToken, requireAdmin, (req: AuthRequest, res: Response) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  return res.json({ message: 'User deleted' });
});

export default router;