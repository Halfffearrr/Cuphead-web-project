/**
 * Boss Gallery - Interactive Boss Showcase
 * Handles boss selection, phase switching, and content updates
 */

// --- Boss 数据配置 ---
const bossesData = [
    {
        id: 1,
        name: "Goopy Le Grande",
        defaultImg: "../assets/images/boss/Boss1_0.webp",
        defaultDesc: `古比在战斗中表现得极度自恋与自负，总是赞美自己有多么英俊，甚至即便被打成墓碑，在死亡画面中的引语也是如此。不过，他似乎也尊重他的对手，因为他会在开战之前对茶杯头与马克杯人行以摘帽之礼。`,
        phases: {
            1: { 
                img: "../assets/images/boss/Boss1_1.webp", 
                desc: `阶段 1：古比是一只有着红色鼻子的蓝色史莱姆。他会使用"黏糊跳跃"意图压扁玩家，偶尔会使用"蓝色拳击"，伸长脖子猛地向前打出拳头。` 
            },
            2: { 
                img: "../assets/images/boss/Boss1_2.webp", 
                desc: `阶段 2：嗑糖的古比长到了两倍大，长出了棕色的眉毛，戴着红色拳击手套。技能升级为"意蓝之外"的巨大跳跃，以及"滑溜猛击"——变化出一条戴着红色拳套的手臂向前重拳攻击。` 
            },
            3: { 
                img: "../assets/images/boss/Boss1_3.webp", 
                desc: `阶段 3：最终形态，他变成了一个带有十字架的灰色墓碑。他会使用"墓碑之危"左右移动并砸击玩家，玩家必须攻击墓碑上古比的脸方能造成伤害。` 
            }
        }
    },
    {
        id: 2,
        name: "Ribby and Croaks",
        defaultImg: "../assets/images/boss/Boss2_0.webp",
        defaultDesc: `二人组似乎都是树蛙。呱呱为棕色，穿着栗色腰带；利比是个矮一些的绿色树蛙，穿着红色拳套与白色裤子。`,
        phases: {
            1: { 
                img: "../assets/images/boss/Boss2_1.webp", 
                desc: `阶段 1：两只树蛙轮流攻击。呱呱会吐出萤火虫进行自杀式撞击，利比则会打出有规律的能量波型拳头。` 
            },
            2: { 
                img: "../assets/images/boss/Boss2_2.webp", 
                desc: `阶段 2：利比在左，呱呱在右包围玩家。利比拍出弹跳球，呱呱则变身风扇试图将玩家吹向利比。` 
            },
            3: { 
                img: "../assets/images/boss/Boss2_3.webp", 
                desc: `阶段 3：二者合体变成一台巨大的老虎机。玩家需要格挡粉色的拉杆，根据老虎机刷出的图案（牛、蛇或老虎）来躲避不同的攻击。` 
            }
        }
    },
    {
        id: 3,
        name: "Wally Warbles",
        defaultImg: "../assets/images/boss/Boss3_0.webp",
        defaultDesc: `瓦利扮演着秃鹰家族强者的角色，是个很想保护儿子的父亲。无论发生什么，瓦利都有足够的决心战斗到底。`,
        phases: {
            1: { 
                img: "../assets/images/boss/Boss3_1.webp", 
                desc: `阶段 1：瓦利把自己伪装成布谷鸟钟。他会吐出向多方向分裂的鸟蛋，或者将头变成手发射三颗大子弹。` 
            },
            2: { 
                img: "../assets/images/boss/Boss3_2.webp", 
                desc: `阶段 2：瓦利开始在屏幕上漂浮并疯狂掉羽毛。五颗带刺的鸟蛋会围绕着他旋转，并周期性地扩展和收缩范围。` 
            },
            3: { 
                img: "../assets/images/boss/Boss3_3.webp", 
                desc: `阶段 3：受伤的瓦利躺在担架上被两只蓝鸟抬着。他会把头变成垃圾桶吐出垃圾，或者从口中射出心脏进行散弹攻击。` 
            }
        }
    },
    {
        id: 4,
        name: "Grim Matchstick",
        defaultImg: "../assets/images/boss/Boss4_0.webp",
        defaultDesc: `恐怖火龙是狡猾但傻乎乎的，就像那种巨大的、过于顽皮的狗。他努力吓唬人，但每次战斗开始时都会做出"可怕"的动作。`,
        phases: {
            1: { 
                img: "../assets/images/boss/Boss4_1.webp", 
                desc: `阶段 1：火龙从眼睛里射出光波（最后一道可格挡），并不时从嘴里吐出波浪形移动的大火球。` 
            },
            2: { 
                img: "../assets/images/boss/Boss4_2.webp", 
                desc: `阶段 2：火龙伸出舌头作为平台，一队火球会在舌头上游行。有些火球会突然蹲下并跳向玩家，极难躲避。` 
            },
            3: { 
                img: "../assets/images/boss/Boss4_3.webp", 
                desc: `阶段 3：火龙长出三个脑袋，发射簇状火球。火球被打破后会向四面八方分裂。中间的头还会变形成喷火器横扫屏幕。` 
            }
        }
    },
    {
        id: 5,
        name: "Rumor Honeybottoms",
        defaultImg: "../assets/images/boss/Boss5_0.webp",
        defaultDesc: `蜂后是一只非常巨大的女王蜂，穿着黑色和黄色条纹的钟形连衣裙，手里通常拿着蜂蜜棒。`,
        phases: {
            1: { 
                img: "../assets/images/boss/Boss5_1.webp", 
                desc: `阶段 1：蜂后派出警蜂，放置并在5秒后爆炸的蜜蜂炸弹。疲惫的工蜂也会拿着手提箱在屏幕中穿梭作为障碍。` 
            },
            2: { 
                img: "../assets/images/boss/Boss5_2.webp", 
                desc: `阶段 2：蜂后亲自上场，使用蜂蜜棒施展法术：发射尖锐的"魔三角"或者追踪玩家的"紫色魔光球"。` 
            },
            3: { 
                img: "../assets/images/boss/Boss5_3.webp", 
                desc: `阶段 3：蜂后变成飞机形态，在屏幕底部来回移动并使用锯齿般的机翼攻击，同时发射旋转的拳头导弹。` 
            }
        }
    },
    {
        id: 6,
        name: "Cala Maria",
        defaultImg: "../assets/images/boss/Boss6_0.webp",
        defaultDesc: `卡拉·玛丽亚是个身材高挑的美人鱼，头戴紫色死章鱼作为头发。但在战斗后期，她会转化为恐怖的美杜莎形态。`,
        phases: {
            1: { 
                img: "../assets/images/boss/Boss6_1.webp", 
                desc: `阶段 1：卡拉召唤海洋生物助战：喷水的海马、背着大炮的海龟、吐刺的河豚，甚至还会抓起大鱼作为武器。` 
            },
            2: { 
                img: "../assets/images/boss/Boss6_2.webp", 
                desc: `阶段 2：卡拉变成美杜莎，电鳗开始放电。最危险的是她的石化光线，会将玩家变成石头，必须快速按键挣脱。` 
            },
            3: { 
                img: "../assets/images/boss/Boss6_3.webp", 
                desc: `阶段 3：玩家进入满是尖刺和珊瑚的洞穴。只有卡拉的头在追击，她会继续使用石化光线，并吐出带骷髅的泡泡。` 
            }
        }
    }
];

