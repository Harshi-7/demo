import { PaymentStatus } from '../../enums/PaymentStatus';

export interface Payment {
  id: number;
  amount: number;
  status: PaymentStatus;
  walletId: number;
  date: string;
  reference?: string;
}