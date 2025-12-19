import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM elements
beforeEach(() => {
  document.body.innerHTML = `
    <div id="screen-area"></div>
    <iframe id="game-frame"></iframe>
  `;
});

describe('Game Page Functions', () => {
  describe('toggleFullscreen', () => {
    it('should request fullscreen when not in fullscreen mode', async () => {
      const mockRequestFullscreen = vi.fn().mockResolvedValue(undefined);
      const screenArea = document.getElementById('screen-area');
      screenArea.requestFullscreen = mockRequestFullscreen;

      // Import and test
      const { toggleFullscreen } = await import('@js/game.js');
      
      // Ensure not in fullscreen
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
        writable: true,
      });

      toggleFullscreen();
      expect(mockRequestFullscreen).toHaveBeenCalled();
    });

    it('should exit fullscreen when already in fullscreen mode', async () => {
      const mockExitFullscreen = vi.fn().mockResolvedValue(undefined);
      document.exitFullscreen = mockExitFullscreen;

      const screenArea = document.getElementById('screen-area');
      
      // Set fullscreen mode
      Object.defineProperty(document, 'fullscreenElement', {
        value: screenArea,
        writable: true,
      });

      const { toggleFullscreen } = await import('@js/game.js');
      toggleFullscreen();
      
      expect(mockExitFullscreen).toHaveBeenCalled();
    });
  });

  describe('toggleMute', () => {
    it('should send TOGGLE_MUTE message to iframe', async () => {
      const mockPostMessage = vi.fn();
      const iframe = document.getElementById('game-frame');
      
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });

      const { toggleMute } = await import('@js/game.js');
      
      const mockEvent = {
        currentTarget: document.createElement('button'),
      };
      
      toggleMute(mockEvent);
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'TOGGLE_MUTE' },
        '*'
      );
    });
  });
});
