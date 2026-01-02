<script setup>
/**
 * Navigation.vue - 顶部导航栏组件
 * 像素风格复古导航
 */
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const navItems = [
  { path: '/', label: 'HOME' },
  { path: '/story', label: 'STORY' },
  { path: '/boss', label: 'BOSSES' },
  { path: '/game', label: 'PLAY' }
];

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <nav class="top-nav">
    <RouterLink 
      v-for="item in navItems" 
      :key="item.path"
      :to="item.path"
      :class="{ active: isActive(item.path) }"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.top-nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9998;
  display: flex;
  gap: 40px;
  background: rgba(42, 31, 24, 0.95);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 15px 40px;
  border: 4px solid var(--color-sepia, #d4a574);
  box-shadow: inset 0 0 0 2px var(--color-rust, #8b4513), 0 8px 20px rgba(0, 0, 0, 0.7);
}

.top-nav a {
  color: var(--color-sepia, #d4a574);
  text-decoration: none;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  transition: all 0.2s ease;
  position: relative;
  padding: 8px 15px;
  border: 2px solid transparent;
}

.top-nav a::before {
  content: '>';
  position: absolute;
  left: 0;
  opacity: 0;
  transition: all 0.2s;
  color: var(--color-gold, #c9a227);
}

.top-nav a:hover,
.top-nav a.active {
  color: var(--color-cream, #f5e6c8);
  background: rgba(201, 162, 39, 0.1);
  border-color: var(--color-gold, #c9a227);
}

.top-nav a:hover::before,
.top-nav a.active::before {
  opacity: 1;
  left: -15px;
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
