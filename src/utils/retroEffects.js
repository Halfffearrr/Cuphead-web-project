/**
 * retroEffects.js - 复古特效工具
 */

/**
 * 创建打字机效果
 * @param {string} text - 要显示的文本
 * @param {function} onChar - 每个字符的回调
 * @param {number} speed - 打字速度 (ms)
 * @returns {object} - 控制对象 { stop, finish }
 */
export function createTypewriter(text, onChar, speed = 15) {
  let index = 0;
  let interval = null;

  const start = () => {
    interval = setInterval(() => {
      if (index < text.length) {
        onChar(text.charAt(index), index);
        index++;
      } else {
        stop();
      }
    }, speed);
  };

  const stop = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  const finish = () => {
    stop();
    return text;
  };

  start();

  return { stop, finish };
}

/**
 * 添加抖动效果
 * @param {HTMLElement} element - 目标元素
 * @param {number} intensity - 抖动强度 (px)
 * @param {number} duration - 持续时间 (ms)
 */
export function shake(element, intensity = 5, duration = 500) {
  const originalTransform = element.style.transform;
  const startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    
    if (elapsed < duration) {
      const x = (Math.random() - 0.5) * intensity * 2;
      const y = (Math.random() - 0.5) * intensity * 2;
      element.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(animate);
    } else {
      element.style.transform = originalTransform;
    }
  };

  requestAnimationFrame(animate);
}

/**
 * 创建胶片刮痕效果
 * @param {HTMLCanvasElement} canvas - 目标画布
 */
export function createFilmScratches(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  const drawScratches = () => {
    ctx.clearRect(0, 0, width, height);
    
    // 随机绘制刮痕
    for (let i = 0; i < 3; i++) {
      if (Math.random() > 0.7) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.lineWidth = Math.random() * 2;
        
        const x = Math.random() * width;
        ctx.moveTo(x, 0);
        ctx.lineTo(x + (Math.random() - 0.5) * 20, height);
        ctx.stroke();
      }
    }

    requestAnimationFrame(drawScratches);
  };

  drawScratches();
}

/**
 * 应用老照片滤镜
 * @param {HTMLImageElement} img - 图片元素
 * @param {number} sepia - 棕褐色程度 (0-1)
 * @param {number} contrast - 对比度 (0-2)
 */
export function applyVintageFilter(img, sepia = 0.2, contrast = 1.1) {
  img.style.filter = `sepia(${sepia}) contrast(${contrast})`;
}
