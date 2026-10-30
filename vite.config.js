import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 配置文件：启用 React 插件（负责 JSX 转换和热更新）
export default defineConfig({
  plugins: [react()],
})
