<template>
  <div class="map-view">
    <!-- 复古效果叠加层 -->
    <div class="retro-overlay">
      <div class="film-grain"></div>
      <div class="vignette"></div>
      <div class="scanlines"></div>
    </div>

    <div class="map-container">
      <!-- 多层视差背景：远景 → 中景 → 近景 -->
      <div
        v-for="(layer, idx) in layers"
        :key="layer.name"
        class="parallax-layer"
        :class="`parallax-layer--${layer.name}`"
        :style="layerStyles[idx]"
      >
        <div class="layer-placeholder" :data-layer="layer.name">
          {{ layer.label }}
        </div>
      </div>

      <!-- 地图主内容区域 -->
      <div class="map-content">
        <!-- 地图标题 -->
        <h1 class="map-title">Inkwell Isle</h1>

        <!-- 位置标记：后续可替换为 MapLocation 组件 -->
        <button
          v-for="marker in markers"
          :key="marker.id"
          class="marker"
          :class="`marker--${marker.type}`"
          :style="{ left: marker.x + '%', top: marker.y + '%' }"
          :aria-label="marker.title"
          @click="onMarkerClick(marker)"
          @mouseenter="onMarkerHover(marker, true)"
          @mouseleave="onMarkerHover(marker, false)"
        >
          <span class="marker__icon">{{ marker.icon }}</span>
          <span class="marker__tooltip">{{ marker.title }}</span>
        </button>

        <!-- 装饰性路径线条 -->
        <svg class="map-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            class="path-line"
            d="M15,25 Q30,40 50,55 T72,28"
            fill="none"
            stroke="var(--color-sepia)"
            stroke-width="0.3"
            stroke-dasharray="1,1"
          />
          <path
            class="path-line path-line--delayed"
            d="M50,55 Q40,60 30,65"
            fill="none"
            stroke="var(--color-sepia)"
            stroke-width="0.3"
            stroke-dasharray="1,1"
          />
        </svg>
      </div>
    </div>

    <!-- 底部装饰边框 -->
    <div class="map-border map-border--top"></div>
    <div class="map-border map-border--bottom"></div>
  </div>
</template>

<script setup>
/**
 * MapView.vue - 地图主页面组件
 * 成员1 核心任务：创建全屏地图容器与多层视差背景
 *
 * 功能：
 * 1. 全屏显示地图，支持多层视差背景
 * 2. 鼠标移动时产生视差效果（移动端禁用）
 * 3. 复古卡通风格（胶片噪点、渐晕、扫描线）
 * 4. 可点击的位置标记，支持悬停动画
 *
 * 素材路径约定：
 * - 地图背景：src/assets/images/map-background.jpg
 * - 视差层：src/assets/images/map-layers/map-bg-far.png, map-bg-mid.png, map-bg-near.png
 */

import { ref, onMounted, onBeforeUnmount } from 'vue'
import useMapParallax from '../hooks/useMapParallax.js'

// ==================== 视差层配置 ====================
const layers = [
  { name: 'far', src: '/src/assets/images/map-layers/map-bg-far.png', label: '🏔️ 远景层' },
  { name: 'mid', src: '/src/assets/images/map-layers/map-bg-mid.png', label: '☁️ 中景层' },
  { name: 'near', src: '/src/assets/images/map-layers/map-bg-near.png', label: '🌿 近景层' }
]

// ==================== 地图标记配置 ====================
// 后续可由成员4 的 mapLocations.js 替换
const markers = ref([
  { id: 'story', x: 15, y: 25, icon: '📖', title: '故事书', type: 'story' },
  { id: 'game', x: 50, y: 55, icon: '🎮', title: '开始游戏', type: 'game' },
  { id: 'boss1', x: 72, y: 28, icon: '💀', title: 'Boss 挑战', type: 'boss' },
  { id: 'boss2', x: 30, y: 65, icon: '👹', title: '恶魔领地', type: 'boss' },
  { id: 'boss3', x: 82, y: 60, icon: '🎪', title: '嘉年华', type: 'boss' }
])

// ==================== 视差效果 ====================
const { layerStyles, start, stop } = useMapParallax({
  layerCount: layers.length,
  mouseIntensity: 15,
  scrollIntensity: 0.03
})

// ==================== 事件处理 ====================
const activeMarker = ref(null)

function onMarkerClick(marker) {
  // 占位：成员5 可在此接入路由跳转或成员3 的模态框
  // eslint-disable-next-line no-console
  console.log('[MapView] 点击标记:', marker.id, marker.title)

  // 触发自定义事件（供父组件监听）
  // emit('marker-click', marker)
}

function onMarkerHover(marker, isHovering) {
  activeMarker.value = isHovering ? marker : null
}

// ==================== 生命周期 ====================
onMounted(() => {
  start()
  // eslint-disable-next-line no-console
  console.log('[MapView] 地图组件已挂载，视差效果已启动')
})

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
/* ==================== 容器样式 ==================== */
.map-view {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--color-bg, #1a1410);
}

.map-container {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      135deg,
      rgba(26, 20, 16, 0.3) 0%,
      transparent 50%,
      rgba(26, 20, 16, 0.3) 100%
    ),
    var(--color-bg-warm, #2a1f18) url('/src/assets/images/map-background.jpg') center/cover no-repeat;
}

/* ==================== 复古效果叠加层 ==================== */
.retro-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 100;
}

