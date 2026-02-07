import { ApprovalStatus } from '../../enums/ApprovalStatus';
import { Roles } from '../../enums/Roles';

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