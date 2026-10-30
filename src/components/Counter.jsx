import { useState } from 'react'

export default function Counter() {
  // useState(初始值) 返回一个数组：[当前状态值, 更新函数]
  // 调用更新函数会触发组件重新渲染，界面随之更新
  const [count, setCount] = useState(0)

  return (
    <section>
      <h2>useState 与事件处理</h2>
      <p className="muted">
        state 是组件「自己记住」的数据。点击按钮调用 <code>setCount</code>{' '}
        更新状态，React 会自动重新渲染。事件用驼峰命名（<code>onClick</code>），并传入一个函数。
      </p>

      <div className="card counter-card">
        <div className="counter-value">{count}</div>
        <div className="counter-actions">
          {/* 传一个箭头函数，而不是 setCount(count - 1) 的调用结果 */}
          <button onClick={() => setCount(count - 1)}>−1</button>
          <button onClick={() => setCount(0)}>重置</button>
          {/* 函数式更新：用回调拿到最新值，避免依赖旧 count */}
          <button onClick={() => setCount((c) => c + 1)}>+1</button>
        </div>
      </div>
    </section>
  )
}
