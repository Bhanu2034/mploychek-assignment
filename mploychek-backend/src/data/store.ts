import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  userId: string;
  password: string;
  role: 'General User' | 'Admin';
  name: string;
  email: string;
  createdAt: string;
}

export interface Record {
  id: string;
  title: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  assignedTo: string;
  type: string;
  date: string;
}

export const users: User[] = [
  {
    id: uuid(),
    userId: 'admin01',
    password: bcrypt.hashSync('admin123', 10),
    role: 'Admin',
    name: 'Kalaivani Balaji',
    email: 'admin@mploychek.com',
    createdAt: '2025-01-01',
  },
  {
    id: uuid(),
    userId: 'user01',
    password: bcrypt.hashSync('user123', 10),
    role: 'General User',
    name: 'Bhanu Prakash',
    email: 'bhanu@mploychek.com',
    createdAt: '2025-03-15',
  },
  {
    id: uuid(),
    userId: 'user02',
    password: bcrypt.hashSync('user123', 10),
    role: 'General User',
    name: 'Arjun Sharma',
    email: 'arjun@mploychek.com',
    createdAt: '2025-06-10',
  },
];

export const records: Record[] = [
  { id: uuid(), title: 'Background Check — TCS Ltd',          status: 'Completed',   assignedTo: 'user01',  type: 'Employment Verification', date: '2026-01-10' },
  { id: uuid(), title: 'EPFO Verification — Infosys',         status: 'Pending',     assignedTo: 'user01',  type: 'EPFO Check',              date: '2026-02-01' },
  { id: uuid(), title: 'E-Court Record Check',                status: 'In Progress', assignedTo: 'user02',  type: 'Court Verification',      date: '2026-02-05' },
  { id: uuid(), title: 'Address Verification — Chennai',      status: 'Completed',   assignedTo: 'user02',  type: 'Address Check',           date: '2026-01-28' },
  { id: uuid(), title: 'Education Verification — Anna Univ',  status: 'Pending',     assignedTo: 'user01',  type: 'Education Check',         date: '2026-02-14' },
  { id: uuid(), title: 'Reference Check — Wipro',             status: 'In Progress', assignedTo: 'admin01', type: 'Reference Verification',  date: '2026-02-10' },
];