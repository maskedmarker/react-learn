// 子组件：通过 props（属性）接收父组件传入的数据
// props 是只读的 —— 永远不要修改传入的 props
function UserCard({ name, role = '学生', avatar }) {
  return (
    <div className="card user-card">
      <span className="avatar">{avatar}</span>
      <div>
        <h3>{name}</h3>
        <p className="muted">{role}</p>
      </div>
    </div>
  )
}

export default function Greeting() {
  return (
    <section>
      <h2>组件与 Props</h2>
      <p className="muted">
        Props 是父组件传给子组件的数据，像函数的参数。子组件用{' '}
        <code>{'{name}'}</code> 读取。上面的 <code>UserCard</code> 里，<code>role</code>{' '}
        用了默认值：没传时显示「学生」。
      </p>

      <div className="grid">
        <UserCard name="小明" role="前端工程师" avatar="🐱" />
        <UserCard name="小红" role="产品经理" avatar="🐰" />
        {/* 没传 role，使用默认值「学生」 */}
        <UserCard name="小刚" avatar="🐻" />
      </div>
    </section>
  )
}
