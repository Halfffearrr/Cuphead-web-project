<script setup>
/**
 * BackButton.vue - 返回按钮组件
 */
import { useRouter } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    default: '/'
  },
  label: {
    type: String,
    default: '← Back to Menu'
  }
});

const router = useRouter();

const goBack = () => {
  router.push(props.to);
};
</script>

<template>
  <nav class="back-nav">
    <a class="back-btn" @click.prevent="goBack" href="#">
      {{ label }}
    </a>
  </nav>
</template>

<style scoped>
.back-nav {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.back-btn {
  display: inline-block;
  padding: 12px 25px;
  background: var(--accent-red, #d9382e);
  color: #fff;
  font-family: var(--header-font, 'Rye'), serif;
  font-size: 1rem;
  border: 3px solid var(--ink-black, #1a1a1a);
  box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}

.back-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(0,0,0,0.3);
}

.back-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}
</style>
