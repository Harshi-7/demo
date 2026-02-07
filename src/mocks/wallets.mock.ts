// wallet.mock.ts
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

export const mockWallets: Wallet[] = [
  {
    id: 1,
    userId: 2, // John Doe's wallet
    balance: 10000,
    transactions: [
      { 
        id: 1, 
        amount: 5000, 
        type: 'DEPOSIT', 
        date: '2024-01-15T10:30:00',
        description: 'Initial deposit'
      },
      { 
        id: 2, 
        amount: 2000, 
        type: 'WITHDRAWAL', 
        date: '2024-01-20T14:45:00',
        description: 'ATM withdrawal'
      },
      { 
        id: 3, 
        amount: 7000, 
        type: 'DEPOSIT', 
        date: '2024-01-25T09:15:00',
        description: 'Salary deposit'
      }
    ]
  },
  {
    id: 2,
    userId: 3, // Finance Manager's wallet
    balance: 15000,
    transactions: [
      { 
        id: 4, 
        amount: 8000, 
        type: 'DEPOSIT', 
        date: '2024-01-10T11:20:00',
        description: 'Initial deposit'
      },
      { 
        id: 5, 
        amount: 3000, 
        type: 'WITHDRAWAL', 
        date: '2024-01-18T15:30:00',
        description: 'Office expenses'
      },
      { 
        id: 6, 
        amount: 10000, 
        type: 'DEPOSIT', 
        date: '2024-01-22T13:10:00',
        description: 'Company transfer'
      }
    ]
  },
  {
    id: 3,
    userId: 4, // Pending User's wallet (no transactions yet)
    balance: 0,
    transactions: []
  },
  {
    id: 4,
    userId: 5, // Rejected User's wallet
    balance: 0,
    transactions: []
  },
  {
    id: 5,
    userId: 6, // Another Customer's wallet
    balance: 5000,
    transactions: [
      { 
        id: 7, 
        amount: 5000, 
        type: 'DEPOSIT', 
        date: '2024-01-15T16:20:00',
        description: 'Initial deposit'
      }
    ]
  }
];