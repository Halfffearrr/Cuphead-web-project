# 🎨 3D像素风格长页面 - Cuphead项目设计方案

## 📋 目录
- [配色方案](#配色方案)
- [3D像素背景实现](#3d像素背景实现)
- [长页面结构](#长页面结构)
- [滑动交互系统](#滑动交互系统)
- [侧边导航索引栏](#侧边导航索引栏)
- [所需素材清单](#所需素材清单)

---

## 🎨 配色方案

基于 **Shopify Editions Winter '26** 的现代科技感，结合 Cuphead 的复古游戏风格：

### 主色调 (Primary Colors)
```css
--primary-dark: #0a0a0a      /* 深黑背景 - Shopify风格 */
--primary-red: #d9382e       /* Cuphead标志性红色 */
--accent-crimson: #c41e3a    /* 深红强调色 */
--neon-red: #ff4466          /* 霓虹红 - 科技光效 */
```

### 辅助色 (Secondary Colors)
```css
--card-dark: #1a1a1a         /* 卡片深色背景 */
--card-border: #2d2d2d       /* 卡片边框 */
--glass-white: rgba(255, 255, 255, 0.05)  /* 玻璃态白 */
--glass-red: rgba(217, 56, 46, 0.1)        /* 玻璃态红 */
```

### 文字色 (Text Colors)
```css
--text-primary: #ffffff      /* 主文本 - 纯白 */
--text-secondary: #a0a0a0    /* 次要文本 - 灰色 */
--text-muted: #666666        /* 弱化文本 */
--text-glow: #ff6b82         /* 发光文本效果 */
```

### 特效色 (Effects)
```css
--glow-red: rgba(255, 68, 102, 0.4)      /* 红色光晕 */
--shadow-deep: rgba(0, 0, 0, 0.8)        /* 深阴影 */
--gradient-hero: linear-gradient(135deg, #0a0a0a 0%, #1a0f0f 100%)
```

---

## 🎯 3D像素背景实现

### Canvas 3D 粒子系统
使用原生Canvas 2D API模拟3D透视效果：

```javascript
// 3D透视投影公式
const scale = 500 / (500 + z);  // z越大，物体越远，scale越小
const x2d = (x * scale) + canvas.width / 2;
const y2d = (y * scale) + canvas.height / 2;
```

### 像素化立方体
- **50个随机大小的立方体**，颜色取自Cuphead主题色
- 以不同速度向观察者移动（Z轴 -= speed）
- 当立方体到达近点时重置到远点，形成无限循环

### 赌场元素粒子
- 扑克牌 🃏
- 骰子 🎲  
- 金币 🪙
- 四种花色 ♠️♥️♦️♣️

这些emoji图标会在3D空间中漂浮，营造赌场氛围。

---

## 📜 长页面结构

### Section 布局
```
┌─────────────────────────────────────┐
│  [侧边导航: ● ○ ○ ○]               │
│                                     │
│  Section 1: Hero (100vh)            │
│  ├─ 标题: DON'T DEAL WITH THE DEVIL│
│  └─ 副标题                          │
├─────────────────────────────────────┤
│  Section 2: Story (100vh)           │
│  ├─ 故事书预览图                    │
│  ├─ 故事简介                        │
│  └─ [阅读完整故事] 按钮            │
├─────────────────────────────────────┤
│  Section 3: Boss (100vh)            │
│  ├─ Boss卡片网格 (3列)             │
│  └─ [查看完整画廊] 按钮            │
├─────────────────────────────────────┤
│  Section 4: Game (100vh)            │
│  ├─ 游戏预览                        │
│  └─ [开始游戏] 按钮                │
└─────────────────────────────────────┘
```

每个Section占满一屏（min-height: 100vh），方便滚动导航。

---

## 🎢 滑动交互系统

### Parallax 视差滚动
```javascript
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('[data-parallax]').forEach(elem => {
        const speed = parseFloat(elem.getAttribute('data-parallax'));
        const yPos = -(scrolled * speed);
        elem.style.transform = `translateY(${yPos}px)`;
    });
});
```

- `data-parallax="0.2"` - 标题移动速度（20%滚动速度）
- `data-parallax="0.15"` - 卡片移动速度（15%）
- 数值越小，移动越慢，产生深度感

### 平滑滚动
```css
html {
    scroll-behavior: smooth;
}
```

点击导航点时，页面会平滑滚动到对应Section。

---

## 🎯 侧边导航索引栏

### 设计规格
- **位置**: Fixed右侧，距离右边缘40px
- **样式**: 圆点导航，12px直径
- **状态**:
  - 默认: 半透明白色，红色边框
  - 悬浮: 红色背景，放大1.3倍，显示标签
  - 激活: 红色背景，放大1.5倍，红色光晕

### 自动激活逻辑
```javascript
function updateNavDots() {
    const scrollPos = window.pageYOffset + window.innerHeight / 2;
    
    sections.forEach((sectionId, index) => {
        if (当前滚动位置在这个Section范围内) {
            dots[index].classList.add('active');
        }
    });
}
```

滚动时自动高亮当前Section对应的导航点。

---

## 📦 所需素材清单

### 🔴 必需素材

| 素材名称 | 用途 | 规格 | 占位名称 |
|---------|------|------|---------|
| **故事书封面** | Story Section预览 | 400x400px, PNG | `STORY_BOOK_COVER.png` |

### 🟢 可选素材（增强视觉）

| 素材名称 | 用途 | 规格 | 占位名称 |
|---------|------|------|---------|
| **Boss头像** | Boss卡片图标替换 | 128x128px, PNG | `BOSS_*.png` |
| **3D立方体纹理** | 替换纯色立方体 | 64x64px, PNG | `CUBE_TEXTURE.png` |

---

## 🚀 快速预览

### 1️⃣ 打开页面
```bash
open src/html/hero-demo.html
```

### 2️⃣ 测试功能
- ✅ 滚动页面查看视差效果
- ✅ 点击右侧导航点跳转Section
- ✅ 观察3D像素背景动画
- ✅ 点击按钮跳转到实际页面

### 3️⃣ 自定义调整
在 `hero-demo.html` 中搜索以下关键词进行修改：
- `cubes.push()` - 调整立方体数量
- `casinoElements` - 修改赌场元素
- `data-parallax` - 调整视差速度

---

## 🎨 配色对比

| 元素 | 颜色 | Hex | 用途 |
|------|------|-----|------|
| 背景 | 深黑 | `#0a0a0a` | 主背景色 |
| 主色 | Cuphead红 | `#d9382e` | 按钮、强调 |
| 霓虹红 | 科技红 | `#ff4466` | 光效、渐变 |
| 卡片背景 | 深灰 | `#1a1a1a` | 卡片底色 |
| 边框 | 中灰 | `#2d2d2d` | 卡片边框 |
| 主文本 | 纯白 | `#ffffff` | 标题文字 |
| 次文本 | 浅灰 | `#a0a0a0` | 描述文字 |

---

## 💡 技术特点

✅ **纯Canvas 3D** - 无需Three.js等库，轻量级  
✅ **视差滚动** - 多层深度感  
✅ **响应式设计** - 移动端自适应  
✅ **性能优化** - requestAnimationFrame动画  
✅ **渐进增强** - Canvas不支持时降级为纯色背景  

---

## 📱 响应式适配

### 移动端 (< 768px)
- 隐藏侧边导航
- Story预览改为垂直布局
- Boss卡片改为单列
- 减少Section内边距

### 平板 (768px - 1024px)
- Boss卡片2列布局
- 调整字体大小

### 桌面 (> 1024px)
- 完整3D效果
- 全部功能可用

---

### 布局结构
```
┌─────────────────────────────────────────────┐
│                                             │
│            [背景网格 + 粒子动画]            │
│                                             │
│         DON'T DEAL WITH                     │ ← 120px 渐变标题
│           THE DEVIL                         │   带光晕效果
│                                             │
│    体验1930年代卡通风格的弹幕射击游戏       │ ← 24px 副标题
│                                             │
│       [🎮 开始冒险] [▶️ 观看预告]          │ ← CTA按钮组
│                                             │
│   ╔═══════════╗ ╔═══════════╗ ╔═══════════╗ │
│   ║    ☠️    ║ ║    🎨    ║ ║    👥    ║ │ ← 玻璃态卡片
│   ║ Boss战   ║ ║ 手绘风格  ║ ║ 双人模式  ║ │   3列网格
│   ║ 描述文字  ║ ║ 描述文字  ║ ║ 描述文字  ║ │
│   ╚═══════════╝ ╚═══════════╝ ╚═══════════╝ │
│                                             │
└─────────────────────────────────────────────┘
```

### 设计要点

#### 1. 视觉层次
- **背景层**：深黑渐变 + 网格纹理 + 粒子动画
- **内容层**：渐变标题 + 按钮 + 卡片
- **特效层**：光晕、阴影、模糊效果

#### 2. 动画时序
```javascript
标题   → 0s    淡入上移动画
副标题 → 0.2s  延迟淡入
按钮   → 0.4s  延迟淡入
卡片   → 0.6s  延迟淡入
```

#### 3. 交互反馈
- **按钮悬停**：上移 2px + 阴影增强 + 渐变变化
- **卡片悬停**：上移 8px + 红色光晕 + 图标旋转放大
- **标题效果**：持续呼吸光晕动画

---

## 💅 Tailwind CSS 实现

### 配置文件 (tailwind.config.js)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'cuphead-dark': '#0a0a0a',
        'cuphead-red': '#d9382e',
        'cuphead-crimson': '#c41e3a',
        'cuphead-neon': '#ff4466',
        'card-dark': '#1a1a1a',
        'card-border': '#2d2d2d',
      },
      fontFamily: {
        heading: ['Rye', 'serif'],
        body: ['Gloria Hallelujah', 'cursive'],
        modern: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) backwards',
        'text-glow': 'textGlow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        textGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 30px rgba(255, 68, 102, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 50px rgba(255, 68, 102, 0.6))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Tailwind 类名实现

#### Hero Section
```html
<section class="min-h-screen flex flex-col justify-center items-center 
                px-6 md:px-12 py-16 bg-gradient-to-br from-cuphead-dark to-[#1a0f0f] 
                relative overflow-hidden">
  
  <!-- 背景网格 -->
  <div class="absolute inset-0 opacity-[0.02]" 
       style="background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
              background-size: 50px 50px;">
  </div>
  
  <!-- 内容 -->
  <div class="relative z-10 max-w-6xl text-center animate-fade-in-up">
    ...
  </div>
</section>
```

#### 主标题
```html
<h1 class="font-heading font-bold text-5xl md:text-7xl lg:text-9xl 
           leading-none mb-8
           bg-gradient-to-br from-white via-cuphead-neon to-cuphead-red 
           bg-clip-text text-transparent
           animate-text-glow">
  DON'T DEAL WITH<br>THE DEVIL
</h1>
```

#### 按钮组件
```html
<!-- 主按钮 -->
<button class="relative inline-flex items-center gap-2 
               px-10 py-4 rounded-full
               bg-gradient-to-br from-cuphead-red to-cuphead-crimson
               text-white font-semibold font-modern
               shadow-lg shadow-cuphead-red/30
               hover:shadow-xl hover:shadow-cuphead-red/50
               hover:-translate-y-0.5
               transition-all duration-300 ease-out
               overflow-hidden group">
  
  <span class="relative z-10">🎮 开始冒险</span>
  
  <!-- 悬停渐变层 -->
  <div class="absolute inset-0 bg-gradient-to-br from-cuphead-neon to-cuphead-red 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  </div>
</button>

<!-- 次要按钮（玻璃态） -->
<button class="px-10 py-4 rounded-full
               bg-white/5 backdrop-blur-glass border border-card-border
               text-white font-semibold font-modern
               hover:bg-white/10 hover:border-cuphead-red
               hover:-translate-y-0.5
               transition-all duration-300 ease-out">
  ▶️ 观看预告
</button>
```

#### 特色卡片
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
  
  <div class="relative p-8 rounded-3xl
              bg-card-dark/60 backdrop-blur-glass border border-card-border
              hover:border-cuphead-red hover:-translate-y-2
              transition-all duration-400 ease-out
              overflow-hidden group">
    
    <!-- 悬停光效 -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 
                transition-opacity duration-400
                bg-[radial-gradient(circle_at_center,_rgba(217,56,46,0.1)_0%,_transparent_70%)]">
    </div>
    
    <!-- 图标 -->
    <div class="relative z-10 w-20 h-20 mx-auto mb-6
                flex items-center justify-center text-4xl
                bg-cuphead-red/10 border-2 border-card-border rounded-2xl
                group-hover:bg-gradient-to-br group-hover:from-cuphead-red group-hover:to-cuphead-crimson
                group-hover:border-cuphead-neon group-hover:scale-110 group-hover:rotate-6
                transition-all duration-300">
      ☠️
    </div>
    
    <!-- 标题 -->
    <h3 class="relative z-10 font-heading text-2xl text-white mb-4">
      史诗级Boss战
    </h3>
    
    <!-- 描述 -->
    <p class="relative z-10 font-modern text-sm text-gray-400 leading-relaxed">
      挑战19位独特设计的Boss，每个都有独特的攻击模式和华丽的动画效果
    </p>
  </div>
  
</div>
```

---

## 📦 所需素材清单

### 1. 背景粒子动画素材

| 素材名称 | 用途 | 规格要求 | 占位名称 |
|---------|------|---------|---------|
| **扑克牌图片** | 背景漂浮粒子 | 256x256px, PNG透明背景 | `PARTICLE_CARDS.png` |
| **骰子图片** | 背景漂浮粒子 | 256x256px, PNG透明背景 | `PARTICLE_DICE.png` |
| **金币图片** | 背景漂浮粒子 | 256x256px, PNG透明背景 | `PARTICLE_COINS.png` |

**设计建议**：
- 使用 Cuphead 游戏中的实际素材或类似风格
- 保持1930年代卡通美学
- 添加轻微的手绘质感

---

### 2. 特色卡片图标

| 素材名称 | 用途 | 规格要求 | 占位名称 |
|---------|------|---------|---------|
| **Boss头像图标** | 卡片1图标 | 128x128px, SVG或PNG | `ICON_BOSS.svg` |
| **艺术画笔图标** | 卡片2图标 | 128x128px, SVG或PNG | `ICON_ART.svg` |
| **双人游戏图标** | 卡片3图标 | 128x128px, SVG或PNG | `ICON_COOP.svg` |

**设计建议**：
- 可以使用 Cuphead 和 Mugman 的头像
- 或者使用骷髅、画笔、控制器等符号化图标
- 保持统一的艺术风格

---

### 3. Hero Section 装饰元素（可选）

| 素材名称 | 用途 | 规格要求 | 占位名称 |
|---------|------|---------|---------|
| **主角立绘** | 标题旁装饰 | 512x512px, PNG透明 | `HERO_CUPHEAD.png` |
| **恶魔图标** | 标题装饰 | 256x256px, PNG透明 | `HERO_DEVIL.png` |
| **赌场背景** | 可选背景层 | 1920x1080px, PNG | `BG_CASINO.png` |

---

### 4. Logo 与品牌素材

| 素材名称 | 用途 | 规格要求 | 占位名称 |
|---------|------|---------|---------|
| **Cuphead Logo** | 顶部导航 | SVG或高清PNG | `LOGO_CUPHEAD.svg` |
| **Favicon** | 浏览器图标 | 32x32px, ICO或PNG | `favicon.ico` |

---

## 📝 素材准备优先级

### 🔴 高优先级（必需）
1. **ICON_BOSS.svg** - 卡片图标
2. **ICON_ART.svg** - 卡片图标
3. **ICON_COOP.svg** - 卡片图标

### 🟡 中优先级（建议）
4. **PARTICLE_CARDS.png** - 背景动画
5. **PARTICLE_DICE.png** - 背景动画
6. **PARTICLE_COINS.png** - 背景动画

### 🟢 低优先级（可选）
7. **HERO_CUPHEAD.png** - 装饰立绘
8. **LOGO_CUPHEAD.svg** - 品牌Logo

---

## 🚀 快速开始

### 1. 查看效果
```bash
# 在浏览器中打开
open src/html/hero-demo.html
```

### 2. 替换素材
将准备好的素材放入对应目录：
```
src/
  assets/
    images/
      particles/
        ├── PARTICLE_CARDS.png
        ├── PARTICLE_DICE.png
        └── PARTICLE_COINS.png
      icons/
        ├── ICON_BOSS.svg
        ├── ICON_ART.svg
        └── ICON_COOP.svg
```

### 3. 更新引用路径
在 `hero-demo.html` 中搜索 `素材占位` 并替换为实际路径。

---

## 🎨 配色对比

| 风格 | 背景色 | 主色调 | 强调色 | 文字色 |
|------|--------|--------|--------|--------|
| **原版Cuphead** | `#e3d0a6` | `#d9382e` | `#2e4d34` | `#1a1a1a` |
| **Shopify风格** | `#0a0a0a` | `#d9382e` | `#ff4466` | `#ffffff` |

---

## 💡 实现提示

1. **玻璃态效果**：使用 `backdrop-filter: blur(20px)` + 半透明背景
2. **光晕效果**：使用 `filter: drop-shadow()` 或 `box-shadow`
3. **渐变文字**：使用 `background-clip: text` + `text-fill-color: transparent`
4. **平滑动画**：使用 `cubic-bezier(0.16, 1, 0.3, 1)` 缓动函数

---

生成时间：2025-12-27  
基于：Shopify Editions Winter '26 设计风格
