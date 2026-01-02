<script setup>
/**
 * PlayingCard.vue - 扑克牌导航卡片
 */
defineProps({
  to: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🎮'
  },
  suit: {
    type: String,
    default: 'spade', // spade, heart, club, diamond
    validator: (value) => ['spade', 'heart', 'club', 'diamond'].includes(value)
  }
});

const suitSymbols = {
  spade: '♠',
  heart: '♥',
  club: '♣',
  diamond: '♦'
};

const suitColors = {
  spade: '#1a1a1a',
  heart: '#d9382e',
  club: '#1a1a1a',
  diamond: '#d9382e'
};
</script>

<template>
  <RouterLink :to="to" class="playing-card" :class="`card-${suit}`">
    <span class="card-suit" :style="{ color: suitColors[suit] }">
      {{ suitSymbols[suit] }}
    </span>
    <span class="card-icon">{{ icon }}</span>
    <span class="card-text">{{ title }}</span>
  </RouterLink>
</template>

<style scoped>
.playing-card {
  width: 220px;
  height: 320px;
  background-color: #fffdf5;
  border-radius: 12px;
  border: 3px solid var(--ink-black, #1a1a1a);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

/* 卡片内部装饰框 */
.playing-card::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 2px solid var(--accent-red, #d9382e);
  border-radius: 6px;
  pointer-events: none;
}

.card-suit {
  position: absolute;
  top: 15px;
  left: 18px;
  font-size: 1.5rem;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.card-text {
  font-family: var(--header-font, 'Rye'), serif;
  font-size: 1.5rem;
  text-transform: uppercase;
  z-index: 2;
}

/* 交互效果 */
.playing-card:hover {
  transform: translateY(-30px) rotateY(10deg) scale(1.1);
  box-shadow: 15px 15px 25px rgba(0,0,0,0.5);
  background-color: #fff;
  z-index: 10;
}

.playing-card:hover .card-text {
  color: var(--accent-red, #d9382e);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .playing-card {
    width: 160px;
    height: 240px;
  }
  
  .card-text {
    font-size: 1.2rem;
  }
}
</style>