// --- 状态变量 ---
let currentBoss = null;

// --- DOM 元素缓存 ---
let listContainer;
let displayTitle;
let displayImage;
let displayText;
let phaseButtons;

/**
 * 初始化 DOM 元素
 */
function initElements() {
    listContainer = document.getElementById('bossListContainer');
    displayTitle = document.getElementById('displayTitle');
    displayImage = document.getElementById('displayImage');
    displayText = document.getElementById('displayText');
    phaseButtons = document.querySelectorAll('.phase-btn');
}

/**
 * 初始化：生成 Boss 列表并选中第一个
 */
function initBossList() {
    bossesData.forEach((boss, index) => {
        const li = document.createElement('li');
        li.className = 'boss-item';
        li.textContent = boss.name;
        li.onclick = () => selectBoss(boss, li);
        listContainer.appendChild(li);

        // 默认选中第一个
        if (index === 0) {
            selectBoss(boss, li);
        }
    });
}

/**
 * 选中 Boss
 * @param {Object} bossData - Boss 数据对象
 * @param {HTMLElement} domElement - DOM 元素
 */
function selectBoss(bossData, domElement) {
    currentBoss = bossData;

    // 1. 更新侧边栏高亮状态
    document.querySelectorAll('.boss-item').forEach(item => item.classList.remove('active'));
    if (domElement) domElement.classList.add('active');

    // 2. 更新右侧内容为默认状态
    displayTitle.innerText = bossData.name;
    updateContent(bossData.defaultImg, bossData.defaultDesc);

    // 3. 重置阶段按钮状态
    resetPhaseButtons();
}

/**
 * 切换战斗阶段
 * @param {number} phaseNum - 阶段号 (1-3)
 */
function changePhase(phaseNum) {
    if (!currentBoss) return;

    // 获取对应阶段的数据
    const phaseData = currentBoss.phases[phaseNum];
    
    if (phaseData) {
        // 更新图片和文字
        updateContent(phaseData.img, phaseData.desc);

        // 更新按钮高亮样式
        resetPhaseButtons();
        const buttons = document.querySelectorAll('.phase-btn');
        if (buttons[phaseNum - 1]) {
            buttons[phaseNum - 1].classList.add('active');
        }
    } else {
        console.warn("No data for phase " + phaseNum);
    }
}

/**
 * 更新内容：图片和文字
 * @param {string} imgSrc - 图片路径
 * @param {string} text - 描述文字
 */
function updateContent(imgSrc, text) {
    // 淡出效果
    displayImage.style.opacity = 0;
    
    setTimeout(() => {
        displayImage.src = imgSrc;
        displayImage.style.display = 'block';
        displayText.innerText = text;
        // 淡入效果
        displayImage.style.opacity = 1;
    }, 100);
}

/**
 * 重置所有阶段按钮的 active 状态
 */
function resetPhaseButtons() {
    document.querySelectorAll('.phase-btn').forEach(btn => btn.classList.remove('active'));
}

/**
 * 初始化应用
 */
function init() {
    initElements();
    initBossList();
}

// 当 DOM 加载完成时初始化
document.addEventListener('DOMContentLoaded', init);
