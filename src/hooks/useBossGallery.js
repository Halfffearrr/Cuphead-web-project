/**
 * useBossGallery.js - Boss 画廊逻辑
 * 管理 Boss 列表、选择、阶段切换
 */

import { ref, computed } from 'vue';
import { bossesData } from '@/data/bossData';

export function useBossGallery() {
  // 状态
  const currentBoss = ref(null);
  const currentPhase = ref(0); // 0 表示默认状态
  const isLoading = ref(false);

  // 计算属性
  const bossList = computed(() => bossesData);

  const currentImage = computed(() => {
    if (!currentBoss.value) return '';
    if (currentPhase.value === 0) {
      return currentBoss.value.defaultImg;
    }
    return currentBoss.value.phases[currentPhase.value]?.img || currentBoss.value.defaultImg;
  });

  const currentDescription = computed(() => {
    if (!currentBoss.value) return 'Click on a name from the list to view the contract details...';
    if (currentPhase.value === 0) {
      return currentBoss.value.defaultDesc;
    }
    return currentBoss.value.phases[currentPhase.value]?.desc || currentBoss.value.defaultDesc;
  });

  const currentTitle = computed(() => {
    return currentBoss.value?.name || 'Select a Boss';
  });

  // 方法
  const selectBoss = (boss) => {
    isLoading.value = true;
    currentBoss.value = boss;
    currentPhase.value = 0;
    
    // 模拟加载效果
    setTimeout(() => {
      isLoading.value = false;
    }, 100);
  };

  const changePhase = (phase) => {
    if (!currentBoss.value) return;
    isLoading.value = true;
    currentPhase.value = phase;
    
    setTimeout(() => {
      isLoading.value = false;
    }, 100);
  };

  const resetToDefault = () => {
    currentPhase.value = 0;
  };

  // 初始化：选中第一个 Boss
  const initFirstBoss = () => {
    if (bossesData.length > 0) {
      selectBoss(bossesData[0]);
    }
  };

  return {
    // 状态
    currentBoss,
    currentPhase,
    isLoading,
    
    // 计算属性
    bossList,
    currentImage,
    currentDescription,
    currentTitle,
    
    // 方法
    selectBoss,
    changePhase,
    resetToDefault,
    initFirstBoss
  };
}
