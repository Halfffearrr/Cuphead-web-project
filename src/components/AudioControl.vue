<script setup>
/**
 * AudioControl.vue - 音频控制组件
 * 提供静音/音量控制按钮
 */
import { ref, computed } from 'vue';
import { useAudio } from '@/hooks/useAudio';

const { isMuted, volume, toggleMute, setVolume } = useAudio();

const showVolumeSlider = ref(false);

// 音量图标
const volumeIcon = computed(() => {
  if (isMuted.value) return '🔇';
  if (volume.value > 0.6) return '🔊';
  if (volume.value > 0.3) return '🔉';
  return '🔈';
});

// 处理静音切换
function handleMuteClick() {
  toggleMute();
}

// 处理音量变化
function handleVolumeChange(e) {
  setVolume(parseFloat(e.target.value));
}

// 显示/隐藏音量滑块
function toggleVolumeSlider() {
  showVolumeSlider.value = !showVolumeSlider.value;
}
</script>

<template>
  <div class="audio-control">
    <!-- 静音按钮 -->
    <button
      class="audio-btn audio-mute-btn"
      :class="{ muted: isMuted }"
      :aria-label="isMuted ? '取消静音' : '静音'"
      :title="isMuted ? '取消静音' : '静音'"
      @click="handleMuteClick"
    >
      <span class="audio-icon">{{ volumeIcon }}</span>
    </button>

    <!-- 音量控制 -->
    <div class="volume-wrapper" @mouseenter="toggleVolumeSlider" @mouseleave="toggleVolumeSlider">
      <Transition name="slide">
        <div v-if="showVolumeSlider" class="volume-slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            :value="volume"
            class="volume-slider"
            aria-label="音量"
            @input="handleVolumeChange"
          >
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.audio-control {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9998;
  display: flex;
  align-items: center;
  gap: 8px;
}

.audio-btn {
  width: 44px;
  height: 44px;
  border: 2px solid var(--color-sepia, #d4a574);
  border-radius: 50%;
  background: rgba(26, 20, 16, 0.9);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio-btn:hover,
.audio-btn:focus-visible {
  background: var(--color-rust, #8b4513);
  border-color: var(--color-gold, #c9a227);
  transform: scale(1.1);
  outline: none;
}

.audio-btn.muted {
  opacity: 0.6;
}

.audio-icon {
  font-size: 20px;
}

.volume-wrapper {
  position: relative;
}

.volume-slider-container {
  position: absolute;
  bottom: 100%;
  right: 0;
  padding: 12px;
  background: rgba(26, 20, 16, 0.95);
  border: 2px solid var(--color-sepia, #d4a574);
  border-radius: 8px;
  margin-bottom: 8px;
}

.volume-slider {
  width: 100px;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--color-sepia, #d4a574);
  border-radius: 3px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: var(--color-gold, #c9a227);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--color-gold, #c9a227);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* 动画 */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 响应式 */
@media (max-width: 768px) {
  .audio-control {
    bottom: 10px;
    right: 10px;
  }

  .audio-btn {
    width: 40px;
    height: 40px;
  }

  .audio-icon {
    font-size: 18px;
  }
}
</style>
