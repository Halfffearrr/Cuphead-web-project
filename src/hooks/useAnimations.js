/**
 * useAnimations.js - 动画工具 Hook
 * 提供滚动动画、视差效果等
 */

import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollAnimation() {
  const scrollProgress = ref(0);
  const currentSection = ref(0);
  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // 计算当前 section
    const sections = document.querySelectorAll('.full-section');
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSection.value = index;
      }
    });
  };

  const init = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化状态
  };

  const cleanup = () => {
    window.removeEventListener('scroll', handleScroll);
  };

  return {
    scrollProgress,
    currentSection,
    init,
    cleanup
  };
}

export function useParallax(factor = 0.5) {
  const offset = ref(0);
  
  const handleScroll = () => {
    offset.value = window.scrollY * factor;
  };

  const init = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  const cleanup = () => {
    window.removeEventListener('scroll', handleScroll);
  };

  return {
    offset,
    init,
    cleanup
  };
}

export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false);
  const targetRef = ref(null);
  let observer = null;

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  };

  const init = () => {
    if (!targetRef.value) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    }, defaultOptions);

    observer.observe(targetRef.value);
  };

  const cleanup = () => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value);
      observer.disconnect();
    }
  };

  return {
    isVisible,
    targetRef,
    init,
    cleanup
  };
}
