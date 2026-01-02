/**
 * useStory.js - 故事页逻辑
 * 管理故事翻页、打字机效果
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';

// 故事数据配置
const storyData = [
  {
    title: "Inkwell Isle",
    text: "Once upon a time, in a magical place called Inkwell Isle, there were two brothers named Cuphead and Mugman. They lived without a care under the watchful eye of the wise Elder Kettle.",
    image: "/src/assets/images/story/Screenshot 2025-12-02 132404.jpg",
    fallbackImage: "https://placehold.co/600x400/f4e4bc/5d4037?text=Inkwell+Isle",
    caption: "Elder Kettle's Cottage"
  },
  {
    title: "The Casino",
    text: "One day they wandered far from home and ended up on the wrong side of the tracks and entered the Devil's Casino.",
    image: "/src/assets/images/story/Screenshot 2025-12-02 132436.jpg",
    fallbackImage: "https://placehold.co/600x400/4a3b32/fff?text=The+Casino",
    caption: "The Wrong Side of the Tracks"
  },
  {
    title: "A Winning Streak",
    text: '"Hot Dawg!" exclaimed King Dice. "These fellas can\'t lose!" Even the Devil himself came down to watch the show.',
    image: "/src/assets/images/story/Screenshot 2025-12-02 132448.jpg",
    fallbackImage: "https://placehold.co/600x400/221111/f4e4bc?text=Winning+Streak",
    caption: "The Table is Hot!"
  },
  {
    title: "Snake Eyes",
    text: '"Win one more roll, and the loot is yours!" the Devil boomed. "But lose, and I take your souls!" Cuphead rolled the dice... SNAKE EYES!',
    image: "/src/assets/images/story/Screenshot 2025-12-02 132504.jpg",
    fallbackImage: "https://placehold.co/600x400/000000/d32f2f?text=Snake+Eyes",
    caption: "The Fatal Roll"
  },
  {
    title: "The Deal",
    text: 'The brothers begged for their lives. "There must be another way!" The Devil grinned. "Collect the contracts of my runaway debtors by midnight, and I might let you keep your heads!"',
    image: "/src/assets/images/story/Screenshot 2025-12-02 132539.jpg",
    fallbackImage: "https://placehold.co/600x400/5d4037/fff?text=The+Deal",
    caption: "A Deal with the Devil"
  }
];

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
