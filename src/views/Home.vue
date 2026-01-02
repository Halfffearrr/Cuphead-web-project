<script setup>
/**
 * Home.vue - 首页
 * 主入口页面，包含导航卡片
 */
import { onMounted } from 'vue';
import Navigation from '@/components/Navigation.vue';
import PlayingCard from '@/components/PlayingCard.vue';

// 导航卡片数据
const navCards = [
  { to: '/story', title: 'Story', icon: '📖', suit: 'heart' },
  { to: '/boss', title: 'Bosses', icon: '💀', suit: 'club' },
  { to: '/game', title: 'Play', icon: '🎮', suit: 'diamond' }
];
</script>

<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <Navigation />
    
    <!-- Hero Section -->
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
    
    <!-- 卡片导航区域 -->
    <section class="cards-section full-section">
      <div class="gambling-table">
        <h2 class="table-title">Choose Your Path</h2>
        
        <div class="cards-container">
          <PlayingCard
            v-for="card in navCards"
            :key="card.to"
            :to="card.to"
            :title="card.title"
            :icon="card.icon"
            :suit="card.suit"
          />
        </div>
      </div>
    </section>
    
    <!-- 特色介绍区域 -->
    <section class="features-section full-section">
      <div class="features-content">
        <h2 class="section-title">Features</h2>
        
        <div class="features-grid">
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <h3>1930s Art Style</h3>
            <p>Authentic hand-drawn animations inspired by classic cartoons.</p>
          </div>
          
          <div class="feature-item">
            <span class="feature-icon">🎵</span>
            <h3>Jazz Soundtrack</h3>
            <p>Original score featuring live jazz recordings.</p>
          </div>
          
          <div class="feature-item">
            <span class="feature-icon">👾</span>
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

/* Cards Section */
.cards-section {
  padding: 0;
}

.gambling-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #2e4d34;
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 80%);
  padding: 4rem 2rem;
  border-top: 2px dashed rgba(255,255,255,0.2);
  border-bottom: 2px dashed rgba(255,255,255,0.2);
}

.table-title {
  color: #fff;
  font-family: 'Rye', serif;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 3px 3px 0 #1a1a1a, 0 0 10px rgba(0,0,0,0.5);
  transform: rotate(-2deg);
}

.cards-container {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  perspective: 1000px;
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
}

.feature-item:hover {
  transform: translateY(-10px);
  border-color: #c9a227;
}

.feature-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 20px;
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
  .cards-container {
    gap: 1.5rem;
  }
  
  .table-title {
    font-size: 1.8rem;
  }
  
  .hero-section {
    padding: 80px 20px;
  }
}
</style>
