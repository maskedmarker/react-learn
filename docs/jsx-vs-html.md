# JSX 与 HTML 的属性差异

JSX 看起来像 HTML，但本质是 JavaScript。所以很多属性名和原生 HTML 不一样，事件处理尤其明显。

## 事件属性：`onClick` vs `onclick`

**原生 HTML**（小写、值是字符串）：

```html
<button onclick="handleClick()">点击</button>
```

**JSX / React**（驼峰、值是 JS 函数）：

```jsx
<button onClick={handleClick}>点击</button>
```

两个区别：

1. **大小写**：HTML 用小写 `onclick`；JSX 用驼峰 `onClick`。
2. **值**：HTML 里是**字符串**（一段要执行的 JS 代码文本）；JSX 里是**花括号包着的函数引用**（`{handleClick}` 或 `{() => ...}`），是真正的 JavaScript 函数，不是字符串。

## 为什么 React 要改成驼峰

因为 JSX 本质是 JavaScript，不是 HTML。驼峰命名和 JS 的命名习惯一致（DOM 里对应的属性就是 `element.onclick`）。React 实际在背后用 `addEventListener('click', ...)` 绑定事件，而不是往 DOM 上写 `onclick="..."` 字符串属性。

## 常见属性名对照

规律：**HTML 全小写的属性，到了 React 里凡是「事件」都驼峰，凡是和 JS 关键字冲突的（class / for）换个名字。**

| HTML | JSX / React | 原因 |
| --- | --- | --- |
| `onclick` | `onClick` | 事件，统一驼峰 |
| `onchange` | `onChange` | 事件 |
| `onsubmit` | `onSubmit` | 事件 |
| `onkeydown` | `onKeyDown` | 事件 |
| `class` | `className` | `class` 是 JS 关键字 |
| `for` | `htmlFor` | `for` 是 JS 关键字 |

## 传入事件函数，而不是调用结果

JSX 里 `{handleClick}` 传的是**函数本身**，React 在事件发生时调用它。写成 `{handleClick()}` 会在渲染时立即调用，得到的是它的返回值，通常是 bug 的来源：

```jsx
// ❌ 渲染时立刻执行，不是点击时执行
<button onClick={handleClick()}>点击</button>

// ✅ 传函数引用，点击时才执行
<button onClick={handleClick}>点击</button>

// ✅ 需要传参时用箭头函数包一层
<button onClick={() => handleClick(id)}>点击</button>
```

## 事件对象 `e`

事件处理函数会收到一个事件对象（常写作 `e` 或 `event`），比如用 `e.target.value` 取输入框的值：

```jsx
<input value={text} onChange={(e) => setText(e.target.value)} />
```

## 进阶：合成事件（SyntheticEvent）

React 的事件不是浏览器原生事件，而是它自己封装过的「合成事件」，跨浏览器统一了行为（比如 `e.preventDefault()`、`e.stopPropagation()` 用法一致）。先知道有这回事即可，日常用起来和原生事件几乎一样。
