<template>
  <div 
    class="map-view-container" 
    @mousedown="startDrag" 
    @touchstart="startDrag"
    @mousemove="onDrag"
    @touchmove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @touchend="stopDrag"
  >
    <!-- 复古滤镜层 (固定在屏幕上) -->
    <div class="retro-overlay">
      <div class="film-grain"></div>
      <div class="vignette"></div>
      <div class="scanlines"></div>
    </div>

    <!-- 调试信息 -->
    <div class="debug-info" v-if="false">
      Cam: {{ Math.round(camera.x) }}, {{ Math.round(camera.y) }}
    </div>

    <!-- 视差世界容器 -->
    <div class="parallax-world">
      
      <!-- 层级 1: 远景天空/海洋 (移动系数 0.1) -->
      <div class="world-layer layer-sky" :style="getLayerStyle(0.1)">
        <div class="bg-gradient"></div>
        <img src="@/assets/images/map-layers/浮标.png" class="prop buoy-1" />
      </div>

      <!-- 层级 2: 中远景岛屿 (移动系数 0.3) -->
      <div class="world-layer layer-islands" :style="getLayerStyle(0.3)">
        <img src="@/assets/images/map-layers/小岛主岛.png" class="prop small-island" />
        <img src="@/assets/images/map-layers/小岛灯塔.png" class="prop lighthouse" />
      </div>

      <!-- 层级 3: 游戏主平面 (移动系数 1.0 - 基准层) -->
      <div class="world-layer layer-main" :style="getLayerStyle(1.0)">
        
        <!-- 地形拼图 (新素材) -->
        <img src="@/assets/images/素材/1.png" class="prop land-1" />
        <img src="@/assets/images/素材/2.png" class="prop land-2" />
        <img src="@/assets/images/素材/3.png" class="prop land-3" />
        <img src="@/assets/images/素材/4.png" class="prop land-4" />
        
        <!-- 建筑装饰 -->
        <img src="@/assets/images/map-layers/骰子.png" class="prop building-dice" />

        <!-- 交互标记点 -->
        <div class="markers-container">
          <MapLocation
            v-for="(marker, index) in markers"
            :key="marker.id"
            :id="marker.id"
            :x="marker.x" 
            :y="marker.y"
            :icon="marker.icon"
            :title="marker.title"
            :type="marker.type"
            :description="marker.description"
            :unlocked="marker.unlocked"
            :offset-x="0"
            :offset-y="0"
            :style="{ '--marker-index': index }"
            class="world-marker"
            @click="onMarkerClick"
          />
        </div>
      </div>

      <!-- 层级 4: 前景遮挡 (移动系数 1.4) -->
      <div class="world-layer layer-foreground" :style="getLayerStyle(1.4)">
        <img src="@/assets/images/map-layers/树.png" class="prop tree-left" />
        <img src="@/assets/images/map-layers/树.png" class="prop tree-right" />
        <img src="@/assets/images/map-layers/树.png" class="prop tree-center" />
      </div>

    </div>

    <!-- UI 提示 -->
    <div class="interaction-hint" :class="{ 'fade-out': hasInteracted }">
      <div class="mouse-icon"></div>
      <span>DRAG TO EXPLORE</span>
    </div>
  </div>
</template>

<script setup>
/**
 * MapView.vue - 漫游版大地图
 * 实现了拖拽移动摄像机 + 多层视差滚动的效果
 */
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import MapLocation from '@/components/MapLocation.vue'
import { mapLocations } from '@/data/mapLocations'

const router = useRouter()
const markers = ref(mapLocations)

// ================= 配置 =================
// 虚拟世界尺寸 (比屏幕大很多)
const WORLD_WIDTH = 3000
const WORLD_HEIGHT = 1800

// ================= 状态 =================
const camera = reactive({ x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 }) // 摄像机中心点坐标
const targetCamera = reactive({ x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 })
const isDragging = ref(false)
const hasInteracted = ref(false)
const lastMousePos = { x: 0, y: 0 }

