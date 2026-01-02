# 🎮 Cuphead Web Project

> 1930s 复古卡通风格的 Cuphead 致敬网页项目 - Vue 3 版本

![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ 特性

- 🎨 **1930s 复古视觉风格** - 胶片颗粒、扫描线、暗角特效
- 🎮 **嵌入式 Unity WebGL 游戏** - 完整的可玩游戏体验
- 📖 **交互式故事书** - 打字机效果、翻页动画
- 💀 **Boss 画廊** - 多阶段战斗详情展示
- 🃏 **扑克牌导航** - 创意复古 UI 设计
- 📱 **响应式设计** - 适配桌面和移动端

---

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) 18.0+
- npm 或 yarn

### 安装运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 `http://localhost:3000`

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

---

## 📁 项目结构

```
Cuphead-web-project/
├── index.html              # Vue 单页应用入口
├── vite.config.js          # Vite 构建配置
├── package.json            # 依赖配置
│
├── config/                 # 📦 配置文件
│   ├── eslint.config.js    # ESLint 代码规范
│   ├── vitest.config.js    # Vitest 测试配置
│   └── .prettierrc         # Prettier 格式化配置
│
├── src/                    # 📂 源代码
│   ├── main.js             # Vue 入口
│   ├── App.vue             # 根组件
│   │
│   ├── router/             # 🔗 路由配置
│   │   └── index.js
│   │
│   ├── views/              # 📄 页面组件
│   │   ├── Home.vue        # 首页（卡片导航）
│   │   ├── Story.vue       # 故事页（交互式故事书）
│   │   ├── BossGallery.vue # Boss 画廊（阶段展示）
│   │   └── GameContainer.vue # 游戏页（Unity 嵌入）
│   │
│   ├── components/         # 🧩 公共组件
│   │   ├── RetroOverlay.vue   # 复古特效层
│   │   ├── Navigation.vue     # 顶部导航
│   │   ├── BackButton.vue     # 返回按钮
│   │   ├── KnobButton.vue     # 复古旋钮按钮
│   │   ├── PhaseSelector.vue  # 阶段选择器
│   │   ├── PlayingCard.vue    # 扑克牌卡片
│   │   └── LoadingSpinner.vue # 加载动画
│   │
│   ├── hooks/              # 🪝 逻辑复用 (Composables)
│   │   ├── useBossGallery.js  # Boss 管理逻辑
│   │   ├── useStory.js        # 故事 + 打字机逻辑
│   │   ├── useGameBridge.js   # Unity 通信桥接
│   │   └── useAnimations.js   # 滚动/视差动画
│   │
│   ├── utils/              # 🔧 工具函数
│   │   ├── retroEffects.js    # 复古特效工具
│   │   ├── audioManager.js    # 音频管理
│   │   └── constants.js       # 全局常量
│   │
│   └── assets/             # 🎨 静态资源
│       ├── images/         # 图片素材
│       └── styles/         # 全局样式
│           ├── variables.css  # CSS 变量
│           ├── global.css     # 基础重置
│           ├── effects.css    # 特效样式
│           └── animations.css # 动画库
│
├── tests/                  # 🧪 测试文件
│   ├── unit/               # 单元测试
│   └── integration/        # 集成测试
│
└── game/                   # 🎮 Unity WebGL 游戏
    ├── index.html          # Unity 入口
    ├── Build/              # 游戏构建文件
    └── TemplateData/       # 模板资源
```

---

## 🛠️ 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 (localhost:3000) |
| `npm run build` | 构建生产版本到 dist/ |
| `npm run preview` | 预览构建结果 |
| `npm run test` | 运行 Vitest 测试 |
| `npm run lint` | ESLint 代码检查 |
| `npm run format` | Prettier 代码格式化 |

---

## 🔗 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 首页，扑克牌导航 |
| `/story` | Story | 交互式故事书 |
| `/boss` | BossGallery | Boss 画廊，多阶段展示 |
| `/game` | GameContainer | Unity 游戏容器 |

---

## 🎨 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Vue 3 (Composition API) |
| **路由** | Vue Router 4 |
| **构建** | Vite 5 |
| **测试** | Vitest |
| **代码规范** | ESLint + Prettier |
| **游戏引擎** | Unity WebGL |
| **字体** | Google Fonts (Rye, Gloria Hallelujah, Press Start 2P) |

---

## ⚠️ 注意事项

1. **Unity 游戏加载**  
   由于浏览器安全限制，Unity WebGL 需要通过 HTTP 服务器访问，不能直接用 `file://` 协议打开。

2. **大文件警告**  
   `game/Build/` 包含 Unity 编译的二进制文件（.wasm, .data），文件较大，首次加载需要时间。

3. **浏览器兼容**  
   推荐使用 Chrome、Firefox、Edge 最新版本。Safari 对 WebGL 支持可能有限。

---

## 📄 License

本项目仅供学习交流，禁止商用。

---

**小组前端作业**
