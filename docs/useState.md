# useState 入参与返回值

`useState` 是 React 最常用的 Hook，用于给函数组件添加「状态」。状态是组件自己记住、变化后能触发重新渲染的数据。

## 函数签名

```js
const [state, setState] = useState(initialValue)
//    ^入参             ^返回值（数组解构）
```

## 入参：`initialValue`（初始值）

`useState` 只接收**一个参数**，即状态的初始值。它可以是任意类型：

```js
const [count, setCount] = useState(0)            // 数字
const [name, setName] = useState('小明')         // 字符串
const [user, setUser] = useState(null)           // null
const [list, setList] = useState([])             // 数组
const [todo, setTodo] = useState({ done: false }) // 对象
```

> 初始值只在**第一次渲染**时被使用。之后每次渲染，React 都直接返回当前保存的状态值，不会再重新取初始值。

### 惰性初始化：入参也可以是一个函数

如果初始值的计算成本很高（比如要读取 localStorage、做复杂计算），可以传入一个**函数**：

```js
// ❌ 这样每次渲染都会重新执行 expensiveCalc()，只是结果被丢弃
const [data, setData] = useState(expensiveCalc())

// ✅ 传入函数，React 只在首次渲染时调用一次
const [data, setData] = useState(() => expensiveCalc())
```

区分的关键：**传入的是函数本身**（惰性初始化，只执行一次）还是**函数调用的结果**（每次渲染都执行）。

## 返回值：`[state, setState]`（两个元素的数组）

`useState` 返回一个**恰好两个元素的数组**：

| 下标 | 含义 | 说明 |
| --- | --- | --- |
| `0` | 当前状态值 | 第一次是初始值，之后是最近一次更新后的值 |
| `1` | 更新函数 `setState` | 调用它更新状态，并触发组件重新渲染 |

数组顺序固定：**值在前，setter 在后**。通常用数组解构来接收，名字可以自己起（`count`/`setCount`、`name`/`setName` 只是变量名，React 不关心叫什么）。

### setter 的两种用法

```js
// 1. 直接传新值
setCount(10)               // count 变成 10
setName('小红')            // name 变成 '小红'

// 2. 函数式更新：接收「上一次的值」，返回新值
setCount((prev) => prev + 1) // 基于旧值 +1，避免拿到过期的值
```

**什么时候用函数式更新？** 当新值依赖旧值时（如计数器 +1）。若连续多次调用，用旧值直接算可能拿到的不是最新值：

```js
// ❌ 连续两次 +1，两个 count 都是旧值，结果只 +1
setCount(count + 1)
setCount(count + 1)

// ✅ 每次都基于最新值计算，结果 +2
setCount((c) => c + 1)
setCount((c) => c + 1)
```

## 完整示例

```jsx
import { useState } from 'react'

function Counter() {
  // 入参：0（初始值）
  // 返回值：[count, setCount]
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>当前值：{count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  )
}
```

## 注意事项

1. **状态不可变**：不要直接修改状态本身，而是用 setter 传入一个新值/新对象/新数组。
   ```js
   // ❌ 直接 push 修改原数组，React 检测不到变化
   list.push(item)

   // ✅ 创建新数组再 set
   setList([...list, item])
   ```
2. **setter 是异步批处理的**：调用 `setCount` 后，`count` 不会立刻变成新值，要到下次渲染才更新。想基于最新值就用函数式更新。
3. **状态只属于当前组件**：一个组件里的 `useState` 是它自己的，别的组件看不到，除非通过 props 传过去。
