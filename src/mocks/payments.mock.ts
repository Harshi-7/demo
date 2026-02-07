// // payments.mock.ts
// import { PaymentStatus } from '../enums/PaymentStatus';

// export interface Payment {
//   id: number;
//   amount: number;
//   status: PaymentStatus;
//   walletId: number;
//   date: string;
//   reference?: string;
// }

// export const mockPayments: Payment[] = [
//   { 
//     id: 1, 
//     amount: 100, 
//     status: PaymentStatus.PENDING, 
//     walletId: 1, 
//     date: '2024-01-25T10:30:00',
//     reference: 'PAY001'
//   },
//   { 
//     id: 2, 
//     amount: 200, 
//     status: PaymentStatus.PROCESSING, 
//     walletId: 1, 
//     date: '2024-01-26T14:45:00',
//     reference: 'PAY002'
//   },
//   { 
//     id: 3, 
//     amount: 300, 
//     status: PaymentStatus.COMPLETED, 
//     walletId: 1, 
//     date: '2024-01-27T09:15:00',
//     reference: 'PAY003'
//   },
//   { 
//     id: 4, 
//     amount: 150, 
//     status: PaymentStatus.COMPLETED, 
//     walletId: 2, 
//     date: '2024-01-28T11:20:00',
//     reference: 'PAY004'
//   },
//   { 
//     id: 5, 
//     amount: 250, 
//     status: PaymentStatus.PENDING, 
//     walletId: 2, 
//     date: '2024-01-29T16:30:00',
//     reference: 'PAY005'
//   },
//   { 
//     id: 6, 
//     amount: 400, 
//     status: PaymentStatus.PROCESSING, 
//     walletId: 3, 
//     date: '2024-01-30T13:10:00',
//     reference: 'PAY006'
//   }
// ];

import { PaymentStatus } from '../enums/PaymentStatus';

export interface Payment {
  id: number;
  amount: number;
  status: PaymentStatus;
  walletId: number;
  date: string;
  reference?: string;
}

export const mockPayments: Payment[] = [
  {
    id: 1,
    amount: 100,
    status: PaymentStatus.PENDING,
    walletId: 1,
    date: '2024-01-25T10:30:00',
    reference: 'PAY001'
  }
];

