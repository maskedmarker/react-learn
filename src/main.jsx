import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 应用入口：把 <App /> 组件挂载到 index.html 里的 #root 节点上
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode 会在开发模式下多做一次渲染检查，帮助发现潜在问题（不影响生产环境）
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
