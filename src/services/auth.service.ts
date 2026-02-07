// services/auth.service.ts
import { Roles } from '../enums/Roles';
import { mockUsers } from '../mocks/users.mock';
import { ApprovalStatus } from '../enums/ApprovalStatus';

export interface AuthResponse {
  role: Roles;
  name: string;
  id: number;
  email: string;
  token: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        // First check hardcoded demo users
        const demoUser = mockUsers.find(u => 
          u.email === email && 
          u.password === password && 
          u.approvalStatus === ApprovalStatus.APPROVED
        );
        
        if (demoUser) {
          resolve({ 
            role: demoUser.role, 
            name: demoUser.name, 
            id: demoUser.id,
            email: demoUser.email,
            token: `jwt-token-${demoUser.id}-${Date.now()}`
          });
          return;
        }

        // Then check dynamically registered users (in localStorage or store)
        // First, try to get from localStorage (persisted users)
        const storedUsers = localStorage.getItem('registeredUsers');
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const registeredUser = users.find((u: any) => 
            u.email === email && 
            u.password === password && 
            u.approvalStatus === ApprovalStatus.APPROVED
          );
          
          if (registeredUser) {
            resolve({ 
              role: registeredUser.role, 
              name: registeredUser.name, 
              id: registeredUser.id,
              email: registeredUser.email,
              token: `jwt-token-${registeredUser.id}-${Date.now()}`
            });
            return;
          }
        }

        // If not found in any storage
        resolve(null);
      }, 300);
    });
  }

  static async register(userData: { 
    name: string; 
    email: string; 
    password: string; 
    role?: Roles 
  }): Promise<{ success: boolean; message: string; userId?: number }> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Check if user already exists
        const existingUsers = [...mockUsers];
        const storedUsers = localStorage.getItem('registeredUsers');
        if (storedUsers) {
          existingUsers.push(...JSON.parse(storedUsers));
        }
        
        const userExists = existingUsers.some(u => u.email === userData.email);
        
        if (userExists) {
          resolve({ 
            success: false, 
            message: 'User with this email already exists' 
          });
          return;
        }
        
        // Create new user
        const newUserId = Math.max(...existingUsers.map(u => u.id)) + 1;
        const newUser = {
          id: newUserId,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role || Roles.CUSTOMER,
          approvalStatus: ApprovalStatus.PENDING,
          createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        let registeredUsers = [];
        const stored = localStorage.getItem('registeredUsers');
        if (stored) {
          registeredUsers = JSON.parse(stored);
        }
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        resolve({ 
          success: true, 
          message: 'Registration successful. Please wait for admin approval.',
          userId: newUserId
        });
      }, 300);
    });
  }

  static logout(): void {
    // Clear authentication - handled by Vuex store
  }

  static async checkAuth(): Promise<AuthResponse | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Check localStorage for stored auth
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          const parsedData = JSON.parse(userData);
          resolve({
            ...parsedData,
            token
          });
        } else {
          resolve(null);
        }
      }, 100);
    });
  }
}