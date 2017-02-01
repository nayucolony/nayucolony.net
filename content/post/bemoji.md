+++

Title = "絵文字でわかるCSS設計 ~BEMとコンポーネント設計 with BEMoji~"
date = "2016-12-11T21:14:11+09:00"
slug = "bemoji"

+++


こんにちは、CSSが好きなフロントエンドエンジニアのナユです。

[絵文字 / Emoji Advent Calendar 2016](http://qiita.com/advent-calendar/2016/emoji) 11日目の記事です。<br>
（仮タイトルから内容が変わっちゃいました。すみません＞＜）

10日目の湊川あいさんとわかばちゃんコンビに続いて、絵文字でわかるシリーズです。
<!--more-->

# はじめに

コーディングをするにあたり、近年よく「コンポーネント指向のCSS設計」という言葉を耳にします。  
しかし、参考になるコード量も少なく、あったとしてもよくあるUIをコーディングしてみよう、といったものが大半です。

本稿は、「CSS設計を勉強したいけれど参考資料が少ない...」とお悩みの人に少しでもお手伝いができればと思って書かれています。  
少々難しい点があるかもしれませんが、ご質問などはコメントもしくはtwitter([@nayucolony](https://twitter.com/nayucolony))までリプライをくださいませ！

# 内容

本稿は、Emojiを用いて

- コンポーネント指向のCSS設計
- BEMを用いた命名規則

を中心に学習していくといった内容になっています。

また、Sass(scss記法)を前提としています。 Scss記法がわからないという方は、`&`がどういう役割かだけを学習して呼んでいただければと思います。

# BEMoji

せっかくですので、今回は、絵文字によるBEM、BEMojiを用います。

BEMとルールは同じですが、単語を表す部分をEmojiで表現します。 （筆者のオリジナルですので、文献を探さないでください。ありませんorz）

絵文字アドベントカレンダーということで、思いつきでやったところ動作したので今回に限り採用いたします。

対応ブラウザは未検証ですが、chrome最新版とかなら多分動くんじゃないでしょうか。

脳内で「👀 =>eyes」のように変換していただければと思います。

# コンポーネント設計 ~Block~

いきなり顔を作る前に、まずは顔の構成要素を見てみましょう。<br>
（以降、構成要素を、「コンポーネント」といったり「モジュール」「パーツ」などと呼んだりします。） BEM（及びBEMoji）では **「Block」** という単位で呼びます。

例えば、目、鼻、口のようなパーツがあります。 これらは、機能的にそれ以上分割できない要素と考えられます。 まずは、それらの一番小さな、基礎的な要素から設計を始めます。

パーツ名 | Emoji
---- | -----
目    | 👀
眉    | ➖
鼻    | 👃
口    | 👄

また、今回はOOCSSのように「classを与えることで絵文字が描画される」という作りで考えていきます。 classを付与した要素の::after擬似要素にEmojiを描画していきます。

```html
<div class="👀"></div>
```

```scss
.👀{
  &::after{
    content:"👀";
  }
}
```

鼻、口も同様です。

```html
<div class="👃"></div>
<div class="👄"></div>
```

```scss
.👃{
  &::after{
    content:"👃";
  }
}
.👄{
  &::after{
    content:"👄";
  }
}
```

# コンポーネント設計 ~modifier~

👂については正面から見て右側しかEmojiが存在しないため、`transform:rotateY(180deg)`を用いてY軸を中心に180度ひっくり返したものを左耳とします。

このように、同じblockだとしても見た目が違うものについては**modifier**として`--`で表していきます。

下記のように記述します。

```html
<div class="👂 👂--⬅️"></div>
<div class="👂"></div>
```

```scss
.👂{
  &::after {
    content: "👂";
  }

  &--⬅️ {
    transform:rotateY(180deg);
  }
}
```

これで、顔に用いるパーツを一通り定義し終えました。

# コンポーネント設計 ~Element & Block in Block~

さて、パーツができたので、続いての作業は顔面への配置です。 😶をBlockとして考えます。

今までは、blockそのものが目や鼻などのパーツとして成立していました。 しかし、😶は今まで定義してきた目や鼻などによって成り立つ、言わば構成要素を持ちます。

ここで初めてでてくるのはBlockを構成する要素を表す**Element**です。 😶にとっての👀や👃は、Elementとして考えることができます。

「さっきは全てBlockっていっていたのに、Elementなの？どういうこと？」と思われるかもしれませんが、まずは下記のコードを見てみましょう。

```html
<div class="😶">
  <div class="👂 👂--⬅️ 😶__👂⬅️"></div>
  <div class="👂 😶__👂➡️"></div>
  <div class="👀 😶__👀"></div>
  <div class="👃 😶__👃"></div>
  <div class="👄 😶__👄"></div>
</div>
```

このように、**Blockとしてのclassも持ちながら、Elementとしてのclassも持つ** という状態になります。

Elementには**「😶のパーツとして振る舞う時特有のスタイル」** を定義していきます。

下記のように記述します。

```scss
.😶{
  background: #C66D2F;
  width: 200px;
  height: 300px;
  border-radius: 50% 50% 50% 50%;
  position: relative;
  &::before { //ほっぺ
    content:"";
    width: 200px;
    height: 230px;
    border-radius: 100%;
    position: absolute;
    background: #C66D2F;
    bottom: 0;
    right: -10px;
    z-index: -1;
  }
  &::after { //ほっぺ
    content:"";
    width: 200px;
    height: 230px;
    border-radius: 100%;
    position: absolute;
    background: #C66D2F;
    bottom: 0;
    left: -10px;
    z-index: -1;
  }
  &__👀{
    position: absolute;
    font-size:6rem;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 50px;
    z-index: 1;
  }
  &__👃{
    position: absolute;
    font-size:6rem;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 50%;
    transform:translateY(-50%);
  }
  &__👄{
    position: absolute;
    font-size:6rem;
    display: flex;
    justify-content: center;
    width: 100%;
    top: 60%;
  }
  &__👂➡️{
    position: absolute;
    font-size:5rem;
    right: -45px;
    top:45px;
  }
  &__👂⬅️{
    position: absolute;
    font-size:5rem;
    left: -45px;
    top:45px;
  }
  &__➖⬅️{
    position: absolute;
    font-size:4rem;
    left: 40px;
    top:20px;
    transform:rotate(40deg);
  }
  &__➖➡️{
    position: absolute;
    font-size:4rem;
    right: 35px;
    top:25px;
    transform:rotate(-10deg);
  }
}
```

必然的に、レイアウトや文字サイズの調整に関わる部分が多くなりますね。 （Emojiは文字なので`font-size`で大きさを定義します）

以上のように、Blockの中にBlockを内包し、それらをElementとして扱うことがよくありますので覚えておきましょう。

# デモ

同様にして体、帽子なども調整したものがこれです（外部リンク）。

<!--![image](https://qiita-image-store.s3.amazonaws.com/0/100561/ee51a43b-e235-fc4c-91f5-81064959ca38.png)-->

[Mrs.Emoji - codepen](https://codepen.io/nayucolony/pen/VmBrJO/)

👣コンポーネント、👒コンポーネントが増え、さらにそれらが🍟コンポーネントのElementとして記述されています。 全て、😶コンポーネントと同様の手法でできています。 Block in Block in Blockなんてこともあるということがわかりますね。 何階層になったとしても同じです。

今回は😶や👣で例えましたが、これらは訳すと...Head,Foot。すなわち、webサイトでいうとHeaderやFooterですね。 🍟は全体を表しているので、`<body>`要素と考えれば、これもWebサイトとして見えてくる...かもしれません。

手はしっくりこなかったので付けませんでした（笑）

# まとめ

- BEMはBlock,Element,modifierの3つの要素がある。
- 記述するときは`.block__element--modifier`のように行う。
- コンポーネントは小さな割り出しから考える。
- コンポーネントが集まって、新たなコンポーネントとなるとき、その構成要素はElementとしても振る舞う。

# おわりに

コンポーネント設計に欠かせないものは、デザインを読み解くことです。 都度修正すること、スケールすることを考えると、「できてればいい」では済まなくなってきています。 コンポーネント設計をする感覚を身につけることで、修正につよいwebサイト制作を行っていきましょう！

ご質問などはコメントもしくはtwitter([@nayucolony](https://twitter.com/nayucolony))までお気軽にリプライをくださいませ！

# NEXT

[絵文字 / Emoji Advent Calendar 2016](http://qiita.com/advent-calendar/2016/emoji) 12日目の記事は[エヌユル](https://twitter.com/ncaq)さんです！
