/**
 * Модуль роутера приложения
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import initListners from './initListners';
import listners from './listners';
import LoginPage from '@/views/LoginPage';

Vue.use(VueRouter);

const routes = [
  {
    name: 'login',
    path: '/login',
    meta: {
      access: true,
    },
    component: LoginPage,
  },
  {
    name: 'registration',
    path: '/registration',
    meta: {
      access: true,
    },
    component: LoginPage,
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
    component: () => import('@/views/AnonimDashboard'),
  },
  {
    path: '/*',
    redirect: '/dashboard',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default initListners(router, listners);
