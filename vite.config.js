import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // 使用 Vue 插件
  plugins: [vue()],
  
  // 项目根目录 - Vue 单页应用
  root: '.',
  
  // 公共资源目录
  publicDir: resolve(__dirname, 'public'),
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  
  // 路径解析
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@views': resolve(__dirname, 'src/views'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
});
