/**
 * useGameBridge.js - Unity 游戏通信桥接
 * 处理与嵌入式 WebGL 游戏的 postMessage 通信
 */

import { ref, onMounted, onUnmounted } from 'vue';

export function useGameBridge() {
  // 状态
  const gameFrame = ref(null);
  const isMuted = ref(false);
  const isFullscreen = ref(false);
  const isGameLoaded = ref(false);

  // 发送消息到游戏 iframe
  const sendMessage = (type, payload = {}) => {
    if (gameFrame.value?.contentWindow) {
      gameFrame.value.contentWindow.postMessage({ type, ...payload }, '*');
      console.log(`[GameBridge] Sent message: ${type}`, payload);
    } else {
      console.warn('[GameBridge] Game frame not available');
    }
  };

  // 切换静音
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    sendMessage('TOGGLE_MUTE', { muted: isMuted.value });
    return isMuted.value;
  };

  // 切换全屏
  const toggleFullscreen = async () => {
    const screenElement = gameFrame.value?.parentElement || gameFrame.value;
    
    try {
      if (!document.fullscreenElement) {
        await screenElement.requestFullscreen();
        isFullscreen.value = true;
      } else {
        await document.exitFullscreen();
        isFullscreen.value = false;
      }
    } catch (err) {
      console.error('[GameBridge] Fullscreen error:', err.message);
    }
    
    return isFullscreen.value;
  };

  // 暂停游戏
  const pauseGame = () => {
    sendMessage('PAUSE');
  };

  // 恢复游戏
  const resumeGame = () => {
    sendMessage('RESUME');
  };

  // 重启游戏
  const restartGame = () => {
    sendMessage('RESTART');
  };

  // 加载进度
  const loadProgress = ref(0);

  // 处理来自游戏的消息
  const handleGameMessage = (event) => {
    // 安全检查：只处理来自同源或预期来源的消息
    // if (event.origin !== window.location.origin) return;

    const { type, progress, error } = event.data || {};
    
    switch (type) {
      case 'GAME_LOADED':
        isGameLoaded.value = true;
        loadProgress.value = 100;
        console.log('[GameBridge] Game loaded');
        break;
      case 'GAME_PROGRESS':
        loadProgress.value = Math.round((progress || 0) * 100);
        console.log('[GameBridge] Loading:', loadProgress.value + '%');
        break;
      case 'GAME_ERROR':
        console.error('[GameBridge] Game error:', error);
        break;
      case 'GAME_OVER':
        console.log('[GameBridge] Game over');
        break;
      default:
        // 忽略未知消息类型
        break;
    }
  };

  // 监听全屏变化
  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  // 设置 iframe 引用
  const setGameFrame = (el) => {
    gameFrame.value = el;
  };

  // 生命周期
  const init = () => {
    window.addEventListener('message', handleGameMessage);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  };

  const cleanup = () => {
    window.removeEventListener('message', handleGameMessage);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
  };

  return {
    // 状态
    gameFrame,
    isMuted,
    isFullscreen,
    isGameLoaded,
    loadProgress,
    
    // 方法
    setGameFrame,
    sendMessage,
    toggleMute,
    toggleFullscreen,
    pauseGame,
    resumeGame,
    restartGame,
    init,
    cleanup
  };
}
