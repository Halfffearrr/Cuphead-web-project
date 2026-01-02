<script setup>
/**
 * PhaseSelector.vue - 阶段选择器组件
 * 用于 Boss 详情页的阶段切换
 */
import { computed } from 'vue';

const props = defineProps({
  phases: {
    type: Array,
    default: () => [1, 2, 3]
  },
  currentPhase: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['change']);

const selectPhase = (phase) => {
  emit('change', phase);
};

// 罗马数字转换
const toRoman = (num) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
  return romanNumerals[num - 1] || num;
};
</script>

<template>
  <div class="phase-controls">
    <button
      v-for="phase in phases"
      :key="phase"
      class="phase-btn"
      :class="{ active: currentPhase === phase }"
      @click="selectPhase(phase)"
    >
      {{ toRoman(phase) }}
    </button>
  </div>
</template>

<style scoped>
.phase-controls {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-top: 2px dashed rgba(0,0,0,0.2);
  border-bottom: 2px dashed rgba(0,0,0,0.2);
  width: 100%;
  justify-content: center;
}

.phase-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fdf5e6;
  border: 3px solid var(--ink-black, #1a1a1a);
  font-family: var(--header-font, 'Rye'), serif;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 0 rgba(0,0,0,0.2);
}

.phase-btn:hover {
  transform: translateY(-3px);
  background: #fff;
}

.phase-btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(0,0,0,0.2);
}

.phase-btn.active {
  background: var(--accent-red, #d9382e);
  color: #fff;
  border-color: #5d100b;
  transform: rotate(10deg);
}
</style>
