import { describe, it, expect, beforeEach } from 'vitest';

describe('Main Page Navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="cards-container">
        <a href="story.html" class="playing-card card-story">Story</a>
        <a href="boss.html" class="playing-card card-boss">Bosses</a>
        <a href="game.html" class="playing-card card-game">Game</a>
      </div>
    `;
  });

  it('should have three navigation cards', () => {
    const cards = document.querySelectorAll('.playing-card');
    expect(cards.length).toBe(3);
  });

  it('should link to correct pages', () => {
    const storyCard = document.querySelector('.card-story');
    const bossCard = document.querySelector('.card-boss');
    const gameCard = document.querySelector('.card-game');

    expect(storyCard.getAttribute('href')).toBe('story.html');
    expect(bossCard.getAttribute('href')).toBe('boss.html');
    expect(gameCard.getAttribute('href')).toBe('game.html');
  });

  it('should have correct card classes', () => {
    expect(document.querySelector('.card-story')).toBeTruthy();
    expect(document.querySelector('.card-boss')).toBeTruthy();
    expect(document.querySelector('.card-game')).toBeTruthy();
  });
});
