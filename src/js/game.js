/**
 * Game Page - TV Console Functionality
 * Handles fullscreen and mute controls for the embedded game
 */

/**
 * 启用/禁用全屏模式
 * 将游戏屏幕切换到全屏视图
 */
function toggleFullscreen() {
    const screen = document.getElementById('screen-area');
    
    if (!document.fullscreenElement) {
        screen.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * 切换游戏音频静音状态
 * 通过 postMessage 与嵌入的 iframe 游戏进行通信
 * 同时提供可视反馈（按钮旋转动画）
 */
function toggleMute(event) {
    const iframe = document.getElementById('game-frame');
    
    // 获取按钮元素（触发事件的元素）
    const btn = event.currentTarget || event.target;
    
    // 添加视觉反馈：旋转按钮
    btn.style.transform = 'rotate(45deg)';
    setTimeout(() => {
        btn.style.transform = 'rotate(0deg)';
    }, 200);

    // 通过 postMessage 向游戏 iframe 发送消息
    // 游戏端需要监听 'message' 事件并处理 'TOGGLE_MUTE' 类型
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'TOGGLE_MUTE' }, '*');
    }
    
    console.log("Mute signal sent to game iframe.");
}

/**
 * 页面加载时的初始化
 */
function init() {
    // 可选：在这里设置事件监听器或初始化其他功能
    console.log("Game page initialized.");
    
    // 例如：监听全屏变化
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            console.log("Exited fullscreen mode");
        }
    });
}

// 在 DOM 加载完成时初始化
document.addEventListener('DOMContentLoaded', init);