// ================= 拖拽逻辑 =================
function startDrag(e) {
  // 如果点击的是按钮或按钮内部元素，不触发拖拽
  if (e.target.closest('.map-location')) {
    return
  }
  isDragging.value = true
  hasInteracted.value = true
  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY
  lastMousePos.x = clientX
  lastMousePos.y = clientY
}

function onDrag(e) {
  if (!isDragging.value) return
  // e.preventDefault() // 防止触摸滚动页面

  const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY

  const dx = clientX - lastMousePos.x
  const dy = clientY - lastMousePos.y

  // 移动摄像机 (拖拽背景意味着摄像机向相反方向移动)
  targetCamera.x -= dx * 1.5 // 1.5倍系数让拖拽更有力
  targetCamera.y -= dy * 1.5

  // 更新上一次位置
  lastMousePos.x = clientX
  lastMousePos.y = clientY

  clampCamera()
}

function stopDrag() {
  isDragging.value = false
}

// 限制摄像机范围
function clampCamera() {
  const viewportW = window.innerWidth
  const viewportH = window.innerHeight
  
  // 简单的边界限制，防止完全看丢地图
  // 允许一定的留白，但不能无限拖
  const minX = 0
  const maxX = WORLD_WIDTH
  const minY = 0
  const maxY = WORLD_HEIGHT

  if (targetCamera.x < minX) targetCamera.x = minX
  if (targetCamera.x > maxX) targetCamera.x = maxX
  if (targetCamera.y < minY) targetCamera.y = minY
  if (targetCamera.y > maxY) targetCamera.y = maxY
}

// ================= 动画循环 =================
let rafId
function animate() {
  // 摄像机平滑跟随 (Lerp)
  camera.x += (targetCamera.x - camera.x) * 0.1
  camera.y += (targetCamera.y - camera.y) * 0.1

  rafId = requestAnimationFrame(animate)
}

// ================= 视差计算 =================
// 根据层级深度计算偏移量
// depth = 1.0 跟随摄像机 (主世界)
// depth < 1.0 移动更慢 (远景)
// depth > 1.0 移动更快 (近景)
function getLayerStyle(depth) {
  const viewportW = window.innerWidth
  const viewportH = window.innerHeight

  // 计算摄像机主要针对主世界(depth=1)的偏移
  // 我们希望 camera.x, camera.y 对应屏幕中心
  // offset = screenCenter - camera * depth
  
  // 对于视差层，我们需要一个参考点（世界中心），以免层级错位
  const worldCenterX = WORLD_WIDTH / 2
  const worldCenterY = WORLD_HEIGHT / 2

  // 视差公式：
  // LayerOffset = (WorldCenter - CameraPos) * depth
  // 这样当 Camera 在 WorldCenter 时，所有层对齐
  
  const offsetX = (worldCenterX - camera.x) * depth
  const offsetY = (worldCenterY - camera.y) * depth

  // 加上初始居中修正，让 WorldCenter 对应 ScreenCenter
  const screenCenterX = viewportW / 2
  const screenCenterY = viewportH / 2
  
  // 最终 transform
  const finalX = screenCenterX - worldCenterX + offsetX
  const finalY = screenCenterY - worldCenterY + offsetY

  return {
    transform: `translate3d(${finalX}px, ${finalY}px, 0)`
  }
}

// ================= 交互回调 =================
function onMarkerClick(eventData) {
  // eventData 来自 MapLocation emit，只有 { id, type }
  // 需要从 markers 中找到完整的 marker 对象
  const marker = markers.value.find(m => m.id === eventData.id)
  if (marker && marker.route) {
    if (marker.routeParams) {
      router.push({ path: marker.route, query: marker.routeParams })
    } else {
      router.push(marker.route)
    }
  }
}

// ================= 生命周期 =================
onMounted(() => {
  // 初始摄像机位置设置为第一个标记点或者中心
  targetCamera.x = WORLD_WIDTH * 0.5
  targetCamera.y = WORLD_HEIGHT * 0.5
  
  animate()
  window.addEventListener('resize', clampCamera)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', clampCamera)
})
</script>

