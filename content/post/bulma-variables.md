+++
title = "bulma variables"
date = "2017-01-21T01:58:50+09:00"
Title = "CSSフレームワーク「Bulma」に学ぶSassの変数定義"
tags = ["",""]
slug = ""
image = "/images/bulma/bulma.jpg"
+++

CSSフレームワーク「[Bulma](http://buluma.io/)」の`variables.sass`ファイルを見ていきます。

変数定義は、なんとなくやっているものの、本当に便利な、意味のある変数定義について考えたことはあまりないため、叡智のつまったオープンソースのCSSフレームワークに学んで見ます。

<!--more-->

## カラー

```sass
// Colors
$black:        hsl(0, 0%, 4%) !default
$black-bis:    hsl(0, 0%, 7%) !default
$black-ter:    hsl(0, 0%, 14%) !default

$grey-darker:  hsl(0, 0%, 21%) !default
$grey-dark:    hsl(0, 0%, 29%) !default
$grey:         hsl(0, 0%, 48%) !default
$grey-light:   hsl(0, 0%, 71%) !default
$grey-lighter: hsl(0, 0%, 86%) !default

$white-ter:    hsl(0, 0%, 96%) !default
$white-bis:    hsl(0, 0%, 98%) !default
$white:        hsl(0, 0%, 100%) !default

$orange:       hsl(14,  100%, 53%) !default
$yellow:       hsl(48,  100%, 67%) !default
$green:        hsl(141, 71%,  48%) !default
$turquoise:    hsl(171, 100%, 41%) !default
$blue:         hsl(217, 71%,  53%) !default
$purple:       hsl(271, 100%, 71%) !default
$red:          hsl(348, 100%, 61%) !default
```

### HSL
CSS3から使用できるようになった **HSL色空間** を用いた記法が採用されています。
**RGB色空間** に比べて、色から色への変化を調整しやすい色空間です。

Hは色相(0~360)、Sは彩度(0~100%)、Lは輝度(0~100%)です。
「少し暗く」というオーダーには輝度を下げたり、「彩度と輝度を保ったまま色味をずらす」ことで変にコントラストがつくことが防げたりと、なかなか便利です。

### !default
Sassの機能である`!default`も用いられていますね。
これは、**「もしその変数に値が与えられていなかった場合にその値で定義する」** というものです。

### 変数名
変数名の`$white-bis`,`&white-ter`に用いられている"bis","ter"にも注目です。
これはフランス語で「2番目」「3番目」という意味です。
個人的にはなかなかオシャレな表記だとおもいます。

## フォント周り

```sass
// Typography
$family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !default
$family-monospace: "Inconsolata", "Consolas", "Monaco", monospace !default

$size-1: 3.5rem !default
$size-2: 2.75rem !default
$size-3: 2rem !default
$size-4: 1.5rem !default
$size-5: 1.25rem !default
$size-6: 14px !default
$size-7: 0.75rem !default

$weight-light: 300 !default
$weight-normal: 400 !default
$weight-semibold: 500 !default
$weight-bold: 700 !default
```

`font-family`そのものではなく、`font-family`を設定するときに使うsans-serifフォントや、`code`などで指定する等幅フォントをここにまとめています。

指定されているフォントがそれぞれどういった背景を持っているかを表にまとめました。

|font-family|対象環境|備考|
|---|---|---|
|-apple-system|Mac OS X システムフォント(El capitan以降)|San Fransiscoを呼び出すSafari向けの記述|
|BlinkMacSystemFont|同上|San Fransiscoを呼び出すChrome向けの記述|
|Segoe UI| Windows のシステムフォント||
|Roboto|Android4.0~のシステムフォント||
|Oxygen|不明|Google Fontsに存在を確認||
|Ubuntu|Ubuntuシステムフォント||
|Cantarell|GNOMEシステムフォント||
|Fira Sans|Firefox OS用システムフォント||
|Droid Sans|Androidシステムフォント()||
|Helvetica Neue|Mac OS X 10.10 (Yosemite)システムフォント||
|Helvetica|Mac標準フォント/iOSシステムフォント(~iOS8)||
|Arial|Mac/Windows共通フォント||

かなり細かくシステムフォントが指定されていることがわかります。
海外フォント事情はよくわかっていないのですが、例えば"Oxygen"なんかは調べた限りではただのWebフォントという情報しか手に入れることができませんでした。何かのシステムフォントという背景も見当たらず、どういう環境向けの表記なのかが気になります。

## 色々な設定
```sass
// Miscellaneous
$easing: ease-out !default
$radius-small: 2px !default
$radius: 3px !default
$radius-large: 5px !default
$speed: 86ms !default
```

`a`要素のhoverアニメーションの挙動や、`border-radius`プロパティの半径などが指定されています。

### Miscellaneousって何？
`Miscellaneous`とは「雑多な・多種多様な」という意味です。  
[miscellaneousの意味 - 英和辞典 Weblio辞書](http://ejje.weblio.jp/content/miscellaneous)


日本語でいうと`// いろいろ`ですよね。こんなの書いてたら殺されそうですよね。こっそり採用したいです。

ちなみにGithubで「Miscellaneous」を検索するとなかなかでございました。
![](/images/bulma-variables/github.png)
[Search・Miscellaneous - Github](https://github.com/search?utf8=%E2%9C%93&q=Miscellaneous)

使っていきたい、ミセラニアス。

## 役割付きカラー

```sass

// 2. Primary colors

$primary: $turquoise !default

$info: $blue !default
$success: $green !default
$warning: $yellow !default
$danger: $red !default

$light: $white-ter !default
$dark: $grey-darker !default
```

役割を持っている色には、役割を冠した名前をつけています。
「danger（危険）」を表す色は赤、「success（成功）」は緑などのように関連づけられています。

## 派生変数

```sass
// Invert colors
$orange-invert: findColorInvert($orange) !default
$yellow-invert: findColorInvert($yellow) !default
$green-invert: findColorInvert($green) !default
$turquoise-invert: findColorInvert($turquoise) !default
$blue-invert: findColorInvert($blue) !default
$purple-invert: findColorInvert($purple) !default
$red-invert: findColorInvert($red) !default

$primary-invert: $turquoise-invert !default
$info-invert: $blue-invert !default
$success-invert: $green-invert !default
$warning-invert: $yellow-invert !default
$danger-invert: $red-invert !default
$light-invert: $dark !default
$dark-invert: $light !default
```

[CSSフレームワーク「Bulma」のユーザー定義関数を見てみる](/bulma-functions/)で登場した`findColorInvert`関数が用いられています。
ここでは **「ある色を背景色とした時にふさわしい文字色は白か黒か」** を`findColorInvert`関数に判定させ、帰ってきた数値を`$orange-invert`のように定義しています。

もし元々の色に変更を加えても、ここの値は自動的に決定されるため、いちいち考え直して修正を加える必要がなく、機能的です。

## ベーシックカラー

```sass
// General colors
$background: $white-ter !default

$border: $grey-lighter !default
$border-hover: $grey-light !default
```

背景、ボーダーなどに用いる色は改めて名前をつけています。


## 文字色


```sass
// Text colors
$text: $grey-dark !default
$text-invert: findColorInvert($text) !default
$text-light: $grey !default
$text-strong: $grey-darker !default
```

文字色を定義しています。

## コードカラー

```sass
// Code colors
$code: $red !default
$code-background: $background !default

$pre: $text !default
$pre-background: $background !default
```

`code`や`pre`の色を管理しています。

## リンクカラー

```sass
// Link colors
$link: $primary !default
$link-invert: $primary-invert !default
$link-visited: $purple !default

$link-hover: $grey-darker !default
$link-hover-border: $grey-light !default

$link-focus: $grey-darker !default
$link-focus-border: $primary !default

$link-active: $grey-darker !default
$link-active-border: $grey-dark !default
```

CSSフレームワークでは`.is-active`のようなクラスを大量に定義することになるので、ここで変数化しておくことで呼び出しやすくなります。

## タイポグラフィ

```sass
// Typography
$family-primary: $family-sans-serif !default
$family-code: $family-monospace !default

$size-small: $size-7 !default
$size-normal: 1rem !default
$size-medium: $size-5 !default
$size-large: $size-4 !default
```

平文及びコードについての`font-family`が定義されています。
また、よく使う文字サイズについても定義されています。

## マッピング

```sass
// 4. Lists and maps

$colors: (white: ($white, $black), black: ($black, $white), light: ($light, $light-invert), dark: ($dark, $dark-invert), primary: ($primary, $primary-invert), info: ($info, $info-invert), success: ($success, $success-invert), warning: ($warning, $warning-invert), danger: ($danger, $danger-invert)) !default

$sizes: $size-1 $size-2 $size-3 $size-4 $size-5 $size-6 !default

```

後々、Sassの機能`@each`を使う時のために変数リストを定義します。
改めて`@each`の部分で説明しますが、端的に言うと、**「ここで定義した全てのパターンについてクラスを生成する」** みたいな事ができます。


## 思ったこととか
変数一つとっても様々ですね。

- 色名とカラーコードを結びつける `$blue: hsl(217, 71%,  53%) `
- 色名に名前をつける`$info: $blue !default`

という風に、複数段階に渡って変数を定義しているのが印象的でした。
`$info: hsl(217, 71%,  53%)`といきなり定義しまうと、**「もし、青をもっと暗くしたい」** というときに困るんですね。
こういう記述をしていると、あらゆる場所を書き換えていく必要が発生します。

その点、二段階に渡って変数化しておくと、`$blue: hsl(217, 71%,  53%) `の部分を編集することで、全ての`$blue`を使っている部分全てに編集を適用することができます。

他にも、一箇所変更すると、受動的に関数などを元に決定される部分もあり、 **「いい依存」** だなと私は思います。

Photoshopでいう、スマートオブジェクトをうまくつかいこなすようなイメージで、受動的に決まる部分をしっかりと作り込むことで、よりスマートなコードを書いていきたいですね。
