<script setup>
/**
 * RetroOverlay.vue - 复古视觉特效组件
 * 包含：胶片颗粒、暗角、扫描线
 */
</script>

<template>
  <div class="retro-overlay">
    <!-- 老电影噪点层 -->
    <div class="film-grain"></div>
    
    <!-- 屏幕暗角 (Vignette) -->
    <div class="vignette"></div>
    
    <!-- CRT 扫描线（可选） -->
    <div class="scanlines"></div>
  </div>
</template>

<style scoped>
.retro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

/* 老电影噪点层 */
.film-grain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.12;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  animation: grainAnim 2s steps(10) infinite;
}

/* 屏幕暗角 */
.vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(26, 26, 26, 0.4) 100%);
}

/* CRT 扫描线 */
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  opacity: 0.3;
}

@keyframes grainAnim {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  30% { transform: translate(3%, -5%); }
  50% { transform: translate(-3%, 5%); }
  70% { transform: translate(5%, 2%); }
  90% { transform: translate(-2%, 8%); }
}
</style>
