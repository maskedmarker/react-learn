import { useState } from 'react'
import Greeting from './components/Greeting.jsx'
import Counter from './components/Counter.jsx'
import TodoApp from './components/TodoApp.jsx'
import Clock from './components/Clock.jsx'
import './App.css'

// 知识点列表：每个对象对应一个「页面」，label 是导航文字，Component 是要渲染的组件
const LESSONS = [
  { id: 'greeting', label: '组件与 Props', Component: Greeting },
  { id: 'counter', label: 'useState 与事件', Component: Counter },
  { id: 'todo', label: '列表与表单', Component: TodoApp },
  { id: 'clock', label: 'useEffect', Component: Clock },
]

export default function App() {
  // 当前组件如果有状态变化，整个组件会重新渲染，函数体会被重新执行
  console.log("App component rendered");

  // activeId 记录当前选中的知识点，默认显示第一个
  const [activeId, setActiveId] = useState(LESSONS[0].id)
  console.log('activeId : ', activeId);

  // 根据 activeId 找到对应的页面组件
  const activeLesson = LESSONS.find((l) => l.id === activeId)
  const ActiveComponent = activeLesson.Component

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ React 学习 Demo</h1>
        <p>覆盖 React 核心概念的示例项目，配合代码里的中文注释一起学习。</p>
      </header>

      {/* 用 map 渲染导航按钮，key 保证列表项稳定 */}
      <nav className="app-nav">
        {LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            className={lesson.id === activeId ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveId(lesson.id)}
          >
            {lesson.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {/* 条件渲染：根据 activeId 决定渲染哪个组件 */}
        <ActiveComponent />
      </main>
    </div>
  )
}
