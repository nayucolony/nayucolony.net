+++

Title = "Android4.4系でReact-modalの表示位置がずれる"
tags = ["",""]
slug = "react-modal-position"
date = "2016-12-12T13:16:23+09:00"

+++

## 条件
- Android4.4系

## 現象
React-modalの表示位置がずれる
<!--more-->
## 原因

https://www.npmjs.com/package/react-modal

Examplesの記述の`transform`はAndroid4.4系のブラウザではベンダープレフィックスが必要。
Autoprefixerを使っていたとしても、js内に直接記述して引き渡す場合にはAutoprefixerを経由しない。

```JavaScript
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
```

## 対応
cssファイルにて下記のclassにスタイルを適用させ、Autoprefixerを経由するようにする（推奨）

```css
.ReactModalPortal .ReactModal__Content {
    transform: translate(-50%,-50%);
}
```

または下記のように併記する。

```JavaScript
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    webkitTransform       : 'translate(-50%, -50%)'
  }
};
```

## 備考
js内に直接スタイルを記述する場合はベンダープレフィックスの有無に注意しましょう
