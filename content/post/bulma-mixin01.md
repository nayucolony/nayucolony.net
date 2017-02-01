+++
title = "bulma mixin01"
Title = "CSSフレームワーク「Bulma」のmixinを眺める その1"
tags = ["",""]
slug = ""
date = "2017-01-21T16:06:44+09:00"
image = "/images/bulma/bulma.jpg"

+++

このエントリでは、CSSフレームワーク「[Bulma](http://bulma.io/)」の`mixin.sass`を見ていきます。

スニペットとしても、計算関数としても便利な`@mixin`は、CSSフレームワーク上ではどのように使われているのでしょう。
一つ一つコードを見て、内容を把握していきます。

<!--more-->

_※「Bulma」の元ファイルは.sassファイルですが、多く用いられている.scssファイル形式の記述に書き換えています。_

## arrow

```scss
@mixin arrow($color) {
  border: 1px solid $color;
  border-right: 0;
  border-top: 0;
  content: " ";
  display: block;
  height: 0.5em;
  pointer-events: none;
  position: absolute;
  transform: rotate(-45deg);
  width: 0.5em;
}
```
### 渡される引数
色

### 機能
**渡された色で矢印を作る** ためのCSSを出力します。

この`@mixin`は、`select`要素がプルダウン可能であることを表す下向き矢印に使われます。
左辺と底辺に`border`をつけて直角にしたものを、45度回転させて下向き矢印に見せています。

## block

```scss
@mixin block {
  &:not(:last-child) {
    margin-bottom: 1.5rem
  }
}
```

### 機能

最後の要素以外に`margin-bottom: 1.5rem`を持たせるCSSを返します。<br>
セクションを区切るために使われています。

### 余白を`@mixin`で運用するメリット

余白指定を`@include block`で運用することで、要素間のマージンの統一性が上がります。
どんなコンポーネントを並べても、統一して`margin-bottom: 1.5rem`がつくため、レイアウトに一貫性が生まれます。

また例えば、もし`margin-bottom: 2rem`にしたくなった場合などにも有効です。
`@include block`での運用をしていた場合は **@mixinの内容のみ** を修正すれば、`@include`で呼び出している部分がすべて書き換わります。

一方で、直接`margin-bottom: 1.5rem`のように数値指定していた場合、全ての指定箇所を書き換えていく必要があります。

`margin-bottom: 1.5rem`は別の場所で使われている可能性もあるので、一括置換は難しいです。

## clearfix

```scss
@mixin clearfix {
  &:after {
    clear: both;
    content: " ";
    display: table;
  }
}
```

`float`レイアウトに用いる`clearfix`です。

### ヘルパークラスとどっちが便利？
それぞれにメリットがあります。

`@mixin`を用いた場合、**htmlでクラスを指定する必要がなくなる** というメリットがあります。

ヘルパークラスを用いた場合は、CSSファイルの中身が煩雑にならないという点、HTML側で明示的にclearfixがかかっていることがわかるという点がメリットです。

フレームワークは運用コストを低くするためのものなので、「使うときに必要な作業を減らす」という点で`@mixin`による運用が合理的な選択です。


## center

```scss
@mixin center($size) {
  left: 50%;
  margin-left: -($size / 2);
  margin-top: -($size / 2);
  position: absolute;
  top: 50%;
}
```

### 渡される引数
数

### 機能
オブジェクトの中央揃えに用いる`@mixin`です。`position: absolute`で配置する必要のある要素に用います。

いちいち **「`position: absolute`で天地左右50%の位置に配置して、オブジェクトの`width`プロパティの値の半分をネガティブマージンでずらす」** という指定を、`width`プロパティの数値を渡すだけで返してくれるので非常に便利です。

## delete

```scss
＠mixin delete {
  // We need even pixel dimensions to ensure the delete cross can be perfectly centered
  $dimension-small: roundToEvenNumber(1.5 * removeUnit($size-6) * removeUnit($size-small)) * 1px;
  $dimension-normal: roundToEvenNumber(1.5 * removeUnit($size-6) * removeUnit($size-normal)) * 1px;
  $dimension-medium: roundToEvenNumber(1.5 * removeUnit($size-6) * removeUnit($size-medium)) * 1px;
  $dimension-large: roundToEvenNumber(1.5 * removeUnit($size-6) * removeUnit($size-large)) * 1px;
  @include unselectable;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgba($black, 0.2);
  border: none;
  border-radius: 290486px;
  cursor: pointer;
  display: inline-block;
  font-size: $size-normal;
  height: $dimension-normal;
  outline: none;
  position: relative;
  transform: rotate(45deg);
  transform-origin: center center;
  vertical-align: top;
  width: $dimension-normal;
  &:before,
  &:after {
    background-color: $white;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  &:before {
    height: 2px;
    width: 50%;
  }

  &:after {
    height: 50%;
    width: 2px;
  }

  &:hover,
  &:focus {
    background-color: rgba($black, 0.3);
  }

  &:active {
    background-color: rgba($black, 0.4);
  }

  // Sizes
  &.is-small {
    height: $dimension-small;
    width: $dimension-small;
  }

  &.is-medium {
    height: $dimension-medium;
    width: $dimension-medium;
  }

  &.is-large {
    height: $dimension-large;
    width: $dimension-large;
  }

}
```

閉じるボタンです。

「ｘ」を構成する斜め線は、`::before`擬似クラスと`::after`擬似クラスを用いています。
`width`プロパティを親要素の`width`プロパティの`50%`、`height:1px`の長方形を45度傾けたものを中心で重ねています。


### 数値を偶数に丸め込む`roundToEvenNumber`関数
ここでは、完璧に中央に配置するために、数値を偶数に丸め込む`roundToEvenNumber`関数が用いられています。

理由は、土台となる要素の`width`プロパティが奇数だった場合、`::before`及び`::after`擬似クラスは`width: 50%;`で幅を指定しているので、実際のpx値が小数になってしまいます。

pxの小数点以下の処理は強制的に切り捨てであったり、四捨五入であったりとブラウザによりけりなので、完璧に中央配置するには親要素の`width`プロパティの値が偶数である必要があります。

## fa

```scss
@mixin fa($size, $dimensions) {
  display: inline-block;
  font-size: $size;
  height: $dimensions;
  line-height: $dimensions;
  text-align: center;
  vertical-align: top;
  width: $dimensions;
}
```

font awesomeアイコンの配置用`@mixin`。

渡された数値（=アイコンフォントに指定したい`font-size`プロパティの値）を１辺とした空間を作り、`text-align: center`及び`vertical-align: top`を用いて空間内にアイコンを配置します。

これにより、アイコンの縦軸を揃えることができます。

## hamburger

```scss
@mixin hamburger($dimensions) {
  cursor: pointer;
  display: block;
  height: $dimensions;
  position: relative;
  width: $dimensions;
  span {
    background-color: $text;
    display: block;
    height: 1px;
    left: 50%;
    margin-left: -7px;
    position: absolute;
    top: 50%;
    transition: none $speed $easing;
    transition-property: background, left, opacity, transform;
    width: 15px;
    &:nth-child(1) {
      margin-top: -6px;
    }

    &:nth-child(2) {
      margin-top: -1px;
    }

    &:nth-child(3) {
      margin-top: 4px;
    }
  }

  &:hover {
    background-color: $background;
  }

  // Modifers
  &.is-active {
    span {
      background-color: $link;
      &:nth-child(1) {
        margin-left: -5px;
        transform: rotate(45deg);
        transform-origin: left top;
      }
      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        margin-left: -5px;
        transform: rotate(-45deg);
        transform-origin: left bottom;
      }
    }
  }
}
```

### 渡される引数
数

### 機能
ハンバーガーメニューです。

渡された値を一片とした正方形をつくり、その中に三本線を`position:absolute`で配置しています。

`.is-active`クラスを付与することで真ん中の線が`opacity:0`になり透明に、上下の線が45度ずつ傾き、中心で交わり「×」になります。



## spinAround

```scss
@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

```

回転アニメーションで用いるキーフレームです。

この次の`loader`で使います。

## loader

```scss
@mixin loader {
  animation: spinAround 500ms infinite linear;
  border: 2px solid $border;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1rem;
  position: relative;
  width: 1rem;
}
```
ローディングアニメーション表示用の`@mixin`です。

`animation: spinAround 500ms infinite linear;`で、**0度から359度まで、等速で、無限にアニメーションし続ける** ということを意味します。

他のプロパティは半円を描く役割をしています。

結果、**半円がぐるぐる周り続けるローディングアニメーション** になります。


## overflow-touch

```scss
@mixin overflow-touch {
  -webkit-overflow-scrolling: touch;
}
```
iOS Sarariで慣性スクロールを有効にします。

Modalは`height`プロパティを数値で指定しているので、内包する文章が長いと枠外にはみ出てしまいます。

`overflow: auto;`を指定することで、デスクトップ版Chromeなどではスクロールが有効になるのですが
iOS Safariでは **「二本指でスワイプ」** することでスクロールができるようになります。
バグでもなんでもないのですが、 **これあんまり使わないのでわからないんですよね。**

それを解決するのが`overflow-scrolling`プロパティです。
これを指定することで一本指でスクロールができるようになります。

## overlay

```scss
@mixin overlay($offset: 0) {
  bottom: $offset;
  left: $offset;
  position: absolute;
  right: $offset;
  top: $offset;
}
```

中央配置用`@mixin`です。

`center`と違う点として、こちらは **親要素をカバーするように配置されます。**

`width:100%`や`height:100%`と組み合わせて使われています。

親要素のアスペクト比に強制的にフィットさせるような使い方ができます。



## placeholder

```scss
@mixin placeholder {
  $placeholders: ':-moz' ':-webkit-input' '-moz' '-ms-input';
  @each $placeholder in $placeholders {
    &:#{$placeholder}-placeholder
      @content      
  }
}
```

`input`要素のplaceholderの装飾に用いられます。
実は文字色とか変えられるんですよね。

`@each`を用いて`$placeholders`のすべての要素についてループし、ベンダープレフィックス付きのクラスを生成しています。
（ここ、Autoprefixer効かないんでしょうか）

## unselectable

```scss
@mixin unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

例えばpaginationの「&hellip;」などは装飾的に用いられているテキストなので選択できないようにします。

`button`要素などもドラッグで選択できたりするとダサいのでこれを宣言しています。
ネイティブアプリ感を出さないようにするための処置ですね。


## おわりに
私は今まで`@mixin`をあまり使うことがなかったのですが、「Bulma」の`@mixin`を見ていて２つの利点に気づきました。

### 実際に運用するファイルが簡潔になる。
便利計算だけでなく、ただ単純にスニペットを呼び出すためだけに定義されている`@mixin`も多くあることがわかりました。

特に`center`のような中央配置スニペットなど、 **内容がある程度予測でき、かつ記述することで逆に煩雑になるような場合は、適度にブラックボックス化** することで運用するファイルのコードをスッキリさせることができます。

### 編集箇所が一点に絞れる
これは前々回の[CSSフレームワーク「Bulma」に学ぶSassの変数定義](/bulma-variables/)でも同じようなことがありました。

例えば、あらゆるコンポーネント間の隙間は`margin-bottom: 1.5rem`という風に取り決めがあったとします。
この取り決めに従い、全てのコンポーネントのレイアウト時には`margin-bottom: 1.5rem`を記述しました。
しかし、 **「やっぱり1.8remにしたい」** と言った時、直接記述していた場合は置換作業が発生します。

`margin-bottom: 1.5rem`を`margin-bottom: 1.8rem`に一括置換すると、レイアウトに関与しない部分でたまたま`margin-bottom: 1.5rem`を使用していた場合に意図せず書き換えてしまうかもしれません。そうすると、いちいちコンテキストを確認しながらの置換作業になり非常に手間がかかります。

一方で、`@mixin`で定義しておいて呼び出す場合は`@mixin`側の値を変えるだけで、呼び出している部分全ての値が変更されます。
**`margin-bottom`という普遍的なスタイリングに名前空間を持たせている** ということになります。

以上、`@mixin`を見ていく回でした。

次回は`@media`に関わる`@mixin`を見ていきます。
