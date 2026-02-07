// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Import Vuex store
import { Roles } from '../enums/Roles';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../components/users/UserList.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.ADMIN] }
  },
  {
    path: '/pending-approvals',
    name: 'PendingApprovals',
    component: () => import('../components/users/PendingApprovals.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.ADMIN] }
  },
  {
    path: '/wallets',
    name: 'Wallets',
    component: () => import('../components/wallets/WalletList.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.ADMIN] }
  },
  {
    path: '/wallet/:id',
    name: 'WalletDetail',
    component: () => import('../components/wallets/WalletDetail.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.CUSTOMER, Roles.ADMIN] }
  },
  {
    path: '/my-wallet',
    name: 'MyWallet',
    component: () => import('../components/wallets/WalletDetail.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.CUSTOMER] }
  },
  {
    path: '/payments',
    name: 'PaymentDashboard',
    component: () => import('../components/payments/PaymentDashboard.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.FINANCE_MANAGER] }
  },
  {
    path: '/finance-dashboard',
    name: 'FinanceDashboard',
    component: () => import('../components/payments/FinanceDashboard.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.FINANCE_MANAGER] }
  },
  {
    path: '/make-payment',
    name: 'MakePayment',
    component: () => import('../components/payments/PaymentForm.vue'),
    meta: { requiresAuth: true, allowedRoles: [Roles.CUSTOMER] }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Access Vuex store state
  const isAuthenticated = store.state.auth.isAuthenticated;
  const userRole = store.state.auth.userRole;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.allowedRoles && userRole) {
    if (to.meta.allowedRoles.includes(userRole)) {
      next();
    } else {
      // Redirect to appropriate page based on role
      switch (userRole) {
        case Roles.ADMIN:
          next('/users');
          break;
        case Roles.CUSTOMER:
          next('/my-wallet');
          break;
        case Roles.FINANCE_MANAGER:
          next('/finance-dashboard');
          break;
        default:
          next('/login');
      }
    }
  } else {
    next();
  }
});

export default router;