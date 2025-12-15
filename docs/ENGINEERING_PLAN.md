# 工程化改进方案

## 建议的项目结构

```
Cuphead-web-project/
│
├── docs/                          # 文档目录
│   ├── PROJECT_STRUCTURE.md       # 项目整体结构说明
│   ├── API.md                     # JavaScript 接口文档
│   ├── STYLES.md                  # 样式指南
│   └── DEVELOPMENT.md             # 开发指南
│
├── src/                           # 源代码目录
│   ├── html/                      # HTML 页面
│   │   ├── index.html
│   │   ├── story.html
│   │   ├── game.html
│   │   └── boss.html
│   │
│   ├── css/                       # 样式表
│   │   ├── main.css               # 全局样式 (style.css)
│   │   ├── variables.css          # CSS 变量定义 (可选)
│   │   └── responsive.css         # 响应式设计规则 (可选)
│   │
│   ├── js/                        # JavaScript 模块
│   │   ├── story.js               # story.html 交互逻辑
│   │   ├── boss.js                # boss.html 交互逻辑
│   │   ├── game.js                # game.html 交互逻辑
│   │   ├── utils.js               # 工具函数
│   │   └── config.js              # 配置文件 (Boss、Story 数据)
│   │
│   └── assets/                    # 资源文件
│       ├── images/
│       │   ├── boss/              # Boss 图片
│       │   │   ├── boss1_0.webp
│       │   │   ├── boss1_1.webp
│       │   │   └── ...
│       │   └── story/             # 故事截图
│       │       ├── scene_1.jpg
│       │       └── ...
│       └── fonts/                 # 自定义字体 (可选)
│
├── tests/                         # 测试目录
│   ├── unit/                      # 单元测试
│   └── integration/               # 集成测试
│
├── public/                        # 部署输出目录
│   └── (构建后的文件)
│
├── config/                        # 配置文件目录
│   └── webpack.config.js          # (如果使用打包工具)
│
├── .gitignore                     # Git 忽略规则
├── package.json                   # NPM 项目配置
├── README.md                      # 项目说明
├── LICENSE                        # 许可证
└── CONTRIBUTING.md                # 贡献指南
```

---

## 文件清单与职责

### HTML 文件 (src/html/)

| 文件 | 行数 | 职责 | 关键元素 |
|------|------|------|---------|
| index.html | 65 | 首页导航 | Header, Cards Container, Footer |
| story.html | 543 | 故事书UI | Storybook, Page Left/Right, Navigation |
| game.html | 234 | 游戏容器 | TV Set, Screen, Controls Panel |
| boss.html | 295 | Boss 列表 | Sidebar, Display, Phase Controls |

### CSS 文件 (src/css/)

| 文件 | 行数 | 职责 | 覆盖范围 |
|------|------|------|---------|
| main.css | 449 | 全局样式 | 所有页面通用 |
| variables.css | - | 变量定义 | CSS 变量集中管理 |
| responsive.css | - | 响应式 | 媒体查询规则 |

### JavaScript 文件 (src/js/)

| 文件 | 职责 | 函数 | 依赖数据 |
|------|------|------|----------|
| story.js | 故事页交互 | `loadPage()`, `nextPage()`, `prevPage()`, `finishTyping()` | `storyData[]` |
| boss.js | Boss页交互 | `selectBoss()`, `changePhase()`, `updateContent()` | `bossesData[]` |
| game.js | 游戏页交互 | `toggleFullscreen()`, `toggleMute()` | iframe API |
| config.js | 数据配置 | - | `bossesData`, `storyData` |
| utils.js | 工具函数 | `debounce()`, `throttle()`, `fadeIn()` | - |

### 数据文件 (src/js/data/)

```
config/
├── boss-data.json          # Boss 信息 (6 个 Boss)
└── story-data.json         # 故事信息 (5 个场景)
```

### 资源文件 (src/assets/)

```
images/
├── boss/
│   ├── boss1_0.webp        # Goopy Le Grande - 默认
│   ├── boss1_1.webp        # 第1阶段
│   ├── boss1_2.webp        # 第2阶段
│   ├── boss1_3.webp        # 第3阶段
│   ├── boss2_0.webp        # Ribby and Croaks - 默认
│   └── ... (共 24 张)
│
└── story/
    ├── scene_1.jpg         # Inkwell Isle
    ├── scene_2.jpg         # The Casino
    ├── scene_3.jpg         # A Winning Streak
    ├── scene_4.jpg         # Snake Eyes
    └── scene_5.jpg         # The Deal
```

---

## 模块化重构方案

### 1. JavaScript 模块化 (ES6 Modules)

