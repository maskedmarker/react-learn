# useEffect 执行时机与清理函数

`useEffect` 用于在组件渲染后执行「副作用」：定时器、请求数据、订阅事件、操作 DOM 等。理解它的关键，是分清**几个不同的执行时机**，别把它们混在一起。

## 四个「执行」分别是谁

以时钟组件 `src/components/Clock.jsx` 为例，里面有四段代码，各自按不同的节奏运行：

```jsx
export default function Clock() {
  console.log('Clock component rendered')          // ① 函数体

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {                                 // ③ effect 回调
    const timer = setInterval(() => setNow(new Date()), 1000) // ② 定时器回调
    return () => {                                  // ④ 清理函数
      console.log('clearing timer: ', timer)
      clearInterval(timer)
    }
  }, [])

  return <div>{now.toLocaleTimeString()}</div>
}
```

| 代码 | 什么时候执行 |
| --- | --- |
| ① `Clock()` 函数体 | **每次渲染**都执行 |
| ② `setInterval` 的回调 | **每 1000ms** 一次（普通 JS 定时器，与 React 无关） |
| ③ `useEffect` 的回调 | **首次渲染后一次**（依赖数组为 `[]` 时） |
| ④ 清理函数（effect 的**返回值**） | **组件卸载时一次** |

## 依赖数组决定 effect 何时重跑

`useEffect` 的第二个参数是依赖数组，它决定 ③ 在什么时候执行：

```js
useEffect(() => { ... })            // 没有数组：每次渲染后都执行
useEffect(() => { ... }, [])        // 空数组：只在首次渲染后执行一次
useEffect(() => { ... }, [count])   // 只在 count 变化时执行
```

## 每秒发生的链路

```
setInterval 回调（每秒）
  → setNow(new Date())   ← 更新 state
  → React 重新渲染 Clock
  → Clock() 函数体重新执行（"Clock rendered" 每秒 +1）
```

**重渲染只重新执行函数体**，不会重新执行 `useEffect` 的回调（依赖 `[]` 表示「只在挂载时跑」），更不会执行清理函数。

## 清理函数为什么只在卸载时执行

清理函数是「组件卸载时」React 才调用的，用来做收尾（`clearInterval` 销毁定时器、`removeEventListener` 移除监听等）。停在时钟页面不动，组件**从没卸载过**，所以清理函数一直不跑；只有切到别的页面、组件被移除时才执行。

一句话：**每秒的 `setNow` 触发的是「重渲染」，不是「卸载」。清理函数只管卸载。**

## StrictMode 为什么让你看到一次清理

如果 [src/main.jsx](../src/main.jsx) 里用了 `<React.StrictMode>`，在**开发模式**下，StrictMode 会在首次挂载时故意做一次「挂载 → 卸载 → 再挂载」来帮你提前发现副作用漏洞：

```
挂载 → 跑 effect（建定时器）→ 立刻清理（打印 "clearing timer"）→ 再跑 effect（重建定时器）
```

所以在刚进入时钟页面时会看到**一次** `"clearing timer"`，之后就再也不出现了。这是开发环境特有的检查，生产环境不会这样。

## 完整心智模型

- **渲染**：每次 state / props 变化都会重跑函数体。
- **副作用（effect）**：渲染完成后才跑，频率由依赖数组决定。
- **清理（cleanup）**：组件卸载时（或 effect 因依赖变化即将重跑前）执行。

## 小实验

1. 停在时钟页面：`"Clock rendered"` 每秒 +1，`"clearing timer"` 一直是 0。
2. 切到别的页面（卸载）：`"clearing timer"` 打印一次。
3. 再切回来：又看到一次（StrictMode 的挂载检查）。

跑一遍就能把「渲染 / 副作用 / 清理」三个时机彻底分清。
