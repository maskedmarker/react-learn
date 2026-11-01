Thinking in React

> 来自react官网, https://react.dev/learn/thinking-in-react

```text
React can change how you think about the designs you look at and the apps you build. When you build a user interface with React, you will first break it apart into pieces called components. Then, you will describe the different visual states for each of your components. Finally, you will connect your components together so that the data flows through them. In this tutorial, we’ll guide you through the thought process of building a searchable product data table with React.
```





## Step 1: Break the UI into a component hierarchy

```text
Start by drawing boxes around every component and subcomponent in the mockup and naming them. If you work with a designer, they may have already named these components in their design tool. Ask them!
```

## Step 2: Build a static version in React

```text
Now that you have your component hierarchy, it’s time to implement your app. 
The most straightforward approach is to build a version that renders the UI from your data model without adding any interactivity… yet! It’s often easier to build the static version first and add interactivity later. Building a static version requires a lot of typing and no thinking, but adding interactivity requires a lot of thinking and not a lot of typing.

You can either build “top down” by starting with building the components higher up in the hierarchy (like FilterableProductTable) or “bottom up” by working from components lower down (like ProductRow). In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up.
```

## Step 3: Find the minimal but complete representation of UI state 

```text
To make the UI interactive, you need to let users change your underlying data model. You will use state for this.

Think of state as the minimal set of changing data that your app needs to remember. 
The most important principle for structuring state is to keep it DRY (Don’t Repeat Yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else on-demand.
```

```markdown
Which of these are state? Identify the ones that are not:

1. Does it remain unchanged over time? If so, it isn’t state.
2. Is it passed in from a parent via props? If so, it isn’t state.
3. Can you compute it based on existing state or props in your component? If so, it definitely isn’t state!
```



## Step 4: Identify where your state should live

```text
After identifying your app’s minimal state data, you need to identify which component is responsible for changing this state, or owns the state. 
Remember: React uses one-way data flow, passing data down the component hierarchy from parent to child component. 
It may not be immediately clear which component should own what state. This can be challenging if you’re new to this concept, but you can figure it out by following these steps!

For each piece of state in your application:

1. Identify every component that renders something based on that state.
2. Find their closest common parent component—a component above them all in the hierarchy.
3. Decide where the state should live:
     3.1 Often, you can put the state directly into their common parent.
     3.2 You can also put the state into some component above their common parent.
     3.3. If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.
```



## Step 5: Add inverse data flow (反向数据流)

```text
Currently your app renders correctly with props and state flowing down the hierarchy. 
But to change the state according to user input, you will need to support data flowing the other way: the form components deep in the hierarchy need to update the state in FilterableProductTable.


React makes this data flow explicit, but it requires a little more typing than two-way data binding.
翻译: React 让这种数据流变得显式（明了），但与双向数据绑定相比，它需要多写一些代码。
```


```text
vue是双向绑定, react是单向绑定, 是吗?

Vue 默认倾向于双向数据绑定（比如通过 v-model）。
React 严格坚持单向数据流（One-way data flow）。

以下是它们的具体区别和原因：
1. Vue 的双向绑定（Two-way Data Binding）
     怎么回事：在 Vue 中（例如表单输入框），你可以使用 v-model。它既能把状态（State）的值显示到页面上（数据流向 UI），又能当用户在输入框打字时自动把新的值改回到状态中（数据流向 Model）。
     优点：写表单时非常省事，开发人员不需要手动写事件监听和回调函数来更新数据，框架在底层自动帮你搞定。

2. React 的单向数据流与“反向数据流”（One-way Data Flow）
     怎么回事：React 规定数据永远只能从父组件流向子组件（通过 props）。子组件不能直接修改父组件传过来的数据。
     怎么实现交互：正如你刚才在教程里看到的（Step 5），如果子组件（如 SearchBar）想改变父组件的 state，必须由父组件把一个修改状态的函数（如 setFilterText）通过 props 传给子组件。当用户输入时，子组件调用这个函数通知父组件去更新。

     优点：虽然多写了一些代码（显式的事件回调），但整个应用的状态变化路径会非常清晰、可预测。当应用变得庞大、出现 Bug 时，你可以一眼看出是哪个组件通过什么途径修改了数据，极易进行调试。
```