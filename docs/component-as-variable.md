# 为什么 `activeLesson.Component` 是 `ActiveComponent`

在 [App.jsx](../../src/App.jsx) 中，第 29 行：

```js
const ActiveComponent = activeLesson.Component
```

这行是在「给当前要渲染的组件起个变量名」，不是凭空产生的。

## 拆解

### 1. `LESSONS` 里存的是组件本身

`LESSONS` 数组中每个对象的 `Component` 属性，存的是从文件顶部 import 进来的组件引用：

```js
import Greeting from './components/Greeting.jsx'
import Counter from './components/Counter.jsx'
import TodoApp from './components/TodoApp.jsx'
import Clock from './components/Clock.jsx'

const LESSONS = [
  { id: 'greeting', label: '组件与 Props', Component: Greeting },
  { id: 'counter', label: 'useState 与事件', Component: Counter },
  { id: 'todo', label: '列表与表单', Component: TodoApp },
  { id: 'clock', label: 'useEffect', Component: Clock },
]
```

这里的 `Greeting` 不是字符串，就是 `Greeting.jsx` 导出的那个函数/组件本身。所以 `Component` 属性指向一个真正的 React 组件。

### 2. `activeLesson` 是当前匹配到的那个对象

```js
const activeLesson = LESSONS.find((l) => l.id === activeId)
```

用 `find` 从 `LESSONS` 里找到 `id === activeId` 的那一项。假设 `activeId` 是 `'counter'`，那 `activeLesson` 就是：

```js
{ id: 'counter', label: 'useState 与事件', Component: Counter }
```

### 3. `activeLesson.Component` 取出的就是组件，赋给 `ActiveComponent`

所以 `activeLesson.Component` 的值就是 `Counter`（或其他当前选中的组件）。第 29 行只是给它起了个新名字：

```js
const ActiveComponent = activeLesson.Component   // 等价于 const ActiveComponent = Counter
```

## 为什么名字要首字母大写？

这是 JSX 的硬性规则：

- **大写开头** → 当成「组件」渲染，会去调用这个函数。
- **小写开头** → 当成原生 HTML 标签渲染（比如 `<div>`、`<span>`）。

如果写成小写 `const activeComponent = ...`，然后 `<activeComponent />`，React 会以为你要渲染一个叫 `activeComponent` 的 HTML 标签，结果屏幕上什么都不会出现（或报错）。所以这里特意命名成 `ActiveComponent`，让 `<ActiveComponent />` 能正确地按组件来渲染。

## 一句话总结

`activeLesson.Component` 本来就是当前选中的那个组件（`Greeting`/`Counter`/`TodoApp`/`Clock` 之一），这行只是把它赋值给一个「首字母大写」的变量 `ActiveComponent`，好让 JSX 识别它是组件。
