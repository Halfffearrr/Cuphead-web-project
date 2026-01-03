<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-backdrop" @click="handleClose">
      
      <div class="modal-card" @click.stop :style="cardStyle">
        
        <button class="close-btn" @click="handleClose">
          <img src="@/assets/images/ui/close-button.png" alt="Close" />
        </button>

        <div class="modal-content">
          <slot></slot>
        </div>
        
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
// 引入背景纹理图片 (如果还没准备好图片，可以先注释掉这行)
import bgTexture from '@/assets/images/ui/card-texture.png';

// 接收父组件传入的 props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

// 定义向父组件发送的事件
const emit = defineEmits(['close']);

// 关闭方法
const handleClose = () => {
  emit('close');
};

// 计算卡片样式（如果有纹理图则使用，否则用复古纸张色）
const cardStyle = computed(() => ({
  backgroundImage: `url(${bgTexture})`,
  backgroundColor: '#f4e4bc', // 备用背景色（复古米黄）
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}));
</script>

<style scoped>
/* 1. 黑色半透明背景 (rgba(0,0,0,0.8)) */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 保证在最上层 */
  backdrop-filter: blur(2px); /* 可选：背景模糊效果 */
}

/* 内容卡片样式 */
.modal-card {
  position: relative;
  width: 600px;
  min-height: 400px;
  max-width: 90%;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  /* 茶杯头风格边框 */
  border: 4px solid #2c2c2c; 
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  top: -20px;
  right: -20px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  transform: scale(1.1);
}

.close-btn img {
  width: 48px;
  height: 48px;
  display: block;
}

/* 4. 淡入淡出动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>