#### 文件: `src/js/config.js`
```javascript
// Boss 数据导出
export const bossesData = [
  {
    id: 1,
    name: "Goopy Le Grande",
    defaultImg: "images/boss/boss1_0.webp",
    // ...
  },
  // ...
];

// 故事数据导出
export const storyData = [
  {
    title: "Inkwell Isle",
    text: "...",
    image: "images/story/scene_1.jpg",
    // ...
  },
  // ...
];
```

#### 文件: `src/js/utils.js`
```javascript
// 防抖函数
export function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// 淡入效果
export function fadeIn(element, duration = 300) {
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms`;
  requestAnimationFrame(() => {
    element.style.opacity = '1';
  });
}

// 图片加载 Promise
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}
```

#### 文件: `src/js/story.js`
```javascript
import { storyData } from './config.js';
import { fadeIn, loadImage } from './utils.js';

class StoryBook {
  constructor() {
    this.currentPage = 0;
    this.isTyping = false;
    this.init();
  }

  init() {
    this.bindElements();
    this.bindEvents();
    this.loadPage(0);
  }

  bindElements() {
    this.titleEl = document.getElementById('story-title');
    this.textEl = document.getElementById('text-container');
    this.imgEl = document.getElementById('story-image');
    this.nextBtn = document.getElementById('next-btn');
    this.prevBtn = document.getElementById('prev-btn');
  }

  bindEvents() {
    this.nextBtn.addEventListener('click', () => this.nextPage());
    this.prevBtn.addEventListener('click', () => this.prevPage());
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }

  async loadPage(index, instant = false) {
    const data = storyData[index];
    this.titleEl.textContent = data.title;
    
    // 加载图片
    try {
      await loadImage(data.image);
      this.imgEl.src = data.image;
    } catch (err) {
      this.imgEl.src = data.fallbackImage;
    }

    // 文字显示
    if (instant) {
      this.textEl.textContent = data.text;
    } else {
      this.typewriter(data.text);
    }

    this.updateButtons();
  }

  typewriter(text) {
    this.isTyping = true;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        this.textEl.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        this.isTyping = false;
      }
    }, 15);
  }

  nextPage() {
    if (this.isTyping) {
      this.textEl.textContent = storyData[this.currentPage].text;
      this.isTyping = false;
      return;
    }

    if (this.currentPage < storyData.length - 1) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    } else {
      this.startGame();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPage(this.currentPage, true);
    }
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentPage === 0;
    this.nextBtn.disabled = false;
    this.nextBtn.textContent = 
      this.currentPage === storyData.length - 1 
        ? 'Start Game!' 
        : 'Next ➜';
  }

  handleKeydown(e) {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
      this.nextPage();
    } else if (e.code === 'ArrowLeft') {
      this.prevPage();
    }
  }

  startGame() {
    alert('Ready? WALLOP!');
    // window.location.href = 'game.html';
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new StoryBook();
});
```

#### 文件: `src/js/boss.js`
```javascript
import { bossesData } from './config.js';
import { fadeIn } from './utils.js';

class BossGallery {
  constructor() {
    this.currentBoss = null;
    this.init();
  }

  init() {
    this.bindElements();
    this.renderBossList();
    this.selectBoss(bossesData[0], 0);
  }

  bindElements() {
    this.listContainer = document.getElementById('bossListContainer');
    this.titleEl = document.getElementById('displayTitle');
    this.imageEl = document.getElementById('displayImage');
    this.textEl = document.getElementById('displayText');
    this.phaseButtons = document.querySelectorAll('.phase-btn');
  }

  renderBossList() {
    this.listContainer.innerHTML = '';
    bossesData.forEach((boss, index) => {
      const li = document.createElement('li');
      li.className = 'boss-item';
      li.textContent = boss.name;
      li.addEventListener('click', () => this.selectBoss(boss, index));
      this.listContainer.appendChild(li);
    });
  }

  selectBoss(boss, index) {
    this.currentBoss = boss;
    
    // 更新列表高亮
    document.querySelectorAll('.boss-item').forEach(item => 
      item.classList.remove('active')
    );
    document.querySelectorAll('.boss-item')[index]?.classList.add('active');

    // 更新内容
    this.titleEl.textContent = boss.name;
    this.updateContent(boss.defaultImg, boss.defaultDesc);
    this.resetPhaseButtons();
  }

