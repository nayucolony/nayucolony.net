+++
title = "bulma functions"
Title = "CSSフレームワーク「Bulma」のユーザー定義関数を見てみる"
tags = ["",""]
slug = ""
date = "2017-01-19T02:03:13+09:00"
image = "/images/bulma/bulma.jpg"

+++

CSSフレームワーク「[Bulma](http://buima.io/)」の`function.sass`に定義されたユーザー関数を見ていきます。

全部で5つあります。
<!--more-->
## powerNumber関数

```sass
@function powerNumber($number, $exp)
  $value: 1
  @if $exp > 0
    @for $i from 1 through $exp
      $value: $value * $number
  @else if $exp < 0
    @for $i from 1 through -$exp
      $value: $value / $number
  @return $value
```

### 機能
**`$exp`を乗数として指数の計算** をし、その値を返します。

これは次の`colorLuminance`関数で使われる関数です。
`colorLuminance`関数から渡される`$exp`の値は`2`なので、2乗になります。

渡される指数が正の数ならば、for文を用いて指数値の回数文の乗算を行います。
負の数ならば、for文を用いて指数値の回数分の除算を行います。

## colorLuminance関数

```sass
@function colorLuminance($color)
  $color-rgb: ('red': red($color),'green': green($color),'blue': blue($color))
  @each $name, $value in $color-rgb
    $adjusted: 0
    $value: $value / 255
    @if $value < 0.03928
      $value: $value / 12.92
    @else
      $value: ($value + .055) / 1.055
      $value: powerNumber($value, 2)
    $color-rgb: map-merge($color-rgb, ($name: $value))
  @return (map-get($color-rgb, 'red') * .2126) + (map-get($color-rgb, 'green') * .7152) + (map-get($color-rgb, 'blue') * .0722)
```

### 機能
渡されたカラーコードをもとに、その色の **相対輝度** を計算して返します。  
計算手順は、全て公式に沿ったものです。（参考:[W3C Working Group Note](http://waic.jp/docs/WCAG-TECHS/G145.html)）

相対輝度とは、簡単にいうと **色の明るさ** です。
rgb(0,0,0)の輝度を0、rgb(255,255,255)の輝度は1で、その他の色は0~1の間の数値をとります。

この関数は、次の`findColorInvert`関数で用いられます。


## findColorInvert

```sass
@function findColorInvert($color)
  @if (colorLuminance($color) > 0.55)
    @return rgba(#000, 0.7)
  @else
    @return #fff
```

### 機能
**渡されたカラーコードについて、その色が明るければ一定値を上回っていればグレー、下回っていれば白を返します。**
明るさの判断は`colorLuminance`関数で算出した相対輝度に基いています。

この関数は、`variables.sass`ファイル上で変数を定義する際に用いられています。

背景色に対し、文字色は白とグレーどちらがふさわしいかを数値に基づいて判断し、定義に用いているんですね。

例えば`is-warning`で用いられている黄色に対しては、明るいと判断されグレーが返されます。<br>
また、`is-dark`で用いられている黒に対しては、暗いと判断され白、という風に使われています。

この辺は、目視判断で「このときは白のほうが読みやすいだろ〜」みたいな感じで決めているものかと思っていたのですが、ロジカルかつプログラマブルな決定が行われているのですね。

参考：[Color Luminance Function - CSS-TRICS](https://css-tricks.com/snippets/sass/luminance-color-function/)


## removeUnit関数

```sass
@function removeUnit($number)
  @if type-of($number) == 'number' and not unitless($number)
    @return $number / ($number * 0 + 1)
  @return $number
```

### 機能
**引数で渡された値が数値かつ単位がついている場合、その数値のみを返します。**
例えば、`42px`という値が渡された時、`42`を返します。また、単位が最初からついていない場合はそのまま返します。


### 単位が消える仕組み
`$number`に`30px`という値が渡された場合、この括弧の式は`(30px * 0 + 1)`となります。
計算すると`(0px + 1)`となり、`0px`に合わせて自動的に`1`は`1px`と補完されるため、`1px`となります。

これは、引き渡された値が`cm`であろうが`vw`であろうが同じです。

その結果、`$number / ($number * 0 + 1)`は`30px / 1px`となり`30`という値が得られます。
Sassでは、**単位数で除算を行うことで数値のみが取り出せる** のです。

逆に、単位のない数値と1pxの乗算を行うことで、単位を与えることができます。<br>
（例：`30 * 1px`で`30px`）

参考：[Strip-unit Function - CSS-TRICS](https://css-tricks.com/snippets/sass/strip-unit-function/)

単位を消す理由は、次の関数の解説で行います。


## roundToEvenNumber関数

```sass
@function roundToEvenNumber($number)
  @return floor($number / 2) * 2
```

### 機能
数値を偶数に丸め込む関数です。

例えば、`width:50%`などを使うときに、親要素の幅が奇数だと小数になりますね。
小数点以下のピクセル値は、ブラウザによって切り捨てられたり、四捨五入されたりとブラウザによって解釈が様々です。

参考：[レスポンシブなデザインにするなら知っておきたい。各ブラウザの小数点以下のピクセル値の扱い](http://parashuto.com/rriver/responsive-web/sub-pixel-rounding-browser-problem)

この関数を用いることで、数値を偶数に丸め込み、その問題を解消することができます。

## おわりに
Sassの関数はめったに使うことはないのでかなり勉強になりました。

特に、**「ある背景色に乗せる色は、白と黒どっちが見やすいか」** のような、心理的な部分に頼るよりも理論に基づいたほうが正確な場合に効果てきめんですね。大量の情報を処理する必要が有る場合はなおさらですね。

今回はユーザーが定義した関数の話でしたが、Sassにはビルトイン関数（Sassに機能として備わっている関数）もたくさんあります。
都度、便利そうなものは取り入れていきたいですね。
