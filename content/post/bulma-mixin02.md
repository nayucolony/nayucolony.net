+++
title = "bulma mixin02"
date = "2017-01-27T01:08:27+09:00"
Title = "CSSフレームワーク「Bulma」のmixinを眺める その2"
tags = ["",""]
slug = ""
image = "/images/bulma/bulma.jpg"
+++

このエントリでは、CSSフレームワーク「Bulma」の`mixin.sass`のうち、`@media`に関する部分を見ていきます。  
レスポンシブウェブサイトの運用のキーになる`@media`、フレームワーク上ではどのように使われているのでしょう。

<!--more-->

## Responsiveness

```scss
// Responsiveness

$tablet: 769px !default;
$desktop: 1000px !default; // 960px container + 40px
$widescreen: 1192px !default; // 1152px container + 40
// 960 and 1152 have been chosen because
// they are divisible by both 12 and 16
```

画面幅の定義を行っています。

- `769px`をタブレット
- `1000px`をデスクトップ（960pxと余裕幅40px）
- `1192px`を横幅の広いスクリーン（1152pxと余裕幅40px）

スマートフォンをターゲットにしたものが存在していないようです。
「スマホ・タブレット・PC」とスタイルが変わっていくものがおおいですが
「タブレット・PC・高解像度PC」とスタイルが変わっていくのですね。
このあたりは、出回っているデバイスの高解像度化にならったものでしょうか。

`960`及び`1152`は12及び16の倍数でデザイン的に採用されやすい数値なので採用されているっぽいです。

BulmaはモバイルファーストのCSSフレームワークなので、明示的にmobileというサイズは存在しません。デフォルトなので。
769px以上を「tablet」としています。よって0~768pxがモバイルサイズです。この中にiPadが含まれるので注意です。

## from

```scss
@mixin from($device) {
  @media screen and (min-width: $device) {
    @content  
  }
}
```

値を投げると「~~px以上のとき」を指定できる。  
CSSをモバイルファーストで記述していく場合に使うことが多いでしょう。  
デフォルトのスタイルはスマートフォンサイト向けに記述し、Media Queriesで画面幅が大きくなった時のスタイルを記述します。

例えば`@include from($tablet)`のようにした場合
「769px以上」の画面幅のデバイス向けのスタイルを記述することになります。
つまり「PC」向けのスタイルを記述することになりますね。




## until

```scss
@mixin until($device) {
  @media screen and (max-width: $device - 1px) {
    @content  
  }
}
```

値を投げると「〜〜px以下のとき」を指定できる。
こちらは`from`とは逆に、PCファーストで記述していく場合に使うことが多いです。

例えば`$tablet`が`769px`なので、1を引いて`max-width`は`768px`。
`@include until($tablet)`で記述した場合、スタイルは横幅768pxまで有効になります。
iPad幅ですね。


## mobile

```scss
@mixin mobile {
  @media screen and (max-width: $tablet - 1px) {
    @content    
  }
}
```
一つ前の`@include until($tablet)`と同じ動きになります。
mobile幅まで有効なスタイルです。

## tablet

```scss
@mixin tablet {
  @media screen and (min-width: $tablet) {
    @content    
  }
}
```
横幅769px以上で有効になるスタイルです。
iPadが含まれません。Bulmaのブレークポイント的には、iPadはmobileに含んでしまうようです。

## tablet-only

```scss
@mixin tablet-only {
  @media screen and (min-width: $tablet) and (max-width: $desktop - 1px) {
    @content    
  }
}
```


タブレット以上デスクトップ未満、すなわちタブレットのみで適用されるスタイルです。
数値で言うと、769px~999px。

## touch

```scss
@mixin touch {
  @media screen and (max-width: $desktop - 1px) {
    @content    
  }
}
```
デスクトップ未満で適用される。0~999px。
タッチデバイス = スマホとタブレット。

## desktop

```scss
@mixin desktop {
  @media screen and (min-width: $desktop) {
    @content    
  }
}
```

デスクトップ以上、すなわちデスクトップ。
数値で言うと、1000px以上。


## desktop-only

```scss
@mixin desktop-only {
  @media screen and (min-width: $desktop) and (max-width: $widescreen - 1px) {
    @content    
  }
}
```

デスクトップ以上、ワイドスクリーン未満、すなわちデスクトップオンリー。
1000px~1199px。

## widescreen

``` scss
@mixin widescreen {
  @media screen and (min-width: $widescreen) {
    @content    
  }
}
```

ワイドスクリーンサイズ以上。1200px以上。


## 思ったこととか

BulmaはiPadをmobileに含めているという点が気になりました。  
他のCSSフレームワークだと、768pxをブレークポイントにしているものもあるので、ここは注意点でもあるのかな思っています。

思想がモバイルファーストなので、モバイル端末向けのデザインから行っていく場合、iPadのことも考えないといけませんね。
