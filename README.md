# ⚛️ React 学习 Demo

一个覆盖 React 核心概念的示例项目，用 **Vite + React 18（JavaScript）** 搭建。每个组件都配有中文注释，建议一边运行一边读代码。

## 启动

```bash
npm install    # 安装依赖（首次）
npm run dev    # 启动开发服务器，浏览器打开提示的地址（默认 http://localhost:5173）
```

其它命令：

```bash
npm run build     # 打包生产版本，输出到 dist/
npm run preview   # 本地预览打包结果
```

## 项目结构

```
react-learn/
├── index.html            # 页面入口，React 挂载到 <div id="root">
├── vite.config.js        # Vite 配置（启用 React 插件）
├── package.json          # 依赖与脚本
└── src/
    ├── main.jsx          # 应用入口，把 <App /> 挂载到页面
    ├── App.jsx           # 根组件：页面导航 + 条件渲染
    ├── App.css           # 根组件样式
    ├── index.css         # 全局样式
    └── components/
        ├── Greeting.jsx  # 组件与 Props
        ├── Counter.jsx   # useState 与事件处理
        ├── TodoApp.jsx   # 列表渲染、key、受控表单、条件渲染
        ├── TodoItem.jsx  # 展示层组件与回调 props
        └── Clock.jsx     # useEffect 副作用与清理
```

## 每个页面讲什么

| 页面 | 知识点 | 关键代码 |
| --- | --- | --- |
| 组件与 Props | 函数组件、props 传参、props 默认值、只读 | `function UserCard({ name, role = '学生' })` |
| useState 与事件 | state 状态、事件处理、函数式更新 | `useState(0)`、`onClick={() => setCount(...)}` |
| 列表与表单 | `map` 渲染列表、`key`、受控组件、条件渲染、状态不可变 | `todos.map(...)`、`value={text}` |
| useEffect | 副作用、定时器、清理函数、依赖数组 | `useEffect(() => {...}, [])` |

## 学习建议

1. 先跑起来，点每个导航按钮看看效果。
2. 对着代码逐行读注释，理解「数据 → 界面」的流向。
3. 动手改：给待办事项加「编辑」功能、给计数器加「每次 +10」按钮、给 UserCard 加邮箱字段。
4. 遇到报错看浏览器控制台（F12）和终端，报错信息通常直接告诉你问题在哪。

## 核心概念速记

- **组件**：返回 JSX 的函数，首字母必须大写。
- **Props**：父传子的数据，只读。
- **State**：组件自己记住的数据，用 `useState`，更新会触发重渲染。
- **列表**：用 `map` 生成，每个元素要有稳定唯一的 `key`。
- **条件渲染**：用 `&&`、三元表达式或提前 `return`。
- **useEffect**：处理副作用，依赖数组 `[]` 表示只执行一次。
