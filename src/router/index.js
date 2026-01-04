/**
 * Vue Router Configuration
 * 路由配置文件
 */

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Cuphead - Don\'t Deal With The Devil' }
  },
  {
    path: '/story',
    name: 'Story',
    component: () => import('@/views/Story.vue'),
    meta: { title: 'The Story - Cuphead' }
  },
  {
    path: '/boss',
    name: 'BossGallery',
    component: () => import('@/views/BossGallery.vue'),
    meta: { title: 'The Debtors - Boss Gallery' }
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/GameContainer.vue'),
    meta: { title: 'Play Game - Cuphead' }
  },
  // 🗺️ 地图页面（成员1 临时添加，成员5 可调整）
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/MapView.vue'),
    meta: { title: 'Inkwell Isle - Map' }
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// 路由守卫：更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Cuphead';
  next();
});

export default router;
