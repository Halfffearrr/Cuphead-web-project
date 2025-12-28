# Cuphead Web Project

### 环境要求

- [Node.js](https://nodejs.org/) 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**

```bash
git clone https://github.com/your-username/Cuphead-web-project.git
cd Cuphead-web-project
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器（可选）**

```bash
npm run dev
```

4. **在浏览器中访问**

- 直接双击打开 `src/html/index.html` 即可浏览（首页、故事、Boss 页面）

### 构建生产版本

```bash
npm run build
```
构建产物将输出到 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
Cuphead-web-project/
├── src/
│   ├── html/           # HTML 页面
│   │   ├── index.html  # 首页（扑克牌导航）
│   │   ├── game.html   # 游戏页（电视机界面）
│   │   ├── story.html  # 故事页
│   │   └── boss.html   # Boss 画廊页
│   ├── css/            # 样式文件
│   │   ├── main.css    # 全局样式
│   │   ├── game.css    # 游戏页样式
│   │   ├── story.css   # 故事页样式
│   │   └── boss.css    # Boss 页样式
│   ├── js/             # JavaScript 脚本
│   │   ├── game.js     # 游戏控制逻辑
│   │   ├── story.js    # 故事交互逻辑
│   │   └── boss.js     # Boss 画廊逻辑
│   └── assets/         # 静态资源
│       └── images/     # 图片资源
├── webwebweb/          # Unity WebGL 游戏构建
│   ├── index.html      # Unity 入口
│   └── Build/          # Unity 构建文件
├── tests/              # 测试文件
│   ├── unit/           # 单元测试
│   └── integration/    # 集成测试
├── package.json        # 项目配置
├── vite.config.js      # Vite 构建配置
└── vitest.config.js    # 测试配置
```

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 (http://localhost:3000) |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npm run test` | 运行测试 |
| `npm run lint` | ESLint 代码检查 |
| `npm run format` | Prettier 代码格式化 |

## 技术栈

- **构建工具**: [Vite](https://vitejs.dev/) 5.4
- **测试框架**: [Vitest](https://vitest.dev/) 2.1
- **代码规范**: ESLint + Prettier
- **游戏引擎**: Unity WebGL
- **字体**: Google Fonts (Rye, Gloria Hallelujah)

## 注意事项

1. **Unity 游戏加载**: 由于浏览器安全限制，Unity WebGL 游戏需要通过 HTTP 服务器访问，不能直接通过 `file://` 协议打开。

2. **大文件**: `webwebweb/Build/` 目录包含 Unity 构建的二进制文件（.wasm, .data），文件较大，首次加载可能需要一些时间。

## License

本项目仅供学习交流，禁止商用和传播

---
**小组前端作业** | Made with 