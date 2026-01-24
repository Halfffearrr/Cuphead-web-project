# 🎮 Cuphead 地图系统 - 小组任务分配

> **项目目标**：实现一个手绘风格的交互式地图，替代现有的页面跳转导航

---

## 👥 人员分配（5人）

### 👤 成员 1 - 地图容器与布局 【核心组件】

**工作内容**：创建地图主页面和基础结构

**修改文件**：
- 📁 `src/views/MapView.vue` （新建）

**任务描述**：
1. 创建一个全屏地图容器
2. 添加背景图片占位符
3. 设置基础的 CSS 样式（全屏、居中）

**需要向 AI 问的问题**：
```
我需要创建一个 Vue 3 组件 MapView.vue，要求：
1. 全屏显示
2. 有一个背景图片容器
3. 可以在上面放置多个可点击的位置标记
4. 使用 Composition API
请给我完整的代码结构
```

**需要准备的素材**：
- ✅ 地图背景图（1920x1080，手绘风格）
  - 可以去 Pinterest 搜 "Cuphead map background"
  - 或使用 Midjourney/Stable Diffusion 生成：提示词 "1930s cartoon style island map, hand drawn, vintage"
- 📂 保存位置：`src/assets/images/map-background.jpg`

---

### 👤 成员 2 - 地图位置标记组件 【交互组件】

**工作内容**：创建可点击的地图标记点

**修改文件**：
- 📁 `src/components/MapLocation.vue` （新建）

**任务描述**：
1. 创建一个可复用的位置标记组件
2. 支持传入坐标（x, y）和图标
3. 鼠标悬停时有放大动画
4. 点击时发送事件

**需要向 AI 问的问题**：
```
我需要创建一个 Vue 3 组件 MapLocation.vue，要求：
1. 接收 props: x坐标、y坐标、图标、标题
2. 使用绝对定位显示在指定位置
3. 鼠标悬停时图标放大 1.2 倍并旋转 5 度
4. 点击时触发 @click 事件
5. 有复古卡通风格
请给我代码
```

**需要准备的素材**：
- ✅ 位置标记图标（PNG，透明背景）：
  - 📖 故事书图标 `story-marker.png`
  - 💀 Boss 图标 `boss-marker.png` 
  - 🎮 游戏图标 `game-marker.png`
- 📂 保存位置：`src/assets/images/markers/`

---

### 👤 成员 3 - 模态框系统 【内容展示】

**工作内容**：创建点击地图标记后显示的弹窗

**修改文件**：
- 📁 `src/components/StoryModal.vue` （新建）
- 📁 `src/components/BossModal.vue` （新建）

**任务描述**：
1. 创建半透明黑色背景遮罩
2. 中间显示内容卡片（可以复用现有的 Story.vue 和 BossGallery.vue）
3. 有关闭按钮
4. 打开/关闭有淡入淡出动画

**需要向 AI 问的问题**：
```
我需要创建 Vue 3 模态框组件，要求：
1. 有黑色半透明背景（rgba(0,0,0,0.8)）
2. 中间显示内容卡片
3. 点击背景或关闭按钮时发送 @close 事件
4. 使用 Transition 组件添加淡入淡出动画
5. 支持插槽 <slot> 来放置内容
请给我代码
```

**需要准备的素材**：
- ✅ 关闭按钮图标 `close-button.png`
- ✅ 卡片背景纹理（可选）`card-texture.png`
- 📂 保存位置：`src/assets/images/ui/`

---

### 👤 成员 4 - 地图数据配置 【数据管理】

**工作内容**：配置地图上的所有位置点数据

**修改文件**：
- 📁 `src/data/mapLocations.js` （新建）

**任务描述**：
1. 创建一个 JavaScript 文件
2. 导出地图位置配置数组
3. 包含每个位置的坐标、类型、内容等信息

**需要向 AI 问的问题**：
```
我需要创建地图位置配置文件，包含以下位置：
1. 故事书（左上角）
2. 几个 Boss 位置（分散在地图）
3. 游戏入口（中央）

每个位置需要包含：
- id（唯一标识）
- x, y 坐标（百分比）
- 类型（modal 或 fullscreen）
- 图标路径
- 标题

请给我 JavaScript 对象数组的代码结构
```

**需要准备的素材**：
- 无需素材，纯代码工作

**示例数据结构**：
```javascript
export const mapLocations = [
  {
    id: 'story',
    x: 15,  // 距离左边 15%
    y: 20,  // 距离顶部 20%
    type: 'modal',
    icon: '/src/assets/images/markers/story-marker.png',
    title: '故事书',
    component: 'StoryModal'
  },
  // ... 其他位置
]
```

---

### 👤 成员 5 - 路由与集成 【技术对接】

**工作内容**：将地图系统接入现有项目

**修改文件**：
- 📁 `src/router/index.js` （修改）
- 📁 `src/views/MapView.vue` （协助成员1）

**任务描述**：
1. 添加地图页面到路由
2. 将地图设为首页（路径 `/`）
3. 在 MapView 中引入其他成员的组件
4. 处理点击事件逻辑

**需要向 AI 问的问题**：
```
我有以下 Vue Router 路由配置：
[现有的 router/index.js 代码]

我需要：
1. 添加新路由 /map，使用 MapView.vue 组件
2. 将 /map 设为默认首页
3. 保留原有的 /story、/boss、/game 路由
请给我修改后的完整代码
```

