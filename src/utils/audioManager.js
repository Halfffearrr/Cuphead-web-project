/**
 * audioManager.js - 音频管理工具
 * 管理背景音乐和音效
 */

class AudioManager {
  constructor() {
    this.sounds = new Map();
    this.bgm = null;
    this.isMuted = false;
    this.volume = 1;
  }

  /**
   * 加载音频文件
   * @param {string} key - 音频标识
   * @param {string} src - 音频路径
   * @returns {Promise<HTMLAudioElement>}
   */
  async load(key, src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(src);
      audio.addEventListener('canplaythrough', () => {
        this.sounds.set(key, audio);
        resolve(audio);
      });
      audio.addEventListener('error', reject);
    });
  }

  /**
   * 播放音效
   * @param {string} key - 音频标识
   */
  play(key) {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(key);
    if (sound) {
      sound.currentTime = 0;
      sound.volume = this.volume;
      sound.play().catch(console.warn);
    }
  }

  /**
   * 播放背景音乐
   * @param {string} key - 音频标识
   * @param {boolean} loop - 是否循环
   */
  playBGM(key, loop = true) {
    this.stopBGM();
    
    const sound = this.sounds.get(key);
    if (sound) {
      this.bgm = sound;
      this.bgm.loop = loop;
      this.bgm.volume = this.volume * 0.5; // BGM 音量稍低
      if (!this.isMuted) {
        this.bgm.play().catch(console.warn);
      }
    }
  }

  /**
   * 停止背景音乐
   */
  stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
      this.bgm = null;
    }
  }

  /**
   * 切换静音
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.bgm) {
      if (this.isMuted) {
        this.bgm.pause();
      } else {
        this.bgm.play().catch(console.warn);
      }
    }
    
    return this.isMuted;
  }

  /**
   * 设置音量
   * @param {number} value - 音量值 (0-1)
   */
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    
    if (this.bgm) {
      this.bgm.volume = this.volume * 0.5;
    }
  }

  /**
   * 销毁所有音频
   */
  destroy() {
    this.stopBGM();
    this.sounds.forEach(sound => {
      sound.pause();
      sound.src = '';
    });
    this.sounds.clear();
  }
}

// 导出单例
export const audioManager = new AudioManager();
export default audioManager;
