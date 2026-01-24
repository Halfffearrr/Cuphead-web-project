<script setup>
/**
 * BaseModal.vue - 基础模态框组件
 * 可复用的模态框容器，支持插槽内容
 */
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
  /** 模态框是否可见 */
  visible: {
    type: Boolean,
    default: false
  },
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 尺寸 */
  size: {
    type: String,
    default: 'medium', // small, medium, large, fullscreen
    validator: (v) => ['small', 'medium', 'large', 'fullscreen'].includes(v)
  },
  /** 点击遮罩是否关闭 */
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close', 'opened', 'closed']);

// 关闭模态框
function handleClose() {
  emit('close');
}

// 点击遮罩
function handleOverlayClick() {
  if (props.closeOnOverlay) {
    handleClose();
  }
}

// 阻止内容区域点击冒泡
function handleContentClick(e) {
  e.stopPropagation();
}

// ESC 键关闭
function handleKeydown(e) {
  if (e.key === 'Escape' && props.visible) {
    handleClose();
  }
}

// 进入动画结束
function onAfterEnter() {
  emit('opened');
}

// 离开动画结束
function onAfterLeave() {
  emit('closed');
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition
      name="modal"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="visible"
        class="modal-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @click="handleOverlayClick"
      >
        <div
          class="modal-container"
          :class="[`modal-container--${size}`]"
          @click="handleContentClick"
        >
          <!-- 头部 -->
          <header v-if="title || showClose" class="modal-header">
            <h2 v-if="title" class="modal-title">{{ title }}</h2>
            <button
              v-if="showClose"
              class="modal-close"
              aria-label="关闭"
              @click="handleClose"
            >
              ✕
            </button>
          </header>

          <!-- 内容区 -->
          <main class="modal-body">
            <slot></slot>
          </main>

          <!-- 底部 -->
          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 遮罩层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

/* 容器 */
.modal-container {
  background: linear-gradient(135deg, #2a1f18 0%, #1a1410 100%);
  border: 4px solid var(--color-rust, #8b4513);
  border-radius: 16px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.6),
    0 0 0 2px rgba(245, 230, 200, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 尺寸 */
.modal-container--small {
  width: 100%;
  max-width: 400px;
}

.modal-container--medium {
  width: 100%;
  max-width: 600px;
}

.modal-container--large {
  width: 100%;
  max-width: 900px;
}

.modal-container--fullscreen {
  width: 95vw;
  height: 90vh;
  max-width: none;
}

/* 头部 */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 2px solid var(--color-sepia, #d4a574);
  background: rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-family: var(--header-font, 'Rye', serif);
  font-size: 1.5rem;
  color: var(--color-gold, #c9a227);
  margin: 0;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
}

.modal-close {
  width: 36px;
  height: 36px;
  border: 2px solid var(--color-sepia, #d4a574);
  border-radius: 50%;
  background: transparent;
  color: var(--color-cream, #f5e6c8);
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover,
.modal-close:focus-visible {
  background: var(--color-rust, #8b4513);
  border-color: var(--color-gold, #c9a227);
  transform: rotate(90deg);
  outline: none;
}

/* 内容区 */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  color: var(--color-cream, #f5e6c8);
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
}

/* 底部 */
.modal-footer {
  padding: 16px 24px;
  border-top: 2px solid var(--color-sepia, #d4a574);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.modal-leave-to .modal-container {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .modal-title {
    font-size: 1.2rem;
  }

  .modal-body {
    padding: 20px;
  }
}

/* 减少动画 */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: none;
  }
}
</style>