**需要准备的素材**：
- 无需素材

---

## 🌄 视差滚动任务（交给成员 1 & 2，优先级 P1.5）

### 🎨 子任务 A（成员 1）- 背景视差层

**修改文件**：
- 📁 `src/views/MapView.vue`
- 📁 `src/hooks/useMapParallax.js` （新建）

**要做什么**：
1. 给 MapView 加 2-3 层背景（远山、云层、地表），使用 `position:absolute;` 全屏铺满
2. 鼠标移动/滚动时，让背景层按不同速度偏移（远层慢，近层快）
3. 保证在移动端禁用鼠标视差（只保留轻微滚动视差）

**问 AI 的模板**：
```
我需要在 MapView.vue 做多层视差背景：
1) 使用 Vue 3 <script setup>
2) 新建 useMapParallax.js composable，暴露 style 对象数组给多层背景使用
3) 鼠标移动时 x/y 偏移；滚动时 y 方向轻微偏移
4) 移动端禁用鼠标监听
请给我 MapView.vue 和 useMapParallax.js 的示例代码
```

**需要的素材**：
- `map-bg-far.png`（远景山）
- `map-bg-mid.png`（中景云/树）
- `map-bg-near.png`（近景草地）
- 保存到：`src/assets/images/map-layers/`

### 🧩 子任务 B（成员 2）- 前景元素轻微视差

**修改文件**：
- 📁 `src/components/MapLocation.vue`

**要做什么**：
1. 在现有标记上增加一个很轻的视差偏移（根据鼠标或滚动）
2. 悬停放大的动画保留，不要和视差冲突
3. 给移动端加保护：在触摸设备上禁用视差

**问 AI 的模板**：
```
我需要在 MapLocation.vue 给标记增加轻微视差偏移：
1) props 里接收从父组件传入的 offsetX/offsetY
2) 在 style 上用 translate3d 应用偏移
3) 悬停放大动画保持
4) 移动端（touch 设备）关闭视差
请给我修改示例
```


## 📦 统一素材清单

所有成员共同准备的素材：

| 素材名称 | 尺寸要求 | 风格要求 | 保存位置 |
|---------|---------|---------|---------|
| 地图背景图 | 1920x1080 | 1930s手绘卡通 | `src/assets/images/map-background.jpg` |
| 视差背景-远山 | 1920x1080 | 低对比度、远景 | `src/assets/images/map-layers/map-bg-far.png` |
| 视差背景-中景 | 1920x1080 | 云/树/房子 | `src/assets/images/map-layers/map-bg-mid.png` |
| 视差背景-近景 | 1920x1080 | 草地/石头 | `src/assets/images/map-layers/map-bg-near.png` |
| 故事标记图标 | 128x128 PNG | 书本形状 | `src/assets/images/markers/story-marker.png` |
| Boss标记图标 | 128x128 PNG | 骷髅头 | `src/assets/images/markers/boss-marker.png` |
| 游戏标记图标 | 128x128 PNG | 骰子或手柄 | `src/assets/images/markers/game-marker.png` |
| 关闭按钮 | 64x64 PNG | X 符号 | `src/assets/images/ui/close-button.png` |

### 素材获取建议：

1. **AI 生成图片**：
   - 使用 Midjourney/Leonardo.ai
   - 提示词模板：`"1930s cartoon style, Cuphead game inspired, [描述], hand drawn, vintage sepia tone, no background"`

2. **免费素材网站**：
   - [OpenGameArt.org](https://opengameart.org/)
   - [Itch.io Assets](https://itch.io/game-assets/free)
   - [Freepik](https://www.freepik.com/) 搜索 "vintage cartoon"

3. **占位图先行**：
   - 可以先用 emoji 或文字占位
   - 等基本功能完成后再替换真实素材

---

## 🔄 协作流程

**每天**：
1. 每人在自己的分支开发：`git checkout -b feature/地图容器` 
2. 完成后推送到自己的分支
3. 在群里同步进度

**检查点**：
- 所有人展示半成品 demo
- 基础功能完成
成员5 集成所有组件
**周四-周五**：全员调试、修复 bug

---

## 📝 向 AI 提问的通用模板

每个成员在遇到问题时，按照这个格式问 AI：

```
【背景】
我正在开发 Cuphead 风格的 Vue 3 项目，负责 [你的任务名称]。

【现状】
目前已经完成了 [已完成的部分]。
项目使用 Vue 3 Composition API + Vite。

【问题】
我需要 [具体需求]，但遇到了 [具体问题]。

【要求】
1. 使用 Vue 3 <script setup> 语法
2. 样式要符合 1930s 复古卡通风格
3. 需要有注释说明关键代码

请给我完整的代码实现。
```
---

## ✅ 验收标准

所有任务完成时应该达到：

- [ ] 地图页面可以正常显示
- [ ] 至少有 3 个可点击的位置标记
- [ ] 点击标记能弹出对应内容
- [ ] 有进入/退出动画
- [ ] 在 Chrome 浏览器正常运行
- [ ] 代码有基本注释

---

## 🎯 优先级
如果时间不够，按照以下优先级：

**P0 必须完成**：
- 成员 1：地图容器
- 成员 2：位置标记
- 成员 5：路由集成

**P1 重要**：
- 成员 3：模态框
- 成员 4：数据配置

**P2 可选**：
- 动画效果优化
- 移动端适配

