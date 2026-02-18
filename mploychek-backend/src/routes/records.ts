import { Router, Response } from 'express';
import { records } from '../data/store';
import { verifyToken, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  const delay = Math.min(parseInt(req.query['delay'] as string) || 0, 10000);

  await new Promise(resolve => setTimeout(resolve, delay));

  const user = req.user!;
  const filtered = user.role === 'Admin'
    ? records
    : records.filter(r => r.assignedTo === user.userId);

  return res.json({ delay, count: filtered.length, records: filtered });
});

router.get('/:id', verifyToken, (req: AuthRequest, res: Response) => {
  const record = records.find(r => r.id === req.params.id);
  if (!record) return res.status(404).json({ message: 'Record not found' });

  const user = req.user!;
  if (user.role !== 'Admin' && record.assignedTo !== user.userId)
    return res.status(403).json({ message: 'Access denied' });

  return res.json(record);
});

export default router;