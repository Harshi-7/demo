// users.mock.ts
import { ApprovalStatus } from '../enums/ApprovalStatus';
import { Roles } from '../enums/Roles';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Roles;
  password?: string;
  bankAccount?: string;
  bankName?: string;
  ifsc?: string;
  approvalStatus: ApprovalStatus;
  createdAt?: string;
}

export const mockUsers: User[] = [
  { 
    id: 1, 
    name: 'Admin User', 
    email: 'admin@test.com', 
    role: Roles.ADMIN, 
    password: 'admin123',
    approvalStatus: ApprovalStatus.APPROVED,
    createdAt: '2024-01-01T10:00:00'
  },
  { 
    id: 2, 
    name: 'John Doe', 
    email: 'john@test.com', 
    role: Roles.CUSTOMER,
    password: 'customer123',
    bankAccount: '1234567890',
    bankName: 'State Bank',
    ifsc: 'SBIN0001234',
    approvalStatus: ApprovalStatus.APPROVED,
    createdAt: '2024-01-02T14:30:00'
  },
  { 
    id: 3, 
    name: 'Finance Manager', 
    email: 'finance@test.com', 
    role: Roles.FINANCE_MANAGER,
    password: 'finance123',
    approvalStatus: ApprovalStatus.APPROVED,
    createdAt: '2024-01-03T09:15:00'
  },
  { 
    id: 4, 
    name: 'Pending User', 
    email: 'pending@test.com', 
    role: Roles.CUSTOMER,
    bankAccount: '9876543210',
    bankName: 'HDFC Bank',
    ifsc: 'HDFC0005678',
    approvalStatus: ApprovalStatus.PENDING,
    createdAt: '2024-01-25T16:45:00'
  },
  { 
    id: 5, 
    name: 'Rejected User', 
    email: 'rejected@test.com', 
    role: Roles.CUSTOMER,
    bankAccount: '4567890123',
    bankName: 'ICICI Bank',
    ifsc: 'ICIC0007890',
    approvalStatus: ApprovalStatus.REJECTED,
    createdAt: '2024-01-20T11:20:00'
  },
  { 
    id: 6, 
    name: 'Another Customer', 
    email: 'customer2@test.com', 
    role: Roles.CUSTOMER,
    password: 'password123',
    bankAccount: '2345678901',
    bankName: 'Axis Bank',
    ifsc: 'UTIB0004567',
    approvalStatus: ApprovalStatus.APPROVED,
    createdAt: '2024-01-15T13:10:00'
  }
];