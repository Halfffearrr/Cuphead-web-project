<script setup>
/**
 * StoryModal.vue - 故事模态框组件
 * 在地图上点击故事标记时显示
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BaseModal from './BaseModal.vue';
import { storyData } from '@/data/storyData';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'play-game']);

// 当前页码
const currentPage = ref(0);
const displayText = ref('');
const isTyping = ref(false);
let typingInterval = null;

// 计算属性
const totalPages = computed(() => storyData.length);
const currentStory = computed(() => storyData[currentPage.value]);
const isFirstPage = computed(() => currentPage.value === 0);
const isLastPage = computed(() => currentPage.value === storyData.length - 1);

// 打字机效果
function typewriterEffect(text) {
  displayText.value = '';
  let charIndex = 0;
  isTyping.value = true;

  typingInterval = setInterval(() => {
    if (charIndex < text.length) {
      displayText.value += text.charAt(charIndex);
      charIndex++;
    } else {
      finishTyping();
    }
  }, 20);
}

function finishTyping() {
  clearInterval(typingInterval);
  displayText.value = currentStory.value.text;
  isTyping.value = false;
}

function loadPage(index) {
  if (index < 0 || index >= storyData.length) return;
  clearInterval(typingInterval);
  currentPage.value = index;
  typewriterEffect(currentStory.value.text);
}

// 下一页
function nextPage() {
  if (isTyping.value) {
    finishTyping();
    return;
  }
  
  if (!isLastPage.value) {
    loadPage(currentPage.value + 1);
  } else {
    emit('play-game');
  }
}

// 上一页
function prevPage() {
  if (!isFirstPage.value) {
    clearInterval(typingInterval);
    isTyping.value = false;
    currentPage.value--;
    displayText.value = currentStory.value.text;
  }
}

// 关闭
function handleClose() {
  clearInterval(typingInterval);
  emit('close');
}

// 模态框打开时初始化
function onOpened() {
  currentPage.value = 0;
  typewriterEffect(storyData[0].text);
}

onUnmounted(() => {
  clearInterval(typingInterval);
});
</script>

<template>
  <BaseModal
    :visible="visible"
    title="📖 The Story"
    size="large"
    @close="handleClose"
    @opened="onOpened"
  >
    <div class="story-modal">
      <!-- 故事内容 -->
      <div class="story-content">
        <!-- 左侧：文字 -->
        <div class="story-text-side">
          <h3 class="story-chapter-title">{{ currentStory?.title }}</h3>
          <p 
            class="story-text"
            :class="{ 'typing-cursor': isTyping }"
          >
            {{ displayText }}
          </p>
        </div>

        <!-- 右侧：图片 -->
        <div class="story-image-side">
          <div class="story-image-frame">
            <img 
              :src="currentStory?.image" 
              :alt="currentStory?.title"
              @error="(e) => e.target.src = currentStory?.fallbackImage"
            >
          </div>
          <p class="story-caption">{{ currentStory?.caption }}</p>
        </div>
      </div>

      <!-- 导航控制 -->
      <div class="story-nav">
        <button 
          class="story-nav-btn"
          :disabled="isFirstPage"
          @click="prevPage"
        >
          ⬅ 上一页
        </button>
        
        <span class="story-page-indicator">
          {{ currentPage + 1 }} / {{ totalPages }}
        </span>
        
        <button 
          class="story-nav-btn story-nav-btn--primary"
          @click="nextPage"
        >
          {{ isTyping ? '跳过 ▶' : (isLastPage ? '开始游戏! 🎮' : '下一页 ➡') }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.story-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  min-height: 300px;
}

/* 文字侧 */
.story-text-side {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 2px solid var(--color-sepia, #d4a574);
}

.story-chapter-title {
  font-family: var(--header-font, 'Rye', serif);
  font-size: 1.4rem;
  color: var(--color-gold, #c9a227);
  margin: 0 0 16px 0;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
}

.story-text {
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-cream, #f5e6c8);
  flex: 1;
}

.typing-cursor::after {
  content: '|';
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 图片侧 */
.story-image-side {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story-image-frame {
  width: 100%;
  aspect-ratio: 4/3;
  border: 4px solid var(--color-rust, #8b4513);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.story-image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-caption {
  margin-top: 12px;
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 0.9rem;
  color: var(--color-sepia, #d4a574);
  font-style: italic;
}

/* 导航 */
.story-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 2px solid var(--color-sepia, #d4a574);
}

.story-nav-btn {
  padding: 12px 24px;
  border: 2px solid var(--color-sepia, #d4a574);
  border-radius: 8px;
  background: transparent;
  color: var(--color-cream, #f5e6c8);
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.story-nav-btn:hover:not(:disabled) {
  background: var(--color-rust, #8b4513);
  border-color: var(--color-gold, #c9a227);
}

.story-nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.story-nav-btn--primary {
  background: var(--color-rust, #8b4513);
}

.story-nav-btn--primary:hover {
  background: var(--color-gold, #c9a227);
  color: #1a1410;
}

.story-page-indicator {
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 1rem;
  color: var(--color-sepia, #d4a574);
}

/* 响应式 */
@media (max-width: 768px) {
  .story-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .story-image-side {
    order: -1;
  }

  .story-image-frame {
    max-width: 300px;
  }

  .story-nav-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}
</style>
