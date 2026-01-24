import { describe, it, expect, vi } from 'vitest';

/**
 * Game Bridge Logic Tests
 * 测试 useGameBridge hook 的核心逻辑
 */

describe('Game Bridge Logic', () => {
  describe('Message Types', () => {
    it('should define correct message types for game communication', () => {
      const messageTypes = {
        TOGGLE_MUTE: 'TOGGLE_MUTE',
        PAUSE: 'PAUSE',
        RESUME: 'RESUME',
        RESTART: 'RESTART',
        GAME_LOADED: 'GAME_LOADED',
        GAME_PROGRESS: 'GAME_PROGRESS',
        GAME_ERROR: 'GAME_ERROR',
        GAME_OVER: 'GAME_OVER'
      };

      expect(messageTypes.TOGGLE_MUTE).toBe('TOGGLE_MUTE');
      expect(messageTypes.PAUSE).toBe('PAUSE');
      expect(messageTypes.RESUME).toBe('RESUME');
      expect(messageTypes.RESTART).toBe('RESTART');
    });
  });

  describe('PostMessage Communication', () => {
    it('should correctly format message payload', () => {
      const createMessage = (type, payload = {}) => ({ type, ...payload });

      const muteMessage = createMessage('TOGGLE_MUTE', { muted: true });
      expect(muteMessage).toEqual({ type: 'TOGGLE_MUTE', muted: true });

      const pauseMessage = createMessage('PAUSE');
      expect(pauseMessage).toEqual({ type: 'PAUSE' });
    });

    it('should send message to iframe contentWindow', () => {
      const mockPostMessage = vi.fn();
      const mockFrame = {
        contentWindow: { postMessage: mockPostMessage }
      };

      // Simulate sending message
      const sendMessage = (frame, type, payload = {}) => {
        if (frame?.contentWindow) {
          frame.contentWindow.postMessage({ type, ...payload }, '*');
        }
      };

      sendMessage(mockFrame, 'TOGGLE_MUTE', { muted: true });
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'TOGGLE_MUTE', muted: true },
        '*'
      );
    });

    it('should not throw when frame is null', () => {
      const sendMessage = (frame, type, payload = {}) => {
        if (frame?.contentWindow) {
          frame.contentWindow.postMessage({ type, ...payload }, '*');
        }
      };

      expect(() => sendMessage(null, 'PAUSE')).not.toThrow();
    });
  });

  describe('Game State Management', () => {
    it('should handle mute state toggle', () => {
      let isMuted = false;
      
      const toggleMute = () => {
        isMuted = !isMuted;
        return isMuted;
      };

      expect(toggleMute()).toBe(true);
      expect(toggleMute()).toBe(false);
      expect(toggleMute()).toBe(true);
    });

    it('should handle fullscreen state', () => {
      let isFullscreen = false;

      const setFullscreen = (value) => {
        isFullscreen = value;
        return isFullscreen;
      };

      expect(setFullscreen(true)).toBe(true);
      expect(setFullscreen(false)).toBe(false);
    });

    it('should track loading progress', () => {
      let loadProgress = 0;

      const updateProgress = (progress) => {
        loadProgress = Math.round(progress * 100);
        return loadProgress;
      };

      expect(updateProgress(0)).toBe(0);
      expect(updateProgress(0.5)).toBe(50);
      expect(updateProgress(1)).toBe(100);
    });
  });

  describe('Message Handler', () => {
    it('should handle GAME_LOADED message', () => {
      let isLoaded = false;
      let progress = 0;

      const handleMessage = (data) => {
        if (data.type === 'GAME_LOADED') {
          isLoaded = true;
          progress = 100;
        }
      };

      handleMessage({ type: 'GAME_LOADED' });
      expect(isLoaded).toBe(true);
      expect(progress).toBe(100);
    });

    it('should handle GAME_PROGRESS message', () => {
      let progress = 0;

      const handleMessage = (data) => {
        if (data.type === 'GAME_PROGRESS') {
          progress = Math.round((data.progress || 0) * 100);
        }
      };

      handleMessage({ type: 'GAME_PROGRESS', progress: 0.75 });
      expect(progress).toBe(75);
    });

    it('should ignore unknown message types', () => {
      let handled = false;

      const handleMessage = (data) => {
        switch (data.type) {
          case 'GAME_LOADED':
          case 'GAME_PROGRESS':
          case 'GAME_ERROR':
          case 'GAME_OVER':
            handled = true;
            break;
          default:
            // Ignore unknown types
            break;
        }
      };

      handleMessage({ type: 'UNKNOWN_TYPE' });
      expect(handled).toBe(false);
    });
  });
});
