/**
 * performance.js - 性能优化工具
 * 提供图片懒加载、节流防抖等功能
 */

/**
 * 防抖函数
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} fn - 需要节流的函数
 * @param {number} limit - 时间限制（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, limit = 100) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * 图片预加载
 * @param {string[]} urls - 图片 URL 数组
 * @returns {Promise<HTMLImageElement[]>} 加载完成的图片元素
 */
export function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load: ${url}`));
          img.src = url;
        })
    )
  );
}

/**
 * 创建 Intersection Observer 懒加载
 * @param {Object} options - 配置选项
 * @returns {IntersectionObserver} Observer 实例
 */
export function createLazyLoadObserver(options = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options;

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const src = el.dataset.src;
          
          if (src) {
            if (el.tagName === 'IMG') {
              el.src = src;
            } else {
              el.style.backgroundImage = `url(${src})`;
            }
            el.removeAttribute('data-src');
            el.classList.add('loaded');
          }
        }
      });
    },
    { threshold, rootMargin }
  );
}

/**
 * 检测是否为低性能设备
 * @returns {boolean}
 */
export function isLowPerformanceDevice() {
  // 检测设备内存
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return true;
  }

  // 检测 CPU 核心数
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  // 检测是否请求减少动画
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  return false;
}

/**
 * 检测是否为触摸设备
 * @returns {boolean}
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 请求空闲回调（polyfill）
 * @param {Function} callback - 回调函数
 * @param {Object} options - 选项
 */
export function requestIdleCallback(callback, options = {}) {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  
  // Polyfill
  const start = Date.now();
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    });
  }, 1);
}

/**
 * 取消空闲回调
 * @param {number} id - 回调 ID
 */
export function cancelIdleCallback(id) {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * 获取帧率监控器
 * @returns {Object} FPS 监控器
 */
export function createFPSMonitor() {
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 0;
  let animationId = null;

  function tick() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
    }
    
    animationId = requestAnimationFrame(tick);
  }

  return {
    start() {
      if (!animationId) {
        tick();
      }
    },
    stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
    getFPS() {
      return fps;
    }
  };
}

export default {
  debounce,
  throttle,
  preloadImages,
  createLazyLoadObserver,
  isLowPerformanceDevice,
  isTouchDevice,
  requestIdleCallback,
  cancelIdleCallback,
  createFPSMonitor
};