<style scoped>
.map-view-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #4da6ff; /* 海洋/天空基色 */
  position: relative;
  cursor: grab;
  user-select: none;
}

.map-view-container:active {
  cursor: grabbing;
}

/* 调试信息 */
.debug-info {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 5px;
  z-index: 9999;
  font-family: monospace;
}

/* 视差容器 */
.parallax-world {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* 3D 变换性能优化 */
  perspective: 1000px;
}

.world-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 3000px; /* 需与 WORLD_WIDTH 一致 */
  height: 1800px; /* 需与 WORLD_HEIGHT 一致 */
  transform-origin: center center;
  pointer-events: none; /* 让鼠标事件透过层级传到底层容器 */
  will-change: transform;
}

/* 激活主层的点击事件，否则点不到 marker */
.layer-main {
  pointer-events: auto;
}

/* ========== 层级内容布局 ========== */

/* 天空/背景 */
.bg-gradient {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%);
  opacity: 0.8;
}

.prop {
  position: absolute;
  display: block;
  /* 像素化渲染，保持复古感 */
  image-rendering: pixelated; 
}

/* 远景物体 */
.buoy-1 {
  bottom: 20%;
  right: 15%;
  width: 80px;
  animation: float 4s infinite ease-in-out;
}

/* 中远景物体 */
.small-island {
  top: 20%;
  left: 10%;
  width: 400px;
}
.lighthouse {
  top: 15%;
  left: 15%;
  width: 100px;
  z-index: 1;
}

/* 主地形 (使用新素材) */
.land-1 {
  top: 30%;
  left: 2%;
  width: 750px;
  z-index: 5;
}
.land-2 {
  top: 35%;
  left: 25%;
  width: 700px;
  z-index: 4; /*稍微靠后一点，制造层叠感 */
}
.land-3 {
  top: 28%;
  left: 48%;
  width: 750px;
  z-index: 5;
}
.land-4 {
  top: 32%;
  left: 72%;
  width: 800px;
  z-index: 4;
}

/* 建筑 (相对位置微调适配新地形) */
.building-shop {
  top: 35%;
  left: 15%; /* 移到左1岛 */
  width: 150px;
  z-index: 10;
}
.building-dice {
  top: 25%;
  left: 80%; /* 移到右2岛 */
  width: 180px;
  z-index: 10;
}

/* 标记容器 (填满主层) */
.markers-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none; /* 容器本身不拦截事件 */
}

/* 确保 MapLocation 按钮可点击 */
.markers-container :deep(.map-location) {
  pointer-events: auto !important;
  cursor: pointer !important;
}

/* 专门针对 MapLocation 在大地图模式下的样式调整 */
/* 注意：MapLocation 组件通过 props 接收 x/y (百分比) */
/* 在这里我们需要确保 MapLocation 绝对定位是相对于 .layer-main (3000x2000) */
/* 现有的 MapLocation 内部已经是 position: absolute 并使用 left: x%, top: y% */
/* 所以只要父容器尺寸是对的，百分比就能正常工作 */

/* 前景 */
.tree-left {
  bottom: 5%;
  left: 5%;
  width: 400px;
  filter: blur(2px);
}
.tree-center {
  bottom: -10%;
  left: 40%;
  width: 500px;
  filter: blur(1px);
}
.tree-right {
  bottom: 10%;
  right: 2%;
  width: 450px;
  filter: blur(2px);
}

/* 交互提示 */
.interaction-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-family: 'CupheadMemphis', sans-serif;
  text-shadow: 2px 2px 0 #000;
  opacity: 0.8;
  transition: opacity 1s;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.interaction-hint.fade-out {
  opacity: 0;
}
.mouse-icon {
  width: 30px;
  height: 48px;
  border: 2px solid white;
  border-radius: 15px;
  position: relative;
}
.mouse-icon::after {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: white;
  border-radius: 2px;
  animation: scrollMouse 1.5s infinite;
}

@keyframes scrollMouse {
  0% { top: 8px; opacity: 1; }
  100% { top: 20px; opacity: 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* 复古滤镜复用 (确保有高 z-index) */
.retro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}
</style>










