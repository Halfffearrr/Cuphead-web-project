<script setup>
/**
 * Home.vue - 首页
 * 主入口页面，三部分结构：Hero + 地图导航 + 特色介绍
 */
import Navigation from '@/components/Navigation.vue';
import MapView from '@/views/MapView.vue';
</script>

<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <Navigation />
    
    <!-- 第一部分：Hero Section -->
    <section class="hero-section full-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">CUPHEAD</span>
          <span class="subtitle">Don't Deal With The Devil</span>
        </h1>
        
        <p class="hero-description">
          A classic run and gun action game heavily focused on boss battles.
          Inspired by cartoons of the 1930s.
        </p>
      </div>
    </section>
    
    <!-- 第二部分：地图导航区域（替换原来的扑克牌） -->
    <section class="map-section full-section">
      <MapView />
    </section>
    
    <!-- 第三部分：特色介绍区域 -->
    <section class="features-section full-section">
      <div class="features-content">
        <h2 class="section-title">Features</h2>
        
        <div class="features-grid">
          <div class="feature-item" style="--feature-index: 0">
            <div class="feature-icon-box">
              <div class="icon-pencil"></div>
            </div>
            <h3>1930s Art Style</h3>
            <p>Authentic hand-drawn animations inspired by classic cartoons.</p>
          </div>
          
          <div class="feature-item" style="--feature-index: 1">
            <div class="feature-icon-box">
              <div class="icon-music"></div>
            </div>
            <h3>Jazz Soundtrack</h3>
            <p>Original score featuring live jazz recordings.</p>
          </div>
          
          <div class="feature-item" style="--feature-index: 2">
            <div class="feature-icon-box">
              <div class="icon-skull"></div>
            </div>
            <h3>Epic Boss Battles</h3>
            <p>Challenging fights against unique and memorable bosses.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 滚动进度条 -->
    <div class="scroll-progress" :style="{ width: '0%' }"></div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--color-bg, #1a1410);
  color: var(--color-cream, #f5e6c8);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1a1410 0%, #2a1f18 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 40px;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  margin-bottom: 30px;
}

.title-line {
  display: block;
  font-family: 'Press Start 2P', cursive;
  font-size: clamp(2rem, 8vw, 5rem);
  color: #c9a227;
  text-shadow: 
    4px 4px 0 #8b4513,
    8px 8px 0 #1a1410;
  animation: titleGlow 3s ease-in-out infinite;
}

.subtitle {
  display: block;
  font-family: 'Rye', serif;
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #d4a574;
  margin-top: 15px;
  letter-spacing: 3px;
}

.hero-description {
  font-family: 'VT323', monospace;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #d4a574;
  max-width: 600px;
  margin: 0 auto;
}

@keyframes titleGlow {
  0%, 100% { 
    filter: drop-shadow(0 0 20px rgba(201, 162, 39, 0.4)); 
  }
  50% { 
    filter: drop-shadow(0 0 40px rgba(201, 162, 39, 0.8)); 
  }
}

/* Map Section - 地图区域 */
.map-section {
  position: relative;
  padding: 0;
  overflow: hidden;
}

/* Features Section */
.features-section {
  background: #2a1f18;
  padding: 100px 40px;
}

.features-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Rye', serif;
  font-size: 2.5rem;
  text-align: center;
  color: #c9a227;
  margin-bottom: 60px;
  text-shadow: 2px 2px 0 #1a1410;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.feature-item {
  background: rgba(26, 20, 16, 0.8);
  border: 3px solid #8b4513;
  padding: 40px 30px;
  text-align: center;
  transition: transform 0.3s, border-color 0.3s;
  /* 弹簧入场动画 */
  animation: featureSpringIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: calc(var(--feature-index, 0) * 0.15s);
  opacity: 0;
}

@keyframes featureSpringIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(60px);
  }
  50% {
    opacity: 1;
    transform: scale(1.08) translateY(-15px);
  }
  70% {
    transform: scale(0.95) translateY(5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.feature-item:hover {
  /* 
     Critical Fix: 
     覆盖动画时必须显式保持 opacity: 1，否则因为原动画被移除，
     opacity 会回退到 CSS 规则中定义的 0。
  */
  opacity: 1;
  animation: featureRubber 0.6s ease-out; /* 稍微加长动画时间 */
  border-color: #c9a227;
  box-shadow: 0 0 15px rgba(201, 162, 39, 0.3);
}

@keyframes featureRubber {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.15) scaleY(0.85); } /* 更夸张的挤压 */
  40% { transform: scaleX(0.85) scaleY(1.15); } /* 回弹 */
  50% { transform: scaleX(1.05) scaleY(0.95); }
  65% { transform: scaleX(0.98) scaleY(1.02); }
  100% { transform: translateY(-5px) scale(1); }
}

/* 图标替代样式 */
.feature-icon-box {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-pencil, .icon-music, .icon-skull {
  width: 40px;
  height: 40px;
  background-color: #c9a227;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

/* 使用 CSS 绘制简单的形状代替 Emoji，或者使用 unicode 字符 */
.icon-pencil::before { content: '✎'; font-size: 40px; color: #c9a227; display: block; line-height: 40px; }
.icon-music::before { content: '♫'; font-size: 40px; color: #c9a227; display: block; line-height: 40px; }
.icon-skull::before { content: '☠'; font-size: 40px; color: #c9a227; display: block; line-height: 40px; }

/* 覆盖上面的 ::before 重置 background */
.icon-pencil, .icon-music, .icon-skull {
  background: transparent;
}

.feature-item h3 {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
  color: #c9a227;
  margin-bottom: 15px;
}

.feature-item p {
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  color: #d4a574;
  line-height: 1.5;
}

/* Full Section */
.full-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 滚动进度条 */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #c9a227, #ffbf00, #d9382e);
  z-index: 99999;
  transition: width 0.1s linear;
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.5);
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-section {
    padding: 80px 20px;
  }
}
</style>
