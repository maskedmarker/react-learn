# JSX

JSX is stricter than HTML. 
```text
You have to close tags like <br />. 
Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper:
```

```javascript
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
```

```text
JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display user.name:

return (
  <img className="avatar" src={user.imageUrl} />
);


JSX 允许你将标记（HTML 样式的代码）写入 JavaScript 中。大括号则允许你“返回”到 JavaScript 中，以便嵌入代码中的某些变量并将其显示给用户。
```

You can put more complex expressions inside the JSX curly braces too, for example, string concatenation:

```JavaScript
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

```text
In the above example, style={{}} is not a special syntax, but a regular {} object inside the style={ } JSX curly braces. You can use the style attribute when your styles depend on JavaScript variables.
```

## 空格

```JavaScript
function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}
```

```text
为什么不能直接写普通空格？
在 JSX（JavaScript XML）中，如果你直接写一个连续的空格或者换行，React 编译器通常会把它们自动忽略或压缩成一个。

上面的代码如果不使用大括号{' '}的话,就等价于
```

```JavaScript
function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </form>
  );
}
```

