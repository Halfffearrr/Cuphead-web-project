<script setup>
/**
 * App.vue - 根组件
 * 包含全局特效层和路由视图
 */
import RetroOverlay from '@/components/RetroOverlay.vue';
</script>

<template>
  <div id="cuphead-app">
    <!-- 全局复古特效层 -->
    <RetroOverlay />
    
    <!-- 路由视图 -->
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
#cuphead-app {
  min-height: 100vh;
  position: relative;
}

/* 页面切换过渡动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
