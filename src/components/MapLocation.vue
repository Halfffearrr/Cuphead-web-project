<template>
  <div 
    class="map-location"
    :style="locationStyle"
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img :src="icon" :alt="title" class="location-icon" />
    <div v-if="isHovered" class="location-tooltip">{{ title }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 接收父组件传来的数据
const props = defineProps({
  x: {
    type: Number,
    required: true,
    default: 50
  },
  y: {
    type: Number,
    required: true,
    default: 50
  },
  icon: {
    type: String,
    required: true,
    default: ''
  },
  title: {
    type: String,
    default: '未命名位置'
  }
})

// 定义点击事件
const emit = defineEmits(['click'])

// 鼠标悬停状态
const isHovered = ref(false)

// 计算位置样式
const locationStyle = computed(() => {
  return {
    left: `${props.x}%`,
    top: `${props.y}%`,
    transform: isHovered.value 
      ? 'translate(-50%, -50%) scale(1.2) rotate(5deg)' 
      : 'translate(-50%, -50%) scale(1)'
  }
})

// 处理点击
const handleClick = () => {
  emit('click', { title: props.title, id: props.title })
}
</script>

<style scoped>
.map-location {
  position: absolute;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 10;
}

.location-icon {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  /* 复古卡通风格 */
  image-rendering: crisp-edges;
}

.location-tooltip {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: #f4e4c1;
  padding: 8px 16px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  border: 2px solid #8b7355;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .location-icon {
    width: 60px;
    height: 60px;
  }
  
  .location-tooltip {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>