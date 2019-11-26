import Vue from 'vue';
import Router from 'vue-router';
import listners from './listners';
import initListners from './initListners';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      meta: {
        access: true,
      },
    },
    {
      name: 'registration',
      path: '/registration',
      meta: {
        access: true,
      },
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('@/views/Profile'),
    },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: () => import('@/views/Dashboard'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('@/views/Settings'),
    },
    {
      name: 'AnonimDashboard',
      path: '/fs/:token/:nickname',
      meta: {
        access: true,
      },
    },
    {
      path: '/*',
      redirect: '/dashboard',
    },
  ],
});

export default initListners(router, listners);
