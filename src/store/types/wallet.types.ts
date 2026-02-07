export interface Transaction {
  id: number;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  date: string;
  description: string;
}

export interface Wallet {
  id: number;
  userId: number;
  balance: number;
  transactions: Transaction[];
}