import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 项目根目录
  root: 'src/html',
  
  // 公共资源目录
  publicDir: resolve(__dirname, 'public'),
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true, // 自动打开浏览器
    cors: true,
  },
  
  // 构建配置
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/html/index.html'),
        game: resolve(__dirname, 'src/html/game.html'),
        story: resolve(__dirname, 'src/html/story.html'),
        boss: resolve(__dirname, 'src/html/boss.html'),
      },
    },
  },
  
  // 路径解析
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@css': resolve(__dirname, 'src/css'),
      '@js': resolve(__dirname, 'src/js'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
});
