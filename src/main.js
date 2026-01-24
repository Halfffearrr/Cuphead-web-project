/**
 * Cuphead Web Project - Vue 3 Entry Point
 * Main application bootstrap file
 */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 导入全局样式
import './assets/styles/variables.css';
import './assets/styles/global.css';
import './assets/styles/effects.css';
import './assets/styles/animations.css';
import './assets/styles/motionEffects.css';

// 创建 Vue 应用
const app = createApp(App);

// 使用路由
app.use(router);

// 挂载到 DOM
app.mount('#app');

console.log('🎮 Cuphead Web Project initialized!');
