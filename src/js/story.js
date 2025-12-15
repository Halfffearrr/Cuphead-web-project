/**
 * Story Page - Interactive Storybook Logic
 * Handles page navigation, typewriter effect, and image loading
 */

// --- 故事数据配置 ---
const storyData = [
    {
        // 场景 1：小屋
        title: "Inkwell Isle",
        text: "Once upon a time, in a magical place called Inkwell Isle, there were two brothers named Cuphead and Mugman. They lived without a care under the watchful eye of the wise Elder Kettle.",
        image: "../assets/images/story/Screenshot 2025-12-02 132404.jpg",
        fallbackImage: "https://placehold.co/600x400/f4e4bc/5d4037?text=Error:+File+'132404.jpg'+Not+Found",
        caption: "Elder Kettle's Cottage"
    },
    {
        // 场景 2：赌场外观
        title: "The Casino",
        text: "One day they wandered far from home and ended up on the wrong side of the tracks and entered the Devil's Casino.",
        image: "../assets/images/story/Screenshot 2025-12-02 132436.jpg",
        fallbackImage: "https://placehold.co/600x400/4a3b32/fff?text=Error:+File+'132436.jpg'+Not+Found",
        caption: "The Wrong Side of the Tracks"
    },
    {
        // 场景 3：赌桌连胜
        title: "A Winning Streak",
        text: "\"Hot Dawg!\" exclaimed King Dice. \"These fellas can't lose!\" Even the Devil himself came down to watch the show.",
        image: "../assets/images/story/Screenshot 2025-12-02 132448.jpg",
        fallbackImage: "https://placehold.co/600x400/221111/f4e4bc?text=Error:+File+'132448.jpg'+Not+Found%0ACheck+filename!",
        caption: "The Table is Hot!"
    },
    {
        // 场景 4：恶魔登场/蛇眼
        title: "Snake Eyes",
        text: "\"Win one more roll, and the loot is yours!\" the Devil boomed. \"But lose, and I take your souls!\" Cuphead rolled the dice... SNAKE EYES!",
        image: "../assets/images/story/Screenshot 2025-12-02 132504.jpg",
        fallbackImage: "https://placehold.co/600x400/000000/d32f2f?text=Error:+File+'132504.jpg'+Not+Found",
        caption: "The Fatal Roll"
    },
    {
        // 场景 5：求饶/契约
        title: "The Deal",
        text: "The brothers begged for their lives. \"There must be another way!\" The Devil grinned. \"Collect the contracts of my runaway debtors by midnight, and I might let you keep your heads!\"",
        image: "../assets/images/story/Screenshot 2025-12-02 132539.jpg",
        fallbackImage: "https://placehold.co/600x400/5d4037/fff?text=Error:+File+'132539.jpg'+Not+Found",
        caption: "A Deal with the Devil"
    }
];

// --- 状态变量 ---
let currentPage = 0;
let charIndex = 0;
let typingInterval;
let isTyping = false;

// --- DOM 元素缓存 ---
let titleEl;
let textEl;
let imgFrameEl;
let imgEl;
let captionEl;
let nextBtn;
let prevBtn;

/**
 * 初始化 DOM 元素引用
 */
function initElements() {
    titleEl = document.getElementById('story-title');
    textEl = document.getElementById('text-container');
    imgFrameEl = document.getElementById('image-frame');
    imgEl = document.getElementById('story-image');
    captionEl = document.getElementById('image-caption');
    nextBtn = document.getElementById('next-btn');
    prevBtn = document.getElementById('prev-btn');
}

/**
 * 加载页面内容
 * @param {number} index - 页面索引
 * @param {boolean} isInstant - 是否直接显示（跳过打字机效果）
 */
function loadPage(index, isInstant = false) {
    const data = storyData[index];
    currentPage = index;

    titleEl.textContent = data.title;
    
    // 清除可能正在进行的打字机效果
    clearInterval(typingInterval);

    // --- 按钮状态设置 ---
    nextBtn.disabled = false;
    if (index < storyData.length - 1) {
        nextBtn.innerHTML = "Next &#10142;";
    } else {
        nextBtn.innerHTML = "Start Game!";
    }

    if (index === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    // --- 图片加载处理 ---
    imgFrameEl.classList.remove("fade-in");
    imgFrameEl.style.opacity = 0;
    setTimeout(() => {
        imgEl.src = data.image;
        imgEl.onerror = function () {
            console.warn(`Cannot find image: ${data.image}. Showing fallback.`);
            this.src = data.fallbackImage;
            this.onerror = null;
        };
        captionEl.textContent = data.caption;
        setTimeout(() => {
            imgFrameEl.classList.add("fade-in");
        }, 500);
    }, 200);

    // --- 文字显示：选择打字机或直接显示 ---
    if (isInstant) {
        // 直接显示全部文字（回顾模式）
        textEl.textContent = data.text;
        textEl.classList.remove("typewriter-cursor");
        isTyping = false;
    } else {
        // 执行打字机动画（阅读模式）
        typewriterEffect(data.text);
    }
}

/**
 * 打字机效果实现
 * @param {string} text - 要显示的文本
 */
function typewriterEffect(text) {
    textEl.textContent = "";
    textEl.classList.add("typewriter-cursor");
    charIndex = 0;
    isTyping = true;

    typingInterval = setInterval(() => {
        if (charIndex < text.length) {
            textEl.textContent += text.charAt(charIndex);
            charIndex++;
        } else {
            finishTyping();
        }
    }, 15);
}

/**
 * 结束打字机效果
 */
function finishTyping() {
    clearInterval(typingInterval);
    textEl.textContent = storyData[currentPage].text;
    textEl.classList.remove("typewriter-cursor");
    isTyping = false;

    // 更新按钮状态
    nextBtn.disabled = false;
    if (currentPage < storyData.length - 1) {
        nextBtn.innerHTML = "Next &#10142;";
    } else {
        nextBtn.innerHTML = "Start Game!";
    }
}

/**
 * 下一页处理
 */
function nextPage() {
    // 如果正在打字，点击 Next 直接显示全部文字
    if (isTyping) {
        finishTyping();
        return;
    }

    // 翻页或开始游戏
    if (currentPage < storyData.length - 1) {
        currentPage++;
        loadPage(currentPage);
    } else {
        // 最后一页：开始游戏
        alert("Ready? WALLOP!");
        // window.location.href = 'game.html';  // 如需跳转到游戏页面，取消注释
    }
}

/**
 * 上一页处理
 */
function prevPage() {
    // 如果正在打字，先停止
    if (isTyping) {
        clearInterval(typingInterval);
        isTyping = false;
    }

    if (currentPage > 0) {
        currentPage--;
        // 传入 true 表示直接显示文字
        loadPage(currentPage, true);
    }
}

/**
 * 键盘事件处理
 */
function handleKeydown(e) {
    if (e.code === "Space" || e.code === "ArrowRight") {
        nextPage();
    } else if (e.code === "ArrowLeft") {
        prevPage();
    }
}

/**
 * 初始化应用
 */
function init() {
    initElements();
    loadPage(0);
    document.addEventListener('keydown', handleKeydown);
}

// 当 DOM 加载完成时初始化
document.addEventListener('DOMContentLoaded', init);
