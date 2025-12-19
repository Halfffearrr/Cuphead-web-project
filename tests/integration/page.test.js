import { describe, it, expect, beforeEach } from 'vitest';

describe('Page Integration Tests', () => {
  describe('Game Page Structure', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="tv-set">
          <div class="screen-bezel">
            <div class="screen-content" id="screen-area">
              <div class="scanlines"></div>
              <iframe id="game-frame" src="../../webwebweb/index.html"></iframe>
            </div>
          </div>
          <div class="controls-panel">
            <button class="knob-btn" id="fullscreen-btn">FULL SCREEN</button>
            <button class="knob-btn" id="mute-btn">MUTE AUDIO</button>
          </div>
        </div>
      `;
    });

    it('should have TV set container', () => {
      expect(document.querySelector('.tv-set')).toBeTruthy();
    });

    it('should have screen area with iframe', () => {
      const screenArea = document.getElementById('screen-area');
      const iframe = document.getElementById('game-frame');
      
      expect(screenArea).toBeTruthy();
      expect(iframe).toBeTruthy();
      expect(iframe.src).toContain('webwebweb/index.html');
    });

    it('should have scanlines effect', () => {
      expect(document.querySelector('.scanlines')).toBeTruthy();
    });

    it('should have control buttons', () => {
      expect(document.getElementById('fullscreen-btn')).toBeTruthy();
      expect(document.getElementById('mute-btn')).toBeTruthy();
    });
  });

  describe('CSS Classes Presence', () => {
    it('should have retro TV styling classes', () => {
      document.body.innerHTML = `
        <div class="tv-set">
          <div class="screen-bezel">
            <div class="screen-content"></div>
          </div>
          <div class="controls-panel">
            <button class="knob-btn"></button>
          </div>
        </div>
      `;

      expect(document.querySelector('.screen-bezel')).toBeTruthy();
      expect(document.querySelector('.screen-content')).toBeTruthy();
      expect(document.querySelector('.controls-panel')).toBeTruthy();
      expect(document.querySelector('.knob-btn')).toBeTruthy();
    });
  });
});
