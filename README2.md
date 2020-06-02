```js
[
  {},
  {},
  [
    {},
    {},
    [
      {}, {}, ...
    ],
    {}
  ],
  {},
  []
]
```
React 的`{}`中会自动递归的渲染。例如：
```js
const arr = [1, 2, [3, [4, 5, 6], 7], 8]

{ arr.map(item => <div key={item}>{ item }</div>) }

// 结果
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
<div>7</div>
<div>8</div>
```
