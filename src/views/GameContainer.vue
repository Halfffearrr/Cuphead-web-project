<script setup>
/**
 * GameContainer.vue - 游戏容器页面
 * 嵌入 Unity WebGL 游戏并提供控制
 */
import { ref, onMounted, onUnmounted } from 'vue';
import BackButton from '@/components/BackButton.vue';
import KnobButton from '@/components/KnobButton.vue';
import { useGameBridge } from '@/hooks/useGameBridge';

const gameFrameRef = ref(null);

const {
  isMuted,
  isFullscreen,
  isGameLoaded,
  loadProgress,
  setGameFrame,
  toggleMute,
  toggleFullscreen,
  init,
  cleanup
} = useGameBridge();

const handleFullscreen = async () => {
  // 对整个屏幕区域进行全屏
  const screenArea = document.getElementById('screen-area');
  if (screenArea) {
    try {
      if (!document.fullscreenElement) {
        await screenArea.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }
};

const handleMute = () => {
  toggleMute();
};

onMounted(() => {
  setGameFrame(gameFrameRef.value);
  init();
});

onUnmounted(() => {
  cleanup();
});
</script>

<template>
  <div class="game-page">
    <!-- 返回导航 -->
    <div class="bottom-nav">
      <RouterLink to="/">← Return to Home</RouterLink>
    </div>

    <!-- 电视机组件 -->
    <div class="tv-set">
      <!-- 屏幕部分 -->
      <div class="screen-bezel">
        <div id="screen-area" class="screen-content">
          <div class="scanlines"></div>
          
          <!-- 游戏嵌入 iframe -->
          <iframe 
            ref="gameFrameRef"
            id="game-frame" 
            src="/game/index.html" 
            title="Cuphead Game" 
            allowfullscreen
          ></iframe>
          
          <!-- 加载提示 -->
          <div v-if="!isGameLoaded" class="loading-overlay">
            <div class="loading-content">
              <div class="loading-text">Loading Game...</div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: loadProgress + '%' }"></div>
              </div>
              <div class="progress-text">{{ loadProgress }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 旋钮控制面板 -->
      <div class="controls-panel">
        <KnobButton
          title="Fullscreen"
          label="Display"
          @click="handleFullscreen"
        >
          <template v-if="isFullscreen">EXIT<br>FULL</template>
          <template v-else>FULL<br>SCREEN</template>
        </KnobButton>

        <KnobButton
          title="Mute Audio"
          label="Sound"
          @click="handleMute"
        >
          <template v-if="isMuted">UN<br>MUTE</template>
          <template v-else>MUTE<br>AUDIO</template>
        </KnobButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1410 0%, #2a1f18 50%, #1a1410 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
}

/* 电视机容器 */
.tv-set {
  background: linear-gradient(145deg, #8b7355, #5d4e37);
  border-radius: 30px;
  padding: 30px;
  box-shadow: 
    0 20px 60px rgba(0,0,0,0.5),
    inset 0 2px 10px rgba(255,255,255,0.1),
    inset 0 -5px 20px rgba(0,0,0,0.3);
  border: 8px solid #3d3225;
  max-width: 1000px;
  width: 100%;
}

/* 屏幕边框 */
.screen-bezel {
  background: #1a1a1a;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 
    inset 0 5px 20px rgba(0,0,0,0.8),
    0 0 0 3px #2a2a2a;
}

/* 屏幕内容 */
.screen-content {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 
    inset 0 0 100px rgba(0,0,0,0.5),
    0 0 30px rgba(100, 200, 100, 0.1);
}

/* CRT 扫描线 */
.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
}

/* 游戏 iframe */
#game-frame {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* 加载遮罩 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.loading-content {
  text-align: center;
}

.loading-text {
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  color: #c9a227;
  animation: blink 1s infinite;
  margin-bottom: 20px;
}

.progress-bar {
  width: 200px;
  height: 10px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 auto 10px;
  border: 2px solid #555;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #c9a227, #e6c547);
  transition: width 0.3s ease;
}

.progress-text {
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  color: #888;
}

/* 控制面板 */
.controls-panel {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 25px;
  padding: 20px;
  background: linear-gradient(180deg, #6b5b45, #5d4e37);
  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.3);
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

.bottom-nav a {
  display: inline-block;
  padding: 12px 30px;
  background: rgba(42, 31, 24, 0.9);
  color: #d4a574;
  font-family: 'Rye', serif;
  font-size: 1rem;
  border: 3px solid #8b4513;
  text-decoration: none;
  transition: all 0.2s;
}

.bottom-nav a:hover {
  background: #d9382e;
  color: #fff;
  border-color: #1a1a1a;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 响应式 */
@media (max-width: 768px) {
  .tv-set {
    padding: 15px;
    border-radius: 20px;
  }
  
  .controls-panel {
    gap: 30px;
    padding: 15px;
  }
  
  .bottom-nav {
    bottom: 10px;
  }
  
  .bottom-nav a {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>
