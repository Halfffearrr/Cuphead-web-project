/**
 * useAudio.js - 音频管理 Composable
 * 提供响应式音频控制接口
 */

import { ref, onMounted, onUnmounted, watch } from 'vue';
import { audioManager } from '@/utils/audioManager';
import { useRoute } from 'vue-router';

// 音频资源配置
const AUDIO_CONFIG = {
  bgm: {
    home: '/audio/bgm-home.mp3',
    story: '/audio/bgm-story.mp3',
    boss: '/audio/bgm-boss.mp3',
    game: '/audio/bgm-game.mp3'
  },
  sfx: {
    click: '/audio/sfx-click.mp3',
    hover: '/audio/sfx-hover.mp3',
    pageFlip: '/audio/sfx-page-flip.mp3',
    transition: '/audio/sfx-transition.mp3'
  }
};

// 页面对应的背景音乐
const PAGE_BGM_MAP = {
  '/': 'home',
  '/story': 'story',
  '/boss': 'boss',
  '/game': 'game',
  '/map': 'home'
};

export function useAudio() {
  const isMuted = ref(false);
  const volume = ref(0.7);
  const isLoaded = ref(false);
  const currentBGM = ref(null);

  /**
   * 预加载所有音频资源
   */
  async function preloadAudio() {
    try {
      const loadPromises = [];

      // 加载背景音乐
      Object.entries(AUDIO_CONFIG.bgm).forEach(([key, src]) => {
        loadPromises.push(
          audioManager.load(`bgm-${key}`, src).catch(() => {
            console.warn(`[Audio] 无法加载: ${src}`);
          })
        );
      });

      // 加载音效
      Object.entries(AUDIO_CONFIG.sfx).forEach(([key, src]) => {
        loadPromises.push(
          audioManager.load(`sfx-${key}`, src).catch(() => {
            console.warn(`[Audio] 无法加载: ${src}`);
          })
        );
      });

      await Promise.allSettled(loadPromises);
      isLoaded.value = true;
      console.log('[Audio] 音频资源加载完成');
    } catch (error) {
      console.error('[Audio] 音频加载失败:', error);
    }
  }

  /**
   * 播放背景音乐
   * @param {string} key - 音乐标识
   */
  function playBGM(key) {
    if (currentBGM.value === key) return;
    
    audioManager.playBGM(`bgm-${key}`, true);
    currentBGM.value = key;
  }

  /**
   * 停止背景音乐
   */
  function stopBGM() {
    audioManager.stopBGM();
    currentBGM.value = null;
  }

  /**
   * 播放音效
   * @param {string} key - 音效标识
   */
  function playSFX(key) {
    audioManager.play(`sfx-${key}`);
  }

  /**
   * 切换静音
   */
  function toggleMute() {
    isMuted.value = audioManager.toggleMute();
    return isMuted.value;
  }

  /**
   * 设置音量
   * @param {number} value - 音量值 (0-1)
   */
  function setVolume(value) {
    volume.value = value;
    audioManager.setVolume(value);
  }

  /**
   * 根据路由播放对应背景音乐
   * @param {string} path - 路由路径
   */
  function playBGMForRoute(path) {
    const bgmKey = PAGE_BGM_MAP[path] || 'home';
    playBGM(bgmKey);
  }

  /**
   * 播放点击音效
   */
  function playClickSound() {
    playSFX('click');
  }

  /**
   * 播放悬停音效
   */
  function playHoverSound() {
    playSFX('hover');
  }

  /**
   * 播放翻页音效
   */
  function playPageFlipSound() {
    playSFX('pageFlip');
  }

  /**
   * 播放过渡音效
   */
  function playTransitionSound() {
    playSFX('transition');
  }

  return {
    // 状态
    isMuted,
    volume,
    isLoaded,
    currentBGM,

    // 方法
    preloadAudio,
    playBGM,
    stopBGM,
    playSFX,
    toggleMute,
    setVolume,
    playBGMForRoute,
    playClickSound,
    playHoverSound,
    playPageFlipSound,
    playTransitionSound
  };
}

/**
 * 创建带路由监听的音频管理
 * 在 App.vue 中使用
 */
export function useAudioWithRoute() {
  const route = useRoute();
  const audio = useAudio();

  // 监听路由变化，自动切换背景音乐
  watch(
    () => route.path,
    (newPath) => {
      audio.playBGMForRoute(newPath);
    }
  );

  onMounted(async () => {
    await audio.preloadAudio();
    // 初始播放首页音乐
    audio.playBGMForRoute(route.path);
  });

  onUnmounted(() => {
    audio.stopBGM();
  });

  return audio;
}

export default useAudio;
