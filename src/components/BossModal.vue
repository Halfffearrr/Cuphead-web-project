<script setup>
/**
 * BossModal.vue - Boss 画廊模态框组件
 * 在地图上点击 Boss 标记时显示
 */
import { ref, computed, watch } from 'vue';
import BaseModal from './BaseModal.vue';
import PhaseSelector from './PhaseSelector.vue';
import { bossesData } from '@/data/bossData';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  /** 指定显示的 Boss ID (可选) */
  bossId: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['close']);

// 状态
const currentBoss = ref(null);
const currentPhase = ref(0);
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
  if (!currentBoss.value) return '点击左侧列表选择一个 Boss 查看详情...';
  if (currentPhase.value === 0) {
    return currentBoss.value.defaultDesc;
  }
  return currentBoss.value.phases[currentPhase.value]?.desc || currentBoss.value.defaultDesc;
});

const currentTitle = computed(() => {
  return currentBoss.value?.name || '选择一个 Boss';
});

// 方法
function selectBoss(boss) {
  isLoading.value = true;
  currentBoss.value = boss;
  currentPhase.value = 0;
  setTimeout(() => {
    isLoading.value = false;
  }, 150);
}

function changePhase(phase) {
  if (!currentBoss.value) return;
  isLoading.value = true;
  currentPhase.value = phase;
  setTimeout(() => {
    isLoading.value = false;
  }, 150);
}

function handleClose() {
  emit('close');
}

// 模态框打开时初始化
function onOpened() {
  if (props.bossId) {
    const boss = bossesData.find(b => b.id === props.bossId);
    if (boss) {
      selectBoss(boss);
      return;
    }
  }
  // 默认选中第一个
  if (bossesData.length > 0) {
    selectBoss(bossesData[0]);
  }
}

// 监听 bossId 变化
watch(() => props.bossId, (newId) => {
  if (newId && props.visible) {
    const boss = bossesData.find(b => b.id === newId);
    if (boss) selectBoss(boss);
  }
});
</script>

<template>
  <BaseModal
    :visible="visible"
    title="💀 Boss 图鉴"
    size="large"
    @close="handleClose"
    @opened="onOpened"
  >
    <div class="boss-modal">
      <!-- 左侧：Boss 列表 -->
      <aside class="boss-list">
        <h3 class="boss-list-title">WANTED</h3>
        <ul>
          <li
            v-for="boss in bossList"
            :key="boss.id"
            class="boss-list-item"
            :class="{ active: currentBoss?.id === boss.id }"
            @click="selectBoss(boss)"
          >
            {{ boss.name }}
          </li>
        </ul>
      </aside>

      <!-- 右侧：详情 -->
      <main class="boss-detail">
        <h2 class="boss-name">{{ currentTitle }}</h2>

        <div class="boss-image-container">
          <Transition name="fade" mode="out-in">
            <img
              v-if="currentImage"
              :key="currentImage"
              :src="currentImage"
              :alt="currentTitle"
              class="boss-image"
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
      </main>
    </div>
  </BaseModal>
</template>

<style scoped>
.boss-modal {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  min-height: 400px;
}

/* Boss 列表 */
.boss-list {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid var(--color-sepia, #d4a574);
  border-radius: 12px;
  padding: 16px;
  overflow-y: auto;
}

.boss-list-title {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.9rem;
  color: var(--color-red, #c41e3a);
  text-align: center;
  margin: 0 0 16px 0;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
}

.boss-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.boss-list-item {
  padding: 10px 12px;
  margin-bottom: 8px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 0.9rem;
  color: var(--color-cream, #f5e6c8);
  transition: all 0.2s ease;
}

.boss-list-item:hover {
  background: rgba(201, 162, 39, 0.2);
  border-color: var(--color-sepia, #d4a574);
}

.boss-list-item.active {
  background: var(--color-rust, #8b4513);
  border-color: var(--color-gold, #c9a227);
}

/* Boss 详情 */
.boss-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.boss-name {
  font-family: var(--header-font, 'Rye', serif);
  font-size: 1.6rem;
  color: var(--color-gold, #c9a227);
  margin: 0;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.4);
}

.boss-image-container {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 4/3;
  border: 4px solid var(--color-rust, #8b4513);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
}

.boss-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.boss-image.loading {
  opacity: 0.5;
}

.boss-description {
  width: 100%;
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 2px solid var(--color-sepia, #d4a574);
}

.boss-description p {
  font-family: var(--body-font, 'Gloria Hallelujah', cursive);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-cream, #f5e6c8);
  margin: 0;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .boss-modal {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .boss-list {
    display: flex;
    flex-direction: column;
  }

  .boss-list ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .boss-list-item {
    margin-bottom: 0;
    flex: 1;
    min-width: 120px;
    text-align: center;
  }

  .boss-name {
    font-size: 1.3rem;
  }

  .boss-image-container {
    max-width: 300px;
  }
}
</style>
