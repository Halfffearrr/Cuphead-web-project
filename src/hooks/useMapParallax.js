/**
 * useMapParallax.js - 地图视差效果 Composable
 * 成员1 子任务A：实现多层背景视差
 *
 * 功能：
 * 1. 鼠标移动时产生 x/y 方向视差偏移
 * 2. 页面滚动时产生轻微 y 方向偏移
 * 3. 移动端（触摸设备）自动禁用鼠标视差
 * 4. 支持自定义层数和强度参数
 *
 * 使用方式：
 * const { layerStyles, start, stop } = useMapParallax({ layerCount: 3 })
 */

import { reactive, ref } from 'vue'

/**
 * @typedef {Object} ParallaxOptions
 * @property {number} [layerCount=3] - 视差层数量
 * @property {number} [mouseIntensity=15] - 鼠标移动强度（像素）
 * @property {number} [scrollIntensity=0.03] - 滚动强度系数
 */

/**
 * 创建地图视差效果
 * @param {ParallaxOptions} options - 配置选项
 */
export default function useMapParallax(options = {}) {
  const {
    layerCount = 3,
    mouseIntensity = 15,
    scrollIntensity = 0.03
  } = options

  // 鼠标偏移量（用于外部计算各元素视差）
  const mouseOffset = ref({ x: 0, y: 0 })

  // 每一层的 style 对象（响应式）
  const layerStyles = Array.from({ length: layerCount }, () =>
    reactive({ transform: 'translate3d(0, 0, 0)' })
  )

  // 当前偏移量（用于混合鼠标+滚动）
  const offsets = Array.from({ length: layerCount }, () => ({
    mouseX: 0,
    mouseY: 0,
    scrollY: 0
  }))

  // 是否已启动
  const isActive = ref(false)

  // ==================== 工具函数 ====================

  /**
   * 检测是否为触摸设备
   */
  function isTouchDevice() {
    if (typeof window === 'undefined') {
      return false
    }
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0
    )
  }

  /**
   * 计算层深度（远层深度小，近层深度大）
   * @param {number} layerIndex - 层索引（0 = 最远）
   */
  function getDepth(layerIndex) {
    return (layerIndex + 1) / (layerCount + 1)
  }

  /**
   * 更新指定层的 transform
   * @param {number} idx - 层索引
   */
  function updateLayerTransform(idx) {
    const { mouseX, mouseY, scrollY } = offsets[idx]
    const tx = mouseX
    const ty = mouseY + scrollY
    layerStyles[idx].transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
  }

  // ==================== 事件处理 ====================

  /**
   * 鼠标移动处理（仅桌面端）
   */
  function onMouseMove(e) {
    if (isTouchDevice()) {
      return
    }

    // 归一化鼠标位置到 [-1, 1]
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2

    // 更新全局鼠标偏移（用于单个元素视差）
    mouseOffset.value = {
      x: x * mouseIntensity,
      y: y * mouseIntensity * 0.6
    }

    offsets.forEach((offset, idx) => {
      const depth = getDepth(idx)
      offset.mouseX = x * mouseIntensity * depth
      offset.mouseY = y * mouseIntensity * 0.6 * depth
      updateLayerTransform(idx)
    })
  }

  /**
   * 滚动处理
   */
  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset || 0

    offsets.forEach((offset, idx) => {
      const depth = getDepth(idx)
      offset.scrollY = scrollY * scrollIntensity * depth
      updateLayerTransform(idx)
    })
  }

  /**
   * 窗口大小变化时重置偏移
   */
  function onResize() {
    offsets.forEach((offset, idx) => {
      offset.mouseX = 0
      offset.mouseY = 0
      offset.scrollY = 0
      updateLayerTransform(idx)
    })
  }

  // ==================== 生命周期 ====================

  /**
   * 启动视差效果（添加事件监听）
   */
  function start() {
    if (typeof window === 'undefined' || isActive.value) {
      return
    }

    isActive.value = true

    // 仅桌面端监听鼠标移动
    if (!isTouchDevice()) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // 初始化滚动偏移
    onScroll()
  }

  /**
   * 停止视差效果（移除事件监听）
   */
  function stop() {
    if (typeof window === 'undefined' || !isActive.value) {
      return
    }

    isActive.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  }

  /**
   * 手动触发滚动更新（供外部调用）
   */
  function handleScroll() {
    onScroll()
  }

  /**
   * 重置所有偏移
   */
  function reset() {
    offsets.forEach((offset, idx) => {
      offset.mouseX = 0
      offset.mouseY = 0
      offset.scrollY = 0
      updateLayerTransform(idx)
    })
  }

  return {
    /** 每一层的 style 对象数组，用于绑定到 :style */
    layerStyles,
    /** 鼠标偏移量，用于计算各元素视差 */
    mouseOffset,
    /** 启动视差效果 */
    start,
    /** 停止视差效果 */
    stop,
    /** 手动触发滚动更新 */
    handleScroll,
    /** 重置所有偏移 */
    reset,
    /** 是否已激活 */
    isActive
  }
}
