import { useEffect, useState } from 'react'

export default function Clock() {
  console.log("Clock component rendered");


  const [now, setNow] = useState(() => new Date())

  // useEffect：组件渲染后执行副作用（定时器、请求数据、订阅等）
  useEffect(() => {
    // 副作用：每秒更新一次时间
    const timer = setInterval(() => setNow(new Date()), 1000)
    // 返回清理函数：组件卸载时会调用，避免内存泄漏
    return () => {
      console.log("Clock组件卸载时,执行清理回调函数");
      clearInterval(timer);
    }
  }, []) // 空数组 = 只在首次渲染后执行一次

  useEffect(() => {
    return () => {
      console.log("now变化时,执行清理回调函数");
    }
  }, [now])

  const time = now.toLocaleTimeString()
  const date = now.toLocaleDateString()

  return (
    <section>
      <h2>useEffect 副作用</h2>
      <p className="muted">
        时钟用 <code>setInterval</code> 每秒更新 state。定时器在 <code>useEffect</code>{' '}
        里创建，并在组件卸载时通过返回的清理函数销毁。试着切换到其它页面再切回来，观察控制台。
      </p>

      <div className="card clock-card">
        <div className="clock-time">{time}</div>
        <div className="muted">{date}</div>
      </div>
    </section>
  )
}