  changePhase(phaseNum) {
    if (!this.currentBoss) return;
    
    const phase = this.currentBoss.phases[phaseNum];
    if (phase) {
      this.updateContent(phase.img, phase.desc);
      
      // 更新按钮
      this.phaseButtons.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === phaseNum - 1);
      });
    }
  }

  updateContent(imgSrc, text) {
    this.imageEl.style.opacity = '0';
    setTimeout(() => {
      this.imageEl.src = imgSrc;
      this.imageEl.style.display = 'block';
      this.textEl.textContent = text;
      this.imageEl.style.opacity = '1';
    }, 100);
  }

  resetPhaseButtons() {
    this.phaseButtons.forEach(btn => btn.classList.remove('active'));
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new BossGallery();
});
```

---

## CSS 工程化方案

### 文件: `src/css/variables.css`
```css
:root {
  /* 色彩系统 */
  --color-bg: #e3d0a6;
  --color-accent-red: #d9382e;
  --color-ink-black: #1a1a1a;
  --color-felt-green: #2e4d34;
  --color-paper: #f8f1d7;
  --color-border: #5d4037;

  /* 排版 */
  --font-header: 'Rye', serif;
  --font-body: 'Gloria Hallelujah', cursive;
  --font-size-base: 1rem;
  --font-size-lg: 1.5rem;
  --font-size-xl: 2rem;

  /* 间距 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* 阴影 */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.2);
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.3);

  /* 过渡 */
  --transition-fast: 200ms;
  --transition-normal: 300ms;
  --transition-slow: 500ms;

  /* Z-Index 层级 */
  --z-grain: 9999;
  --z-vignette: 9998;
  --z-modal: 100;
  --z-content: 10;
  --z-background: 0;
}
```

### 文件: `src/css/responsive.css`
```css
/* 平板 - 768px 及以下 */
@media (max-width: 768px) {
  :root {
    --font-size-base: 0.9rem;
    --font-size-lg: 1.2rem;
    --spacing-lg: 1.5rem;
  }

  /* 首页调整 */
  .cards-container {
    gap: var(--spacing-md);
  }

  .playing-card {
    width: 160px;
    height: 240px;
  }

  /* Boss 页面调整 */
  .boss-container {
    flex-direction: column;
  }

  .boss-sidebar {
    max-height: 200px;
  }

  /* 游戏页面调整 */
  .tv-set {
    flex-direction: column;
    padding: var(--spacing-md);
  }

  /* 故事页面调整 */
  .storybook {
    flex-direction: column;
    width: 95%;
  }

  .spine {
    display: none;
  }
}
```

---

## 构建与部署

### package.json 配置示例
```json
{
  "name": "cuphead-web-project",
  "version": "1.0.0",
  "description": "An interactive Cuphead tribute website",
  "main": "index.html",
  "scripts": {
    "dev": "live-server",
    "build": "webpack --mode production",
    "lint": "eslint src/js",
    "test": "jest"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "live-server": "^1.2.0"
  }
}
```

### 开发流程
```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
# 访问: http://localhost:8080

# 3. 构建发布版本
npm run build

# 4. 代码检查
npm run lint

# 5. 运行测试
npm run test
```

---

## 文档规范

### API 文档 (docs/API.md)
```markdown
## StoryBook Class

### 构造函数
```javascript
new StoryBook()
```

### 方法

#### loadPage(index, instant)
- `index` (Number): 页面索引
- `instant` (Boolean): 是否直接显示 (默认false)
- 返回: void

#### nextPage()
翻下一页或开始游戏

#### prevPage()
翻上一页

### 事件
- `storybook:page-loaded` - 页面加载完成
- `storybook:game-started` - 开始游戏
```

### 代码风格指南 (CONTRIBUTING.md)
```markdown
## 代码规范

### JavaScript
- 使用 ES6+ 语法
- 使用模块化导入/导出
- 必须有 JSDoc 注释
- 不允许 `var`, 只用 `let`/`const`

### CSS
- 优先使用 CSS 变量
- BEM 命名法
- 避免硬编码值

### HTML
- 使用语义化标签
- 添加 ARIA 标签
- 图片必须有 alt 属性
```

---

## 总结

通过此工程化改进方案，项目将获得：

✅ **清晰的目录结构** - 易于导航和维护  
✅ **模块化代码** - 提高可复用性和可测试性  
✅ **集中式数据管理** - 便于更新和扩展  
✅ **完整的文档** - 降低学习成本  
✅ **自动化工具** - 提高开发效率  
✅ **可扩展性** - 便于添加新功能  

---

**建议优先级**：
1. 🔴 **必做**: 模块化 JavaScript (src/js/)
2. 🟡 **重要**: 提取配置文件 (config/)
3. 🟢 **可选**: 构建工具集成 (webpack)
4. 🟢 **可选**: 单元测试框架 (jest)

