<script setup>
/**
 * KnobButton.vue - 复古旋钮按钮组件
 * 用于电视机控制面板等场景
 */
defineProps({
  title: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <div class="knob-container">
    <button 
      class="knob-btn" 
      :title="title"
      @click="handleClick"
    >
      <slot></slot>
    </button>
    <div v-if="label" class="knob-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.knob-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.knob-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f5e6c8, #d4a574);
  border: 4px solid #1a1a1a;
  font-family: 'Rye', serif;
  font-size: 0.6rem;
  text-align: center;
  line-height: 1.2;
  cursor: pointer;
  box-shadow: 
    inset 0 2px 5px rgba(255,255,255,0.4),
    inset 0 -2px 5px rgba(0,0,0,0.2),
    0 5px 10px rgba(0,0,0,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
  color: #1a1a1a;
}

.knob-btn:hover {
  transform: scale(1.05);
  box-shadow: 
    inset 0 2px 5px rgba(255,255,255,0.4),
    inset 0 -2px 5px rgba(0,0,0,0.2),
    0 8px 15px rgba(0,0,0,0.5);
}

.knob-btn:active {
  transform: scale(0.95) rotate(15deg);
}

.knob-label {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 0.8rem;
  color: #e3d0a6;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}
</style>
