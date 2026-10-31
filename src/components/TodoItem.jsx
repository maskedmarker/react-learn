// 展示层组件：只负责渲染，通过 props 接收数据，用回调把操作「交回」父组件
export default function TodoItem({ todo, onToggle, onRemove }) {
  console.log("TodoItem component rendered");

  return (
    <li className="todo-item">
      <label className={todo.done ? 'todo-text done' : 'todo-text'}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        {todo.text}
      </label>
      <button className="remove-btn" onClick={() => onRemove(todo.id)}>
        删除
      </button>
    </li>
  )
}
