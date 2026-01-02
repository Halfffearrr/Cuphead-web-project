<script setup>
/**
 * LoadingSpinner.vue - 复古加载动画
 */
defineProps({
  text: {
    type: String,
    default: 'Loading...'
  }
});
</script>

<template>
  <div class="loading-container">
    <div class="loading-spinner">
      <div class="cup"></div>
    </div>
    <p class="loading-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 20px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  position: relative;
  animation: bounce 0.6s ease-in-out infinite alternate;
}

.cup {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #f5e6c8, #d9382e);
  border-radius: 50%;
  border: 4px solid #1a1a1a;
  position: relative;
}

.cup::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #1a1a1a;
  border-radius: 50%;
}

.cup::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 15px;
  border: 3px solid #1a1a1a;
  border-top: none;
  border-radius: 0 0 50% 50%;
}

.loading-text {
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: var(--color-gold, #c9a227);
  animation: blink 1s infinite;
}

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-15px); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
