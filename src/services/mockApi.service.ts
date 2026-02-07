// // services/mockApi.service.ts
// import { mockUsers } from '../mocks/users.mock';
// import { mockWallets } from '../mocks/wallets.mock';
// import { mockPayments } from '../mocks/payments.mock';
// import { User } from '../mocks/users.mock';
// import { Wallet } from '../mocks/wallets.mock';
// import { Payment } from '../mocks/payments.mock';
// import { ApprovalStatus } from '../enums/ApprovalStatus';


// export class MockApiService {
//   static getUsers(): Promise<User[]> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         // Combine mock users with registered users
//         const registeredUsers = localStorage.getItem('registeredUsers');
//         let allUsers = [...mockUsers];
        
//         if (registeredUsers) {
//           allUsers = [...allUsers, ...JSON.parse(registeredUsers)];
//         }
        
//         resolve(allUsers);
//       }, 200);
//     });
//   }

//   static getWallets(): Promise<Wallet[]> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(mockWallets);
//       }, 200);
//     });
//   }

//   static getPayments(): Promise<Payment[]> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(mockPayments);
//       }, 200);
//     });
//   }

//   static createPayment(paymentData: {
//     amount: number;
//     walletId: number;
//     reference: string;
//   }): Promise<Payment> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const newPayment: Payment = {
//           id: Date.now(),
//           amount: paymentData.amount,
//           status: 'PENDING',
//           walletId: paymentData.walletId,
//           date: new Date().toISOString(),
//           reference: paymentData.reference
//         };
//         resolve(newPayment);
//       }, 300);
//     });
//   }

//   static updateUserApprovalStatus(
//     userId: number, 
//     status: ApprovalStatus, 
//     password?: string
//   ): Promise<{ success: boolean; message: string }> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         // Update in registered users (localStorage)
//         const storedUsers = localStorage.getItem('registeredUsers');
//         if (storedUsers) {
//           const users = JSON.parse(storedUsers);
//           const userIndex = users.findIndex((u: any) => u.id === userId);
          
//           if (userIndex !== -1) {
//             users[userIndex].approvalStatus = status;
//             if (password) {
//               users[userIndex].password = password;
//             }
//             localStorage.setItem('registeredUsers', JSON.stringify(users));
//           }
//         }
        
//         resolve({ 
//           success: true, 
//           message: `User status updated to ${status}` 
//         });
//       }, 300);
//     });
//   }

//   static createWallet(walletData: {
//     userId: number;
//     initialBalance: number;
//   }): Promise<Wallet> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const newWallet: Wallet = {
//           id: Date.now(),
//           userId: walletData.userId,
//           balance: walletData.initialBalance,
//           transactions: walletData.initialBalance > 0 ? [
//             {
//               id: 1,
//               amount: walletData.initialBalance,
//               type: 'DEPOSIT',
//               date: new Date().toISOString(),
//               description: 'Initial deposit'
//             }
//           ] : []
//         };
//         resolve(newWallet);
//       }, 300);
//     });
//   }

//   static updateWalletBalance(
//     walletId: number, 
//     amount: number
//   ): Promise<{ success: boolean; newBalance: number }> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         // In a real app, this would update the wallet in the backend
//         // For now, we'll just simulate success
//         resolve({ 
//           success: true, 
//           newBalance: amount // Simulated new balance
//         });
//       }, 300);
//     });
//   }

//   static updatePaymentStatus(
//     paymentId: number, 
//     status: string
//   ): Promise<{ success: boolean; message: string }> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({ 
//           success: true, 
//           message: `Payment ${paymentId} status updated to ${status}` 
//         });
//       }, 300);
//     });
//   }
// }

import { mockUsers, User } from '../mocks/users.mock';
import { mockWallets, Wallet } from '../mocks/wallets.mock';
import { mockPayments, Payment } from '../mocks/payments.mock';
import { ApprovalStatus } from '../enums/ApprovalStatus';

export class MockApiService {

  static getUsers(): Promise<User[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const registeredUsers = localStorage.getItem('registeredUsers');
        let allUsers = [...mockUsers];

        if (registeredUsers) {
          allUsers = [...allUsers, ...JSON.parse(registeredUsers)];
        }

        resolve(allUsers);
      }, 200);
    });
  }

  static getWallets(): Promise<Wallet[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockWallets), 200);
    });
  }

  static getPayments(): Promise<Payment[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockPayments), 200);
    });
  }

  static createPayment(paymentData: {
    amount: number;
    walletId: number;
    reference: string;
  }): Promise<Payment> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newPayment: Payment = {
          id: Date.now(),
          amount: paymentData.amount,
          status: 'PENDING',
          walletId: paymentData.walletId,
          date: new Date().toISOString(),
          reference: paymentData.reference
        };
        resolve(newPayment);
      }, 300);
    });
  }

  static updateUserApprovalStatus(
    userId: number,
    status: ApprovalStatus,
    password?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        const storedUsers = localStorage.getItem('registeredUsers');

        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const index = users.findIndex((u: any) => u.id === userId);

          if (index !== -1) {
            users[index].approvalStatus = status;
            if (password) users[index].password = password;
            localStorage.setItem('registeredUsers', JSON.stringify(users));
          }
        }

        resolve({
          success: true,
          message: `User status updated to ${status}`
        });
      }, 300);
    });
  }

  static updatePaymentStatus(
    paymentId: number,
    status: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Payment ${paymentId} status updated to ${status}`
        });
      }, 300);
    });
  }
}
