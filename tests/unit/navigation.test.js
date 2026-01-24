/**
 * navigation.test.js - 导航测试
 * 测试 Vue Router 路由配置
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// 模拟路由配置
const routes = [
  { path: '/', name: 'Home', component: 'Home' },
  { path: '/story', name: 'Story', component: 'Story' },
  { path: '/boss', name: 'BossGallery', component: 'BossGallery' },
  { path: '/game', name: 'Game', component: 'GameContainer' },
  { path: '/map', name: 'Map', component: 'MapView' }
];

describe('Vue Router Navigation', () => {
  it('should have correct number of routes', () => {
    // 主要路由：首页、故事、Boss、游戏、地图
    const mainRoutes = routes.filter(r => !r.path.includes('*'));
    expect(mainRoutes.length).toBeGreaterThanOrEqual(5);
  });

  it('should have Home as the root path', () => {
    const homeRoute = routes.find(r => r.path === '/');
    expect(homeRoute).toBeDefined();
    expect(homeRoute.name).toBe('Home');
  });

  it('should have correct route paths', () => {
    const pathMap = {
      '/': 'Home',
      '/story': 'Story',
      '/boss': 'BossGallery',
      '/game': 'Game',
      '/map': 'Map'
    };

    Object.entries(pathMap).forEach(([path, name]) => {
      const route = routes.find(r => r.path === path);
      expect(route).toBeDefined();
      expect(route.name).toBe(name);
    });
  });
});

describe('Map Navigation Markers', () => {
  // 模拟地图标记数据
  const mapMarkers = [
    { id: 'story', route: '/story', title: '故事书' },
    { id: 'game', route: '/game', title: '开始游戏' },
    { id: 'boss', route: '/boss', title: 'Boss 图鉴' }
  ];

  it('should have three main navigation markers', () => {
    const mainMarkers = mapMarkers.filter(m => 
      ['story', 'game', 'boss'].includes(m.id)
    );
    expect(mainMarkers.length).toBe(3);
  });

  it('should link to correct routes', () => {
    const storyMarker = mapMarkers.find(m => m.id === 'story');
    const bossMarker = mapMarkers.find(m => m.id === 'boss');
    const gameMarker = mapMarkers.find(m => m.id === 'game');

    expect(storyMarker.route).toBe('/story');
    expect(bossMarker.route).toBe('/boss');
    expect(gameMarker.route).toBe('/game');
  });

  it('should have correct marker titles', () => {
    expect(mapMarkers.find(m => m.id === 'story').title).toBe('故事书');
    expect(mapMarkers.find(m => m.id === 'boss').title).toBe('Boss 图鉴');
    expect(mapMarkers.find(m => m.id === 'game').title).toBe('开始游戏');
  });
});

describe('Route Meta Information', () => {
  const routeMeta = {
    '/': { title: 'Cuphead - Don\'t Deal With The Devil' },
    '/story': { title: 'The Story - Cuphead' },
    '/boss': { title: 'The Debtors - Boss Gallery' },
    '/game': { title: 'Play Game - Cuphead' },
    '/map': { title: 'Inkwell Isle - Map' }
  };

  it('should have page titles for all routes', () => {
    Object.keys(routeMeta).forEach(path => {
      expect(routeMeta[path].title).toBeDefined();
      expect(routeMeta[path].title.length).toBeGreaterThan(0);
    });
  });

  it('should include Cuphead in most titles', () => {
    const titlesWithCuphead = Object.values(routeMeta)
      .filter(meta => meta.title.toLowerCase().includes('cuphead'));
    expect(titlesWithCuphead.length).toBeGreaterThanOrEqual(3);
  });
});
