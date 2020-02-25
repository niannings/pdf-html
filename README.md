# pdf-html

将任意单个或多个dom元素导出为pdf

## install

```shell
npm i -S pdf-html
```

## usage

### 导出单个元素

```js
import pdfHtml from 'pdf-html';

pdfHtml({
    el: document.body
});
// 使用选择器，（匹配到该选择器的元素都将出现在pdf中）
pdfHtml({
    el: 'body'
});
```

### 导出多个元素

```js
pdfHtml({
    el: [document.querySelector('.class-1'), document.querySelector('.class-2')]
});
pdfHtml({
    el: [document.querySelectorAll('div')]
});
// 使用选择器
pdfHtml({
    el: ['.class-1', '.class-2', 'pre', 'img', 'canvas']
});
```

## Options

### 页面尺寸 size

默认：A4 portrait  
详情可查看：[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size)

```js
pdfHtml({
    el: 'body',
    styles: {
        size: 'A4 landspace'
    }
});
```

### 页面边距

默认：2cm

```js
pdfHtml({
    el: 'body',
    styles: {
        margin: '2cm 1cm 1cm'
    }
});
```

## 搭配框架使用

### React

#### 基本使用

```jsx
import reactPdfHtml from 'pdf-html/dist/react-pdf-html.js';

const div = document.createElement('div');

document.body.append(div);

reactPdfHtml({
    el: div,
    component: (
        <div>
            <MyComponent />
        </div>
    )
});
```

#### 组件内有异步更新

等待组件完成更新再来导出

```jsx
import reactPdfHtml from 'pdf-html/dist/react-pdf-html.js';

const div = document.createElement('div');

document.body.append(div);

let start;
const waitUpdate = isOk => {
    if (isOk) {
        setTimeout(() => start(isOk));
    }
}

start = reactPdfHtml({
    el: div,
    component: (
        <div>
            <MyComponent onFetched={waitUpdate} />
        </div>
    )
});
```

MyComponent.js

```jsx
function MyComponent({ onFetched }) {
    const [message, setMessage] = useState('no message');
    const getData = () => {
        setTimeout(() => {
            setMessage('hello pdf-html');
            onFetched && onFetched(true);
        }, 2000);
    }

    useEffect(() => {
        getData();
    }, []);

    return <div>{message}</div>
}
```
