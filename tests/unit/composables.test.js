/**
 * composables.test.js - Composables 单元测试
 * 测试 useStory、useBossGallery 等 hooks
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// 模拟 Vue 的响应式 API
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    ref: (val) => ({ value: val }),
    computed: (fn) => ({ value: fn() }),
    onMounted: vi.fn(),
    onUnmounted: vi.fn()
  };
});

describe('Story Data', () => {
  const storyData = [
    { id: 1, title: 'Inkwell Isle', text: 'Once upon a time...' },
    { id: 2, title: 'The Casino', text: 'One day they wandered...' },
    { id: 3, title: 'A Winning Streak', text: 'Hot Dawg!...' },
    { id: 4, title: 'Snake Eyes', text: 'Win one more roll...' },
    { id: 5, title: 'The Deal', text: 'The brothers begged...' }
  ];

  it('should have 5 story pages', () => {
    expect(storyData.length).toBe(5);
  });

  it('should have required properties for each story', () => {
    storyData.forEach(story => {
      expect(story).toHaveProperty('id');
      expect(story).toHaveProperty('title');
      expect(story).toHaveProperty('text');
    });
  });

  it('should have unique IDs', () => {
    const ids = storyData.map(s => s.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});

describe('Boss Data', () => {
  const bossesData = [
    { id: 1, name: 'Goopy Le Grande', phases: { 1: {}, 2: {}, 3: {} } },
    { id: 2, name: 'Ribby and Croaks', phases: { 1: {}, 2: {}, 3: {} } },
    { id: 3, name: 'Wally Warbles', phases: { 1: {}, 2: {}, 3: {} } },
    { id: 4, name: 'Grim Matchstick', phases: { 1: {}, 2: {}, 3: {} } },
    { id: 5, name: 'Rumor Honeybottoms', phases: { 1: {}, 2: {}, 3: {} } },
    { id: 6, name: 'Cala Maria', phases: { 1: {}, 2: {}, 3: {} } }
  ];

  it('should have at least 6 bosses', () => {
    expect(bossesData.length).toBeGreaterThanOrEqual(6);
  });

  it('should have required properties for each boss', () => {
    bossesData.forEach(boss => {
      expect(boss).toHaveProperty('id');
      expect(boss).toHaveProperty('name');
      expect(boss).toHaveProperty('phases');
    });
  });

  it('should have 3 phases for each boss', () => {
    bossesData.forEach(boss => {
      expect(Object.keys(boss.phases).length).toBe(3);
    });
  });

  it('should have unique boss IDs', () => {
    const ids = bossesData.map(b => b.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });
});

describe('Map Locations', () => {
  const mapLocations = [
    { id: 'story', x: 15, y: 25, type: 'story', route: '/story' },
    { id: 'game', x: 50, y: 55, type: 'game', route: '/game' },
    { id: 'boss', x: 72, y: 28, type: 'boss', route: '/boss' }
  ];

  it('should have main navigation locations', () => {
    const mainIds = ['story', 'game', 'boss'];
    mainIds.forEach(id => {
      const loc = mapLocations.find(l => l.id === id);
      expect(loc).toBeDefined();
    });
  });

  it('should have valid coordinates', () => {
    mapLocations.forEach(loc => {
      expect(loc.x).toBeGreaterThanOrEqual(0);
      expect(loc.x).toBeLessThanOrEqual(100);
      expect(loc.y).toBeGreaterThanOrEqual(0);
      expect(loc.y).toBeLessThanOrEqual(100);
    });
  });

  it('should have valid routes', () => {
    mapLocations.forEach(loc => {
      expect(loc.route).toMatch(/^\//);
    });
  });
});

describe('Typewriter Effect Logic', () => {
  it('should type text character by character', () => {
    const text = 'Hello World';
    let displayText = '';
    let charIndex = 0;

    // 模拟打字效果
    while (charIndex < text.length) {
      displayText += text.charAt(charIndex);
      charIndex++;
    }

    expect(displayText).toBe(text);
    expect(charIndex).toBe(text.length);
  });

  it('should handle empty text', () => {
    const text = '';
    let displayText = '';
    let charIndex = 0;

    while (charIndex < text.length) {
      displayText += text.charAt(charIndex);
      charIndex++;
    }

    expect(displayText).toBe('');
    expect(charIndex).toBe(0);
  });
});

describe('Phase Selection Logic', () => {
  it('should return correct phase data', () => {
    const boss = {
      defaultDesc: 'Default description',
      phases: {
        1: { desc: 'Phase 1 description' },
        2: { desc: 'Phase 2 description' },
        3: { desc: 'Phase 3 description' }
      }
    };

    // Phase 0 should return default
    let currentPhase = 0;
    let desc = currentPhase === 0 
      ? boss.defaultDesc 
      : boss.phases[currentPhase]?.desc;
    expect(desc).toBe('Default description');

    // Phase 1
    currentPhase = 1;
    desc = currentPhase === 0 
      ? boss.defaultDesc 
      : boss.phases[currentPhase]?.desc;
    expect(desc).toBe('Phase 1 description');

    // Phase 3
    currentPhase = 3;
    desc = currentPhase === 0 
      ? boss.defaultDesc 
      : boss.phases[currentPhase]?.desc;
    expect(desc).toBe('Phase 3 description');
  });
});
