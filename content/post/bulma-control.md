+++
title = "bulma control"
date = "2017-01-31T22:17:12+09:00"
image = "/images/bulma/bulma.jpg"
Title = "CSSフレームワーク「Bulma」の「control」って何？調べてみた"
tags = ["",""]
slug = ""
draft=true
+++
このエントリでは、CSSフレームワーク「Bulma」の`control.sass`を見ていきます。これまでの`mixin.sass`や`function.sass`と違って、ファイル名だけで役割の判断が難しいファイルです。CSSで、controlって何？どのように使われているかを見ていきます。

<!--more-->
_注意：Bulmaの元ファイルはSASS記法ですが、ここではSCSS記法に書き換えています_

## ローカル変数
ファイルの頭に2つのローカル変数が指定されています。

```scss
$control-radius: $radius !default;
$control-radius-small: $radius-small !default;
```

おそらく、`contorol.sass`内で使用するであろう二種類の`border-radius`に名前空間を持たせています。
`$radius`、`$radius-small`は`variables.sass`内に書かれています。

## control
このファイルのコアとなる一番大きいmixinです。ここを解き明かすことで、このファイルが何なのかがわかるはず。


```scss
@mixin control{
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: none;
  border-radius: $control-radius;
  box-shadow: none;
  display: inline-flex;
  font-size: $size-normal;
  height: 2.285em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  position: relative;
  vertical-align: top;
  // States
  &:focus,
  &.is-focused,
  &:active,
  &.is-active {
    outline: none;  
  }
  &[disabled],
  &.is-disabled {
    pointer-events: none;
  }
}
```

これが呼び出されているクラスは`pagination`、`button`、`form`要素です。
それを踏まえると、ここでは **クリックを要するパーツの挙動を全て管理している** ようです。

確かに、各パーツの見た目・挙動を揃えるためにある一定の処理をするための記述は毎回発生します。
それらを、わざわざコンポーネントごとに記述するとDRY原則に反する冗長なコードになる上、修正の手間もコピペを繰り返した数だけ発生します。
このことを考慮すると非常に合理的といえます。

また、スニペットの塊に名前空間をもたせることで「何のために書いている」かが明確になるというのも重要なことです。
昔書いたCSSを編集するときなどに「なんでこれ書いてんだ？」と思うことがよくあります。
名前空間を持たせていれば、それらを不要な記述と判断して消すこともなくなりますね。

## control-small,control-medium,contorol-large

```scss
// The controls sizes use mixins so they can be used at different breakpoints
@mixin control-small {
  border-radius: $control-radius-small;
  font-size: $size-small  ;
}
```

~~~scss
@mixin control-medium {
  font-size: $size-medium;
}

@mixin control-large {
  font-size: $size-large;
}
~~~

ボタン系のモジュールに使われてる`padding`などの値は、全て`em`で書かれています。
すなわち、ボタンの`font-size`を基準としてサイズが作られているということです。

`control-small`、`control-medium`、`control-large`は`form`要素のサイズmodifierで読み込まれいています。
これらの`@mixin`で文字サイズを変えることで、一定の比率を保ちながらサイズを変更しています。

ただし、`border-radius`は相対値ではなく絶対値なので、`control-small`では手動で小さめサイズが指定されています。  
これは、文字サイズで相対的に角丸の半径を変化させていると、全く違う半径の角丸でできたボタンが並ぶことになり、統一感がなくなるためかと思われます。
個人的には、全て同じ方が統一感が出るのでは？と思うのですがどうなのでしょう。
