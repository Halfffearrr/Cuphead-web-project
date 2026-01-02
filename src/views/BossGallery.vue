<script setup>
/**
 * BossGallery.vue - Boss 画廊页面
 * 展示所有 Boss 及其战斗阶段
 */
import { onMounted } from 'vue';
import BackButton from '@/components/BackButton.vue';
import PhaseSelector from '@/components/PhaseSelector.vue';
import { useBossGallery } from '@/hooks/useBossGallery';

const {
  currentBoss,
  currentPhase,
  isLoading,
  bossList,
  currentImage,
  currentDescription,
  currentTitle,
  selectBoss,
  changePhase,
  initFirstBoss
} = useBossGallery();

onMounted(() => {
  initFirstBoss();
});
</script>

<template>
  <div class="boss-page">
    <!-- 返回按钮 -->
    <BackButton to="/" label="← Back to Menu" />

    <main class="boss-container">
      <!-- 左侧：Boss 列表 -->
      <aside class="boss-sidebar">
        <h3 class="sidebar-title">WANTED</h3>
        <ul class="boss-list">
          <li
            v-for="boss in bossList"
            :key="boss.id"
            class="boss-item"
            :class="{ active: currentBoss?.id === boss.id }"
            @click="selectBoss(boss)"
          >
            {{ boss.name }}
          </li>
        </ul>
      </aside>

      <!-- 右侧：Boss 详情展示 -->
      <section class="boss-display">
        <h1 class="boss-name-title">{{ currentTitle }}</h1>

        <div class="boss-image-frame">
          <Transition name="fade" mode="out-in">
            <img 
              v-if="currentImage"
              :key="currentImage"
              :src="currentImage" 
              :alt="currentTitle"
              :class="{ loading: isLoading }"
            >
          </Transition>
        </div>

        <PhaseSelector
          v-if="currentBoss"
          :phases="[1, 2, 3]"
          :current-phase="currentPhase"
          @change="changePhase"
        />

        <div class="boss-description">
          <Transition name="fade" mode="out-in">
            <p :key="currentPhase">{{ currentDescription }}</p>
          </Transition>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.boss-page {
  min-height: 100vh;
  background-color: #e3d0a6;
  background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  padding: 20px;
}

/* 页面容器 */
.boss-container {
  width: 95%;
  max-width: 1200px;
  height: 85vh;
  margin: 80px auto 20px;
  display: flex;
  gap: 20px;
  position: relative;
  z-index: 10;
}

/* 左侧：Boss 列表 */
.boss-sidebar {
  flex: 1;
  background: #fdf5e6;
  border: 4px solid #1a1a1a;
  border-radius: 8px;
  padding: 15px;
  overflow-y: auto;
  box-shadow: -5px 5px 0 rgba(0,0,0,0.2);
  scrollbar-width: thin;
  scrollbar-color: #d9382e #fdf5e6;
}

.sidebar-title {
  text-align: center;
  font-family: 'Rye', serif;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1a1a1a;
  color: #1a1a1a;
}

.boss-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.boss-item {
  background: #fff;
  border: 2px solid #1a1a1a;
  padding: 15px;
  font-family: 'Rye', serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.boss-item:hover {
  background: #ffebee;
  transform: translateX(5px);
}

.boss-item.active {
  background: #d9382e;
  color: #fff;
  transform: scale(1.02);
  box-shadow: 3px 3px 0 #1a1a1a;
}

.boss-item.active::after {
  content: '☠';
  position: absolute;
  right: 15px;
  font-size: 1.2rem;
}

/* 右侧：Boss 详情 */
.boss-display {
  flex: 2.5;
  background: #fff;
  border: 5px solid #1a1a1a;
  border-radius: 4px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(0,0,0,0.05) 30px);
  box-shadow: 10px 10px 0 rgba(0,0,0,0.3);
}

.boss-name-title {
  font-family: 'Rye', serif;
  font-size: 2.2rem;
  margin-bottom: 20px;
  text-decoration: underline wavy #d9382e;
  text-align: center;
  color: #1a1a1a;
}

/* 图片区域 */
.boss-image-frame {
  width: 100%;
  max-width: 500px;
  height: 350px;
  border: 4px double #1a1a1a;
  padding: 10px;
  margin-bottom: 20px;
  background: #fff;
  transform: rotate(-1deg);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.boss-image-frame img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: sepia(0.2) contrast(1.1);
  transition: opacity 0.3s ease;
}

.boss-image-frame img.loading {
  opacity: 0.5;
}

/* 介绍文字 */
.boss-description {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  min-height: 100px;
  background: rgba(255,255,255,0.8);
  padding: 15px;
  border-radius: 8px;
  color: #1a1a1a;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 900px) {
  .boss-container {
    flex-direction: column;
    height: auto;
  }
  
  .boss-sidebar {
    max-height: 200px;
  }
  
  .boss-image-frame {
    height: 250px;
  }
}
</style>
