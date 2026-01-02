<script setup>
/**
 * Story.vue - 故事页面
 * 交互式故事书体验
 */
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from '@/components/BackButton.vue';
import { useStory } from '@/hooks/useStory';

const router = useRouter();

const {
  currentPage,
  displayText,
  isTyping,
  imageLoaded,
  totalPages,
  currentStory,
  isFirstPage,
  isLastPage,
  nextButtonText,
  nextPage,
  prevPage,
  onImageLoad,
  onImageError,
  init,
  cleanup
} = useStory();

const handleNext = () => {
  const result = nextPage();
  if (result === 'game') {
    // 最后一页点击后跳转到游戏
    router.push('/game');
  }
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div class="story-page">
    <!-- 返回按钮 -->
    <BackButton to="/" label="← Home" />

    <!-- 故事书容器 -->
    <div class="storybook">
      <div class="spine"></div>

      <!-- 左页：文字 -->
      <div class="page-left">
        <h2 class="story-title">{{ currentStory?.title }}</h2>
        <div 
          class="typewriter-text"
          :class="{ 'typewriter-cursor': isTyping }"
        >
          {{ displayText }}
        </div>
      </div>

      <!-- 右页：图片 -->
      <div class="page-right">
        <div class="image-frame" :class="{ 'fade-in': imageLoaded }">
          <img 
            :src="currentStory?.image" 
            :alt="currentStory?.title"
            @load="onImageLoad"
            @error="onImageError"
          >
          <div class="image-caption">{{ currentStory?.caption }}</div>
        </div>
      </div>

      <!-- 导航按钮组 -->
      <div class="nav-controls">
        <button 
          class="nav-btn" 
          :disabled="isFirstPage"
          @click="prevPage"
        >
          ⇦ Prev
        </button>
        <span class="page-indicator">
          {{ currentPage + 1 }} / {{ totalPages }}
        </span>
        <button 
          class="nav-btn nav-btn-primary" 
          @click="handleNext"
        >
          {{ nextButtonText }}
        </button>
      </div>
    </div>

    <!-- 键盘提示 -->
    <div class="keyboard-hint">
      Use ← → or Space to navigate
    </div>
  </div>
</template>

<style scoped>
.story-page {
  min-height: 100vh;
  background-color: #e3d0a6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
}

/* 故事书容器 */
.storybook {
  display: flex;
  max-width: 1100px;
  width: 100%;
  background: #fffdf5;
  border: 5px solid #1a1a1a;
  border-radius: 5px;
  box-shadow: 
    10px 10px 0 rgba(0,0,0,0.3),
    inset 0 0 50px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
  min-height: 500px;
}

/* 书脊 */
.spine {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 30px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, 
    rgba(0,0,0,0.1) 0%, 
    rgba(0,0,0,0.2) 50%, 
    rgba(0,0,0,0.1) 100%);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
  z-index: 10;
}

/* 左页 */
.page-left {
  flex: 1;
  padding: 40px 50px 40px 40px;
  display: flex;
  flex-direction: column;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 29px,
      rgba(0,0,0,0.03) 30px
    );
}

.story-title {
  font-family: 'Rye', serif;
  font-size: 2rem;
  color: #d9382e;
  margin-bottom: 25px;
  border-bottom: 2px solid #d9382e;
  padding-bottom: 10px;
}

.typewriter-text {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #1a1a1a;
  flex: 1;
}

.typewriter-cursor::after {
  content: '|';
  animation: cursorBlink 0.7s infinite;
  color: #d9382e;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* 右页 */
.page-right {
  flex: 1;
  padding: 40px 40px 40px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf5e8;
}

.image-frame {
  width: 100%;
  max-width: 400px;
  border: 4px double #1a1a1a;
  padding: 10px;
  background: #fff;
  transform: rotate(-2deg);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image-frame.fade-in {
  opacity: 1;
}

.image-frame img {
  width: 100%;
  height: auto;
  display: block;
  filter: sepia(0.15) contrast(1.05);
}

.image-caption {
  text-align: center;
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
  font-style: italic;
}

/* 导航控制 */
.nav-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 20;
}

.nav-btn {
  padding: 12px 25px;
  background: #fdf5e6;
  border: 3px solid #1a1a1a;
  font-family: 'Rye', serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.2);
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn-primary {
  background: #d9382e;
  color: #fff;
}

.page-indicator {
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #666;
}

/* 键盘提示 */
.keyboard-hint {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'VT323', monospace;
  font-size: 1rem;
  color: #888;
  opacity: 0.7;
}

/* 响应式 */
@media (max-width: 900px) {
  .storybook {
    flex-direction: column;
  }
  
  .spine {
    left: 0;
    right: 0;
    top: 50%;
    bottom: auto;
    width: 100%;
    height: 20px;
    transform: translateY(-50%);
    background: linear-gradient(0deg, 
      rgba(0,0,0,0.1) 0%, 
      rgba(0,0,0,0.2) 50%, 
      rgba(0,0,0,0.1) 100%);
  }
  
  .page-left,
  .page-right {
    padding: 30px;
  }
  
  .nav-controls {
    position: relative;
    bottom: auto;
    left: auto;
    transform: none;
    padding: 20px;
    background: #fffdf5;
    border-top: 2px dashed rgba(0,0,0,0.1);
    width: 100%;
    justify-content: center;
  }
}
</style>
