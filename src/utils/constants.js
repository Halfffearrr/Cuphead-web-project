/**
 * constants.js - 全局常量配置
 */

// 颜色主题
export const COLORS = {
  // 暖色调主题
  warm: {
    bg: '#1a1410',
    bgWarm: '#2a1f18',
    cream: '#f5e6c8',
    sepia: '#d4a574',
    gold: '#c9a227',
    rust: '#8b4513',
    wine: '#722f37',
    burgundy: '#4a1c2c',
    red: '#c41e3a',
    orange: '#d2691e',
    amber: '#ffbf00'
  },
  
  // 经典主题
  classic: {
    bg: '#e3d0a6',
    accentRed: '#d9382e',
    inkBlack: '#1a1a1a',
    feltGreen: '#2e4d34'
  }
};

// 字体配置
export const FONTS = {
  header: "'Rye', serif",
  body: "'Gloria Hallelujah', cursive",
  pixel: "'Press Start 2P', cursive",
  mono: "'VT323', monospace"
};

// 动画时长
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  typewriter: 15
};

// 断点
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1200
};

// 游戏相关配置
export const GAME_CONFIG = {
  iframeSrc: '/game/index.html',
  defaultVolume: 1,
  messageTypes: {
    TOGGLE_MUTE: 'TOGGLE_MUTE',
    PAUSE: 'PAUSE',
    RESUME: 'RESUME',
    RESTART: 'RESTART',
    GAME_LOADED: 'GAME_LOADED',
    GAME_OVER: 'GAME_OVER',
    SCORE_UPDATE: 'SCORE_UPDATE'
  }
};
