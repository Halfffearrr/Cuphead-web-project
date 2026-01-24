/**
 * useStory.js - 故事页逻辑
 * 管理故事翻页、打字机效果
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storyData } from '@/data/storyData';

export function useStory() {
  // 状态
  const currentPage = ref(0);
  const displayText = ref('');
  const isTyping = ref(false);
  const imageLoaded = ref(false);
  
  // 打字机效果相关
  let typingInterval = null;
  let charIndex = 0;

  // 计算属性
  const totalPages = computed(() => storyData.length);
  
  const currentStory = computed(() => storyData[currentPage.value]);
  
  const isFirstPage = computed(() => currentPage.value === 0);
  
  const isLastPage = computed(() => currentPage.value === storyData.length - 1);
  
  const nextButtonText = computed(() => {
    if (isTyping.value) return 'Skip ▶';
    return isLastPage.value ? 'Start Game!' : 'Next ➤';
  });

  // 方法
  const typewriterEffect = (text) => {
    displayText.value = '';
    charIndex = 0;
    isTyping.value = true;

    typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        displayText.value += text.charAt(charIndex);
        charIndex++;
      } else {
        finishTyping();
      }
    }, 15);
  };

  const finishTyping = () => {
    clearInterval(typingInterval);
    displayText.value = currentStory.value.text;
    isTyping.value = false;
  };

  const loadPage = (index, isInstant = false) => {
    if (index < 0 || index >= storyData.length) return;
    
    currentPage.value = index;
    imageLoaded.value = false;
    
    // 清除正在进行的打字机效果
    clearInterval(typingInterval);

    if (isInstant) {
      displayText.value = currentStory.value.text;
      isTyping.value = false;
    } else {
      typewriterEffect(currentStory.value.text);
    }
  };

  const nextPage = () => {
    // 如果正在打字，点击直接显示全部文字
    if (isTyping.value) {
      finishTyping();
      return;
    }

    if (!isLastPage.value) {
      loadPage(currentPage.value + 1);
    } else {
      // 最后一页：可以跳转到游戏
      return 'game'; // 返回标识让组件处理跳转
    }
  };

  const prevPage = () => {
    if (isTyping.value) {
      clearInterval(typingInterval);
      isTyping.value = false;
    }

    if (!isFirstPage.value) {
      loadPage(currentPage.value - 1, true);
    }
  };

  const handleKeydown = (e) => {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
      e.preventDefault();
      nextPage();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      prevPage();
    }
  };

  const onImageLoad = () => {
    imageLoaded.value = true;
  };

  const onImageError = (event) => {
    console.warn(`Cannot find image: ${currentStory.value.image}. Showing fallback.`);
    event.target.src = currentStory.value.fallbackImage;
  };

  // 生命周期
  const init = () => {
    loadPage(0);
    window.addEventListener('keydown', handleKeydown);
  };

  const cleanup = () => {
    clearInterval(typingInterval);
    window.removeEventListener('keydown', handleKeydown);
  };

  return {
    // 状态
    currentPage,
    displayText,
    isTyping,
    imageLoaded,
    
    // 计算属性
    totalPages,
    currentStory,
    isFirstPage,
    isLastPage,
    nextButtonText,
    
    // 方法
    nextPage,
    prevPage,
    loadPage,
    onImageLoad,
    onImageError,
    init,
    cleanup
  };
}
