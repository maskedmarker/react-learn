import { useState } from 'react'
import TodoItem from './TodoItem.jsx'

// 简易自增 id（仅演示用，真实项目常用 uuid）
let nextId = 1

export default function TodoApp() {
  console.log("TodoApp component rendered");


  // todos 是数组，每一项 { id, text, done }
  // 用函数式初始化，避免每次渲染都重新执行 nextId++
  const [todos, setTodos] = useState(() => [
    { id: nextId++, text: '学习 JSX 语法', done: true },
    { id: nextId++, text: '理解 state 和 props', done: false },
  ])

  // 输入框内容：由 state 控制（受控组件）
  const [text, setText] = useState('')

  function addTodo() {
    const trimmed = text.trim()
    if (!trimmed) return
    // 不要直接修改原数组，用展开运算符创建新数组（保持状态不可变）
    setTodos([...todos, { id: nextId++, text: trimmed, done: false }])
    setText('')
  }

  function toggle(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const doneCount = todos.filter((t) => t.done).length

  return (
    <section>
      <h2>列表、表单与条件渲染</h2>
      <p className="muted">
        用 <code>map</code> 渲染列表，每个列表项都要有唯一的 <code>key</code>；输入框由
        state 控制（受控组件）。
      </p>

      <div className="card">
        <div className="todo-input">
          {/* 受控组件：value 来自 state，onChange 更新 state */}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="输入待办事项，回车添加"
          />
          <button onClick={addTodo}>添加</button>
        </div>

        {/* 条件渲染：列表为空时显示提示 */}
        {todos.length === 0 ? (
          <p className="muted">还没有待办事项，先添加一条吧 👆</p>
        ) : (
          <ul className="todo-list">
            {/* 用 map 把数据渲染成组件列表，key 用稳定唯一的 id */}
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggle}
                onRemove={remove}
              />
            ))}
          </ul>
        )}

        {/* 条件渲染 + 文本插值 */}
        <p className="muted">
          已完成 {doneCount} / {todos.length}
          {doneCount === todos.length && todos.length > 0 && '（全部完成 🎉）'}
        </p>
      </div>
    </section>
  )
}