/* 胶片噪点效果 */
.film-grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.04;
  mix-blend-mode: overlay;
  animation: grain 0.5s steps(10) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(1%, 1%); }
  30% { transform: translate(-1%, 1%); }
  40% { transform: translate(1%, -1%); }
  50% { transform: translate(-1%, 0); }
  60% { transform: translate(1%, 0); }
  70% { transform: translate(0, 1%); }
  80% { transform: translate(0, -1%); }
  90% { transform: translate(1%, 1%); }
}

/* 渐晕效果 */
.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 50%,
    rgba(26, 20, 16, 0.4) 80%,
    rgba(26, 20, 16, 0.8) 100%
  );
}

/* 扫描线效果 */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
}

/* ==================== 视差层 ==================== */
.parallax-layer {
  position: absolute;
  inset: -20px; /* 扩展边界防止视差时露出边缘 */
  pointer-events: none;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.parallax-layer--far {
  z-index: 1;
  opacity: 0.6;
}

.parallax-layer--mid {
  z-index: 2;
  opacity: 0.8;
}

.parallax-layer--near {
  z-index: 3;
  opacity: 0.9;
}

/* 占位符样式（正式素材到位后可删除） */
.layer-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-sepia, #d4a574);
  opacity: 0.3;
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(212, 165, 116, 0.05) 50%,
    transparent 100%
  );
}

/* ==================== 地图内容区 ==================== */
.map-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
}

/* 地图标题 */
.map-title {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--header-font, 'Rye', serif);
  font-size: clamp(24px, 5vw, 48px);
  color: var(--color-cream, #f5e6c8);
  text-shadow:
    3px 3px 0 var(--color-rust, #8b4513),
    6px 6px 0 rgba(0, 0, 0, 0.3);
  letter-spacing: 0.1em;
  white-space: nowrap;
  animation: titleFloat 4s ease-in-out infinite;
}

@keyframes titleFloat {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-5px); }
}

/* ==================== 位置标记 ==================== */
.marker {
  position: absolute;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    var(--color-cream, #f5e6c8) 0%,
    var(--color-sepia, #d4a574) 100%
  );
  border: 3px solid var(--color-rust, #8b4513);
  border-radius: 50%;
  width: 56px;
  height: 56px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 0 0 2px rgba(245, 230, 200, 0.2),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  -webkit-tap-highlight-color: transparent;
  z-index: 20;
}

.marker:hover {
  transform: translate(-50%, -50%) scale(1.25) rotate(5deg);
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.4),
    0 0 20px var(--color-gold, #c9a227),
    inset 0 2px 4px rgba(255, 255, 255, 0.4);
  border-color: var(--color-gold, #c9a227);
}

.marker:active {
  transform: translate(-50%, -50%) scale(1.1);
}

.marker__icon {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
}

/* 标记类型特定样式 */
.marker--story {
  animation: markerPulse 3s ease-in-out infinite;
}

.marker--game {
  animation: markerPulse 3s ease-in-out infinite 0.5s;
  background: radial-gradient(
    circle,
    #ffeaa7 0%,
    var(--color-gold, #c9a227) 100%
  );
}

.marker--boss {
  animation: markerPulse 3s ease-in-out infinite 1s;
  background: radial-gradient(
    circle,
    #fab1a0 0%,
    var(--color-wine, #722f37) 100%
  );
  border-color: var(--color-red, #c41e3a);
}

@keyframes markerPulse {
  0%, 100% { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(201, 162, 39, 0.4); }
  50% { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 8px rgba(201, 162, 39, 0); }
}

/* 标记提示文字 */
.marker__tooltip {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--color-bg, #1a1410);
  color: var(--color-cream, #f5e6c8);
  padding: 6px 12px;
  border-radius: 6px;
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  border: 2px solid var(--color-sepia, #d4a574);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.marker__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--color-sepia, #d4a574);
}

.marker:hover .marker__tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ==================== 装饰路径 ==================== */
.map-paths {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.path-line {
  stroke-dashoffset: 100;
  animation: drawPath 3s ease forwards;
}

.path-line--delayed {
  animation-delay: 1.5s;
}

@keyframes drawPath {
  to { stroke-dashoffset: 0; }
}

/* ==================== 边框装饰 ==================== */
.map-border {
  position: absolute;
  left: 0;
  right: 0;
  height: 8px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-rust, #8b4513) 0px,
    var(--color-rust, #8b4513) 20px,
    var(--color-sepia, #d4a574) 20px,
    var(--color-sepia, #d4a574) 40px
  );
  z-index: 50;
}

.map-border--top {
  top: 0;
}

.map-border--bottom {
  bottom: 0;
}

/* ==================== 响应式适配 ==================== */
@media (max-width: 768px) {
  .marker {
    width: 44px;
    height: 44px;
  }

  .marker__icon {
    font-size: 18px;
  }

  .marker__tooltip {
    font-size: 12px;
    padding: 4px 8px;
  }

  .map-title {
    font-size: clamp(18px, 4vw, 32px);
  }
}

@media (max-width: 480px) {
  .marker {
    width: 36px;
    height: 36px;
  }

  .marker__icon {
    font-size: 14px;
  }

  .layer-placeholder {
    font-size: 16px;
  }
}

/* ==================== 减少动画（无障碍） ==================== */
@media (prefers-reduced-motion: reduce) {
  .film-grain,
  .marker,
  .marker--story,
  .marker--game,
  .marker--boss,
  .map-title,
  .path-line {
    animation: none;
  }

  .parallax-layer {
    transition: none;
  }
}
</style>
