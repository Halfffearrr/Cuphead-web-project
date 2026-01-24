<script setup>
/**
 * MapLocation.vue - 地图位置标记组件
 * 可复用的地图标记点，支持视差偏移和 SVG 图标
 */
import { computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  icon: { type: String, default: 'default' },
  title: { type: String, required: true },
  type: { type: String, default: 'default' },
  description: { type: String, default: '' },
  unlocked: { type: Boolean, default: true },
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 0 }
});

const emit = defineEmits(['click', 'hover']);

// 计算样式
const markerStyle = computed(() => ({
  left: `${props.x}%`,
  top: `${props.y}%`,
  transform: `translate(-50%, -50%) translate3d(${props.offsetX}px, ${props.offsetY}px, 0)`,
  opacity: props.unlocked ? 1 : 0.5,
  pointerEvents: props.unlocked ? 'auto' : 'none'
}));

function handleClick() {
  if (props.unlocked) {
    emit('click', { id: props.id, type: props.type });
  }
}

function handleHover(isHovering) {
  emit('hover', { id: props.id, isHovering });
}
</script>

<template>
  <button
    class="map-location"
    :class="[`map-location--${type}`, { 'map-location--locked': !unlocked }]"
    :style="markerStyle"
    :aria-label="title"
    :aria-disabled="!unlocked"
    :title="description || title"
    @click="handleClick"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
    @focus="handleHover(true)"
    @blur="handleHover(false)"
  >
    <!-- SVG 图标 -->
    <svg v-if="icon === 'story'" class="map-location__svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13zm-3 4h6v2h-6v-2zm0 4h6v2h-6v-2z"/>
    </svg>
    <svg v-else-if="icon === 'game'" class="map-location__svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
    <svg v-else-if="icon === 'boss'" class="map-location__svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
    </svg>
    <svg v-else-if="icon === 'skull'" class="map-location__svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12v4c0 1.1.9 2 2 2h1v-2H4v-4c0-4.41 3.59-8 8-8s8 3.59 8 8v4h-1v2h1c1.1 0 2-.9 2-2v-4c0-5.52-4.48-10-10-10zm-2 15v2h4v-2h-4zm-2-3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm10 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
    </svg>
    <svg v-else class="map-location__svg" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="8"/>
    </svg>
    
    <!-- 提示文字 -->
    <span class="map-location__tooltip">
      <span class="map-location__title">{{ title }}</span>
      <span v-if="description" class="map-location__desc">{{ description }}</span>
    </span>
    
    <!-- 锁定遮罩 -->
    <span v-if="!unlocked" class="map-location__lock">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.map-location {
  position: absolute;
  background: radial-gradient(circle, #f5e6c8 0%, #d4a574 100%);
  border: 3px solid #8b4513;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: 
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease,
    border-color 0.3s ease;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.35),
    inset 0 2px 6px rgba(255, 255, 255, 0.4);
  -webkit-tap-highlight-color: transparent;
  z-index: 20;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 弹簧入场动画 */
  animation: springMarkerEnter 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: calc(var(--marker-index, 0) * 0.12s);
  opacity: 0;
}

@keyframes springMarkerEnter {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0) translateY(30px);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2) translateY(-8px);
  }
  70% {
    transform: translate(-50%, -50%) scale(0.9) translateY(4px);
  }
  85% {
    transform: translate(-50%, -50%) scale(1.05) translateY(-2px);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) translateY(0);
  }
}

.map-location:hover,
.map-location:focus-visible {
  animation: rubberMarkerStretch 0.5s ease-out, pulse 3s ease-in-out infinite;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(201, 162, 39, 0.6);
  border-color: #c9a227;
  outline: none;
}

@keyframes rubberMarkerStretch {
  0% { transform: translate(-50%, -50%) scale(1); }
  30% { transform: translate(-50%, -50%) scaleX(1.25) scaleY(0.75); }
  40% { transform: translate(-50%, -50%) scaleX(0.85) scaleY(1.15); }
  50% { transform: translate(-50%, -50%) scaleX(1.1) scaleY(0.9); }
  65% { transform: translate(-50%, -50%) scaleX(0.95) scaleY(1.05); }
  75% { transform: translate(-50%, -50%) scaleX(1.02) scaleY(0.98); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

.map-location:active {
  transform: translate(-50%, -50%) scale(1.1);
}

/* SVG 图标 */
.map-location__svg {
  width: 28px;
  height: 28px;
  color: #1a1a1a;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
}

/* 类型样式 */
.map-location--story {
  animation: pulse 3s ease-in-out infinite;
}

.map-location--game {
  animation: pulse 3s ease-in-out infinite 0.5s;
  background: radial-gradient(circle, #ffeaa7 0%, #c9a227 100%);
  border-color: #a68320;
}

.map-location--boss,
.map-location--boss-point {
  animation: pulse 3s ease-in-out infinite 1s;
  background: radial-gradient(circle, #fab1a0 0%, #c41e3a 100%);
  border-color: #8b0000;
}

.map-location--boss .map-location__svg,
.map-location--boss-point .map-location__svg {
  color: #fff;
}

.map-location--boss-point {
  width: 48px;
  height: 48px;
}

.map-location--boss-point .map-location__svg {
  width: 22px;
  height: 22px;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35), inset 0 2px 6px rgba(255, 255, 255, 0.4); 
  }
  50% { 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35), 0 0 20px rgba(201, 162, 39, 0.5), inset 0 2px 6px rgba(255, 255, 255, 0.4); 
  }
}

/* 提示框 */
.map-location__tooltip {
  position: absolute;
  bottom: 110%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #1a1410;
  color: #f5e6c8;
  padding: 10px 16px;
  border-radius: 8px;
  font-family: 'Gloria Hallelujah', cursive;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.25s ease;
  border: 2px solid #d4a574;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 100;
}

.map-location__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: #d4a574;
}

.map-location__title {
  font-size: 14px;
  font-weight: bold;
}

.map-location__desc {
  font-size: 11px;
  opacity: 0.8;
}

.map-location:hover .map-location__tooltip,
.map-location:focus-visible .map-location__tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* 锁定状态 */
.map-location--locked {
  filter: grayscale(0.8);
  cursor: not-allowed;
}

.map-location__lock {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  background: #666;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-location__lock svg {
  width: 14px;
  height: 14px;
  color: #fff;
}

/* 响应式 */
@media (max-width: 768px) {
  .map-location {
    width: 48px;
    height: 48px;
  }

  .map-location__svg {
    width: 22px;
    height: 22px;
  }

  .map-location--boss-point {
    width: 40px;
    height: 40px;
  }

  .map-location--boss-point .map-location__svg {
    width: 18px;
    height: 18px;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .map-location {
    animation: none;
    transition: none;
  }
}
</style>
