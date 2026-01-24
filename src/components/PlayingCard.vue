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
  /* 弹性卡片入场动画 */
  animation: bounceCardEnter 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  animation-delay: calc(var(--card-index, 0) * 0.1s);
  opacity: 0;
  transform-origin: center bottom;
}

@keyframes bounceCardEnter {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-8deg) translateY(50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.15) rotate(3deg) translateY(-10px);
  }
  70% {
    transform: scale(0.92) rotate(-2deg) translateY(5px);
  }
  85% {
    transform: scale(1.05) rotate(1deg) translateY(-3px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0) translateY(0);
  }
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

/* 交互效果 - 橡皮筋弹性 */
.playing-card:hover {
  animation: cardRubberHover 0.5s ease-out, cardHoverFloat 2s ease-in-out infinite 0.5s;
  box-shadow: 15px 15px 25px rgba(0,0,0,0.5);
  background-color: #fff;
  z-index: 10;
}

@keyframes cardRubberHover {
  0% { transform: scale(1) rotate(0); }
  30% { transform: scaleX(1.15) scaleY(0.85) rotate(-5deg); }
  40% { transform: scaleX(0.9) scaleY(1.1) rotate(3deg); }
  50% { transform: scale(1.1) rotate(-2deg); }
  65% { transform: scaleX(1.02) scaleY(0.98) rotate(1deg); }
  100% { transform: translateY(-20px) rotateY(8deg) scale(1.08); }
}

@keyframes cardHoverFloat {
  0%, 100% { transform: translateY(-20px) rotateY(8deg) scale(1.08); }
  50% { transform: translateY(-25px) rotateY(10deg) scale(1.1); }
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
