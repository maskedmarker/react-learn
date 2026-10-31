# React 设计原理

React 的核心思想可以用一句话概括：

> **UI = f(state)** —— 界面是状态的函数。给定相同的状态，就渲染出相同的界面。

React 帮你做的事就是：你只管声明「状态是什么、界面该长什么样」，当状态变化时，React 自动算出界面的变化并更新 DOM。理解下面几个原则，就能理解 React 为什么这样设计。

## 1. 声明式（Declarative）

**命令式**是你一步步告诉浏览器「怎么做」：

```js
// 命令式：手动操作 DOM
const btn = document.querySelector('button')
btn.textContent = '已点击'
btn.classList.add('active')
```

**声明式**是你只描述「结果应该是什么」，React 负责「怎么做」：

```jsx
// 声明式：描述不同状态下应该显示什么
<button className={clicked ? 'active' : ''}>
  {clicked ? '已点击' : '点击'}
</button>
```

你写的是「点击后这里显示『已点击』」，而不是「找到按钮、改文字、加类名」。DOM 怎么改由 React 决定。

## 2. 组件化（Component-based）

界面被拆成一个个**独立、可复用、可组合**的组件。组件像积木：`UserCard`、`Counter`、`TodoItem` 各自封装自己的逻辑和 UI，再拼装成整个页面。

```jsx
<App>
  <Greeting />
  <Counter />
  <TodoApp>
    <TodoItem />
    <TodoItem />
  </TodoApp>
</App>
```

好处：关注点分离、方便复用、好测试、好维护。

## 3. 单向数据流（One-way data flow）

数据只朝**一个方向**流动：

```
父组件 state/props ──向下传──▶ 子组件（通过 props）
子组件想改数据 ──向上回调──▶ 父组件的 setState
```

- 数据**向下**：通过 props 传给子组件，props 只读。
- 操作**向上**：子组件不能直接改父组件的状态，只能调用父组件传下来的回调（`onToggle`、`onRemove`）。

单向流动让数据变化可预测、好追踪 —— 这是 React 最重要的设计约束之一。

## 4. 状态不可变（Immutability）

更新状态不是「修改旧值」，而是「用一个新值替换它」：

```js
// ❌ 直接修改原数组，React 检测不到变化
list.push(item)

// ✅ 创建新数组再 set
setList([...list, item])
```

不可变让 React 能快速判断「有没有变」（对比引用即可），也避免了意外的副作用。

## 5. 虚拟 DOM 与 Reconciliation

React 不直接操作真实 DOM（真实 DOM 操作很慢）。它维护一棵**虚拟 DOM**（用 JS 对象描述的界面树）。状态变化时：

1. React 用新状态生成一棵**新的虚拟 DOM 树**。
2. 和**上一棵**对比（diff），找出真正变化的部分。
3. 只把**最小的改动**应用到真实 DOM。

这个过程叫 **reconciliation（协调）**。你看到的状态更新快，正是因为它避免了整页重绘。

## 6. 渲染的两个阶段：render 与 commit

每次状态变化，React 分两步工作：

| 阶段 | 做什么 | 特点 |
| --- | --- | --- |
| **render（渲染）** | 调用组件函数，算出新的虚拟 DOM，和旧的做 diff | 纯计算，可被打断/重来，不碰 DOM |
| **commit（提交）** | 把 diff 结果真正写到 DOM，然后执行 `useEffect` 等副作用 | 必须一次性完成 |

这解释了之前的现象：`Clock()` 函数体（render 阶段）每秒重跑，但 `useEffect` 的清理函数（commit 阶段，只在卸载/依赖变化时跑）不是每秒都执行。详见 [useEffect.md](useEffect.md)。

## 小结

把上面串起来，React 的工作流是：

```
state 变化
  → render：重新执行组件函数，算出新 UI，diff 出差异
  → commit：更新真实 DOM，执行/清理副作用
  → 界面更新，等待下一次状态变化
```

抓住三个核心：**UI = f(state)**、**单向数据流**、**状态不可变**，剩下的细节都是围绕这三条展开的。
