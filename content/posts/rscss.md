+++
Title = "RSCSSとFlexboxを使ってまるっと１ページコーディングしてみた。"
date = "2016-12-12T21:14:21+09:00"

+++
自分なりの静的サイト構築をまとめます。
シチュエーション的には **「カンプが上がってきたものをコーディングする」** みたいな感じです。

今回は、**[「RSCSS」](http://rscss.io/)** という設計思想に基づいて作成していきます。
いくつかの簡単なルールがありますが、作りながら出てきたルールを書いていきます。
最後にまとめと、すべてのルールを書いたリンクをご紹介しますので、これを読む前にRSCSSを覚えてくる必要はありません。

*注意：あくまでCSS設計について考えるという点で、セマンティクスやアクセシビリティに関する完璧なことは書かれていません。もしよければ、言及いただければと思います！また、スクリーンショットを完全に再現しておらず、余白などは大きく差異の発生しない範囲で簡略化しているものもあります。*

必要な人のためにコードをすべて記述していますが、適宜読み飛ばして頂いてかまいません。
また、Sassでの利用を前提とした設計思想ですので、scss形式での記述をしています。

## まずデザイン見渡す。

デザインがあがってきて一番やってはいけないことは突然コーディングを始めることです。<br>
**「料理の本を開いて突然料理を始める」** くらいアウトです。<br>
最後まで見渡さずに突然ステップ１からはじめていくと、大抵、ステップ5くらいになって、*「ここで200°のオーブンで焼きます」* みたいなことが突然でてきて *「なにそれ材料に書いてない！うちにあるのは電子レンジだけよ！」* みたいな状態になったことはありませんか？わたしはあります。ざっと見渡せばわかったはずなのに。

そういうことを防ぐためにも、ページカンプをざっくり見渡します。
デザイナーの意図を読み取ってあげるのが大切です。
**デザイナーは意味もなく素敵デザインを追い求める芸術家ではありません。
彼らはデザイナーである以上ロジックに基づいてデザインをしています。**

例えば、_統一感を出すために意図的に使いまわされているスタイル_ なんかがあったりすることに気づくでしょう。

## ざっくり分けて考える
コーディングをするまえに、ざっくりとセクション分けをします。
分ける理由としては、以下のような理由があります。

 - 分業の目安とする
 - 作業工程の見積もりができる

私なりに分けた結果がこちらです。

![suda_layout.jpg](./img/rscss/suda_layout.jpg)

では、それぞれのセクションごとに組み込んでいきましょう。

## ヘッダー編
### 機能で分けて考える（ヘッダー）
そうです、まだ分けて考えるんです。
機能で分けた１つ１つを、RSCSSでは **「Component（コンポーネント）」** として考えます。

ここでの分け方も厳密な正解はありません。
「機能」をある程度の目安としてください。

私なりにヘッダーを機能ごとに分けた結果が次の通りです。

![suda_component.jpg](./img/rscss/suda_component.jpg)

このように、「サイトタイトル」Componentと「アイキャッチ（バナー）」Componentの二つに分けて考えます。
それぞれ別の機能を持っているもので、お互いに独立していますね。
私は、**「お互いに独立しているか？」** というのも機能で分離する目安にしています。

では、それぞれコーディングしていきます。

#### サイトタイトル
![スクリーンショット 2016-12-01 4.07.01.png](https://qiita-image-store.s3.amazonaws.com/0/100561/b9be4ccc-1c3f-12dd-4fbd-42bedf1c4fbe.png)


「サイトタイトル」Componentは以下の２パーツで構成されています。

 - ロゴ
 - サブタイトル

この構成要素をRSCSSでは **Element（エレメント）** と呼びます。
コードは次の通りです。

```html
<div class="site-title">
  <h1 class="logo">
    <a href="">
      <img src="https://placehold.jp/60x60.png" alt="" class="image"/>
    </a>
  </h1>
  <p class="description">バズる→スダる</p>
</div>
```

```
.site-title {
  >.logo {
    margin-bottom: 10px;
  }
  >.description{
    font-size: 14px;
  }
}
```

**ここで使っているRSCSSの記述ルールはこちら**

 - Componentを表す部分は単語2つを`-`でつなぐ
 - Elementにつけるclassは単語１つ
 - Componentにレイアウト用のstyleはつけない
 - 使えるものには必ず「子セレクタ`>`」を使う。

また「レイアウト用のスタイル」とは、以下のようなものとされています。

 - Positioning (`position`, `top`, `left`, `right`, `bottom`)
 - Floats (`float`, `clear`)
 - Margins (`margin`)
 - Dimensions (`width`, `height`)

但し、`width`,`height`に関しては、アバターアイコンやロゴなどはどうしても指定する必要があったりするため、必要に応じて使用を許可されています。
また、`position: relative;` についても、Elementの絶対配置に必要となる場合がありますので適宜使用してください。


では、続いて「アイキャッチ（バナー）」Componentを作成しましょう。

#### アイキャッチ（バナー）
![スクリーンショット 2016-12-01 4.07.42.png](https://qiita-image-store.s3.amazonaws.com/0/100561/6e7a6e35-986d-37fa-7ea9-abac789a5363.png)


```
<div class="hero-banner"></div>
```

```
.hero-banner {
  width: 100%;
  height: 400px;
  background-image: url(https://placehold.jp/1100x500.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
```

このように、Elementを持たないComponentもあります。
ここでは高さを固定し、背景画像にバナーを設定しています。

では、それぞれのComponentを配置する作業に移りましょう。

### 機能で分けたものをレイアウト（共通ヘッダー）

共通ヘッダー内の二つのコンポーネントをレイアウトします。
その時は「共通ヘッダー」Componentを考えます。
先ほど作った「サイトタイトル」Componentと「アイキャッチ（バナー）」Componentは構成要素、すなわちElementとして考えます。

```
<div class="common-header">
  <div class="site-title top"> //topを付与
    <h1 class="logo">
      <a href="">
        <img src="https://placehold.jp/60x60.png" alt=""/>
      </a>
    </h1>
    <p class="description">バズる→スダる</p>
  </div>
  <div class="hero-banner banner"></div> //bannerを付与
</div>
```

```
.common-header {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  >.top {
    margin-bottom: 10px;
  }
  >.banner{/**/} //※記述なし、省略化
}
```

もしくはSassの`@extend`を用いて以下のようにもできます。


```
<div class="common-header">
  <div class="top">  //*もともとあった.site-titleを削除
    <h1 class="logo">
      <a href="">
        <img src="https://placehold.jp/60x60.png" alt=""/>
      </a>
    </h1>
    <p class="description">バズる→スダる</p>
  </div>
  <div class="banner"></div> //もともとあった.hero-bannerを削除
</div>
```

```
@import .site-title;
@import .hero-banner;

.common-header {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  >.top {
    @extend .site-title
    margin-bottom: 10px;
  }
  >.banner{
    @extend .hero-banner
  }
}
```
お好みの運用を選んでいきましょう。僕は前者の方が好きです。
今後はこの記事では前者による記述を行っていきます。


## フッター編
### 機能で分けて考える（フッター）
![suda_footer.jpg](https://qiita-image-store.s3.amazonaws.com/0/100561/466612c4-9741-0191-6a8a-f7a7c5d11ef7.jpeg)

#### サイトタイトル
![スクリーンショット 2016-12-01 4.08.51.png](https://qiita-image-store.s3.amazonaws.com/0/100561/f4a60b0d-e99c-5418-e7ee-0176327d0ff7.png)

よく見ると、「サイトタイトル」Componentは「共通ヘッダー」のものと見た目が少し違うことがわかりますね。
ここは、以下のようにしましょう。

```
<div class="site-heading -center"> //-centerを付与
  <h1 class="logo">
    <a href="">
      <img src="https://placehold.jp/150x150.png" alt=""/>
    </a>
  </h1>
  <p class="description">バズる→スダる</p>
</div>
```

```css
.site-title {
  >.logo {
    margin-bottom: 10px;
  }
  >.description{
    font-size: 14px;
  }
  &.-center{                  //
    display: flex;            //
    flex-direction: column;   //追加記述
    align-items: center;      //
  }                           //
}
```

`-center`のように、見た目違いを表す`-`で始まるclassを「Variants」と言います。
`site-title.scss`に記述を追加しました。
最近話題のFlexboxを使って中央揃えレイアウトをしてみました。

#### コピーライト
![スクリーンショット 2016-12-01 4.09.25.png](https://qiita-image-store.s3.amazonaws.com/0/100561/0f4ee22e-725a-ec62-a6a9-6bd54b03c209.png)


```
<p class="copyright-block">
  Copyright© スダ部, 2016 All Rights Reserved.powered by STINGER
</p>
```

```
.copyright-block {
  line-height: 1.5;
  font-size: 12px;
}
```
RSCSSのルール「Componentを表す部分は単語2つを`-`でつなぐ」のために２単語が思いつかないときは
ブロック要素なら

- alert-box
- alert-card
- alert-block

インライン要素なら

- link-button
- link-span

などのような表し方を推奨されています。

### 機能で分けたものをレイアウト（フッター）

ヘッダー同様、作成したComponentをElementとして考えていきます。

```
<div class="common-footer">
  <div class="site-title -center title">
    <h1 class="logo">
      <a href="">
        <img src="https://placehold.jp/６0x６0.png" alt=""/>
      </a>
    </h1>
    <p class="description">バズる→スダる</p>
  </div>
  <p class="copyright-block　copyright">
    Copyright© スダ部 , 2016 All Rights Reserved.powered by STINGER
  </p>
</div>
```

```
.common-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  >.title {
    margin-bottom: 20px;
  }
  >.copyright {/**/} //記述なし、省略化
}
```

## サイドバー編
### 機能で分けて考える（サイドバー）

Componentに分けてみるとこんな感じになりました。

![suda_sidebar.jpg](https://qiita-image-store.s3.amazonaws.com/0/100561/b5522c21-d6db-0420-5e28-dabcb6154d46.jpeg)

#### プロフィールカード

![suda_sidebar_profile.jpg](https://qiita-image-store.s3.amazonaws.com/0/100561/ce6915b7-ab6d-e990-61c7-15b90f20f765.jpeg)

内容的にいろいろ突っ込みどころの多いプロフィールComponentですが作成しましょう。
（twitterのフォローボタンについてはtwitter側で生成するページがあるので割愛します）

```
<div class="profile-card">
  <p class="title">スダシュウゴのプロフィール</p>
  <img src="https://placehold.jp/300x300.png" alt="" />
  <p class="name">スダシュウゴ</p>
  <p class="twitter"><!--ココにツイッターのボタンのコード--></p>
  <p class="description">
    茨城県を中心に活動しているフリーのWebデザイナー。おっぱいへの執着心が強い。<br>
    <a href="">『コソアドデザイン』</a>代表
  </p>
</div>
```

```
.profile-card {
  padding: 40px 15px 10px;
  position: relative;
  background: white;
  >.title {
    padding: 3px 20px;
    background: #13b0fc;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
  }
  >.image {
    flex-grow: 0;
  }
  >.name {
    font-size: 20px;
    line-height: 2;
  }
  >.description {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.6;
  }
}
```

ここではComponentに`position: relative`を指定していますが、Element配置に使用しているため問題ありません。

#### 問い合わせボタン
![スクリーンショット 2016-12-01 4.10.10.png](https://qiita-image-store.s3.amazonaws.com/0/100561/94d775ea-df94-19f0-f027-e4f0f682c6ea.png)


`fa fa-envelope`は「fontawesome」に使用するclassです。`aria-hidden="true"`はスクリーンリーダから見えなくするための記述で、説明は割愛します。

```
<a href="" class="basic-button">
  <i class="icon fa fa-envelope" aria-hidden="true"></i>
  <span class="label">お問い合わせはコチラ！</span>
</a>
```

```
.basic-button {
  display: flex;
  padding: 10px 15px;
  color: white;
  align-items: center;
  background: #dd8500;
  >.icon {
    padding-right: 10px;
    border-right:1px solid white;
    margin-right: 10px;
    width: 20px;
  }
  >.label {
    text-decoration: none;
    font-weight: bold;
  }
}
```

#### 人気の記事リスト

![suda_sidebar_articlelist.jpg](https://qiita-image-store.s3.amazonaws.com/0/100561/6b64b33e-51ef-f858-0f77-081c0e463f08.jpeg)
記事カードそのものが１つの機能をもつComponentで、リストはその集合体と考えるのが良さそうですね。

記事カード単体のコードは次の通りです。

```
<div class="article-card">
  <a href="" class="thumbnail">
    <img src="https://placehold.jp/300x300.png" alt="" />
  </a>
  <div class="metabox">
    <a href="" class="title">
      <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
    </a>
    <p class="count">24 views</p>
  </div>
</div>
```

```
.article-card {
  display: flex;
  >.metabox {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  >.metabox >.title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  >.metabox >.count {
    font-size: 10px;
  }
}

```

RSCSSの推奨事項として、Sassで書く時のネスト階層は２段階までに抑えるというものがあります。
なので、上記のようにあえてネストを避けた記述をしています。

また、Elementの命名ルールに従い`.meta-box`のようにしたいところを`.metabox`のように１単語にくっつけています。

人気の記事リスト全体のコードは次の通りです。

```
<div class="hot-articles">
  <p class="heading">人気の記事</p>
  <ul class="list">
    <li class="article-card">
      <a href="" class="thumbnail">
        <img src="https://placehold.jp/300x300.png" alt="" />
      </a>
      <div class="metabox">
        <a href="" class="title">
          <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
        </a>
        <p class="count">24 views</p>
      </div>
    </li>
    <li class="article-card">
      <a href="" class="thumbnail">
        <img src="https://placehold.jp/300x300.png" alt="" />
      </a>
      <div class="metabox">
        <a href="" class="title">
          <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
        </a>
        <p class="count">24 views</p>
      </div>
    </li>
    <li class="article-card">
      <a href="" class="thumbnail">
        <img src="https://placehold.jp/300x300.png" alt="" />
      </a>
      <div class="metabox">
        <a href="" class="title">
          <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
        </a>
        <p class="count">24 views</p>
      </div>
    </li>
  </ul>
</div>
```

```
.hot-articles {
  >.heading {
    font-weight: bold;
    line-height: 2;
  }
  >.list {
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
}
```

最初、記事カード単品を`<div>`で書いていたのに、リストでは`<li>`になっていることにお気付きですか？
このように、すべてclassでの運用を行っているため、要素を変更することができるのです。
これはすべてclassで運用している利点でもあります。

また、今回はセマンティクスを無視したマークアップをしていますが、適宜`<div>`を`<section>`や`<header>`、`<footer>`などに変えても問題ありません。classセレクタのみで運用することで要素の変更にも強いCSSになります。

### 機能で分けたものをレイアウト
ヘッダー、フッターと同様に、サイドバーComponentを考えます。
コードは下記のようになります。

```
<div class="side-section">
  <div class="profile profile-card">
    <p class="title">スダシュウゴのプロフィール</p>
    <img src="https://placehold.jp/300x300.png" alt="" />
    <p class="name">スダシュウゴ</p>
    <p class="twitter">...</p>
    <p class="description">
      茨城県を中心に活動しているフリーのWebデザイナー。おっぱいへの執着心が強い。<br>
      <a href="">「コソアドデザイン」</a>代表
    </p>
  </div>

  <a href="" class="contact basic-button -contact">
    <i class="icon fa fa-envelope" aria-hidden="true"></i>
    <span class="label">お問い合わせはコチラ！</span>
  </a>

  <div class="hot hot-articles">
    <p class="heading">人気の記事</p>
    <ul class="list">
      <li class="article-card">
        <a href="" class="thumbnail">
          <img src="https://placehold.jp/300x300.png" alt="" />
        </a>
        <div class="metabox">
          <a href="" class="title">
            <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
          </a>
          <p class="count">24 views</p>
        </div>
      </li>
      <li class="article-card">
        <a href="" class="thumbnail">
          <img src="https://placehold.jp/300x300.png" alt="" />
        </a>
        <div class="metabox">
          <a href="" class="title">
            <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
          </a>
          <p class="count">24 views</p>
        </div>
      </li>
      <li class="article-card">
        <a href="" class="thumbnail">
          <img src="https://placehold.jp/300x300.png" alt="" />
        </a>
        <div class="metabox">
          <a href="" class="title">
            <p>24歳スダシュウゴ、茨城でフリーランスはじめるってよ</p>
          </a>
          <p class="count">24 views</p>
        </div>
      </li>
    </ul>
  </div>
</div>
```

```scss
.side-section {
  display: flex;
  flex-direction: column;
  >.profile {
    margin-bottom: 20px;
  }
  >.contact {
    margin-bottom: 20px;
  }
}
```




## メイン編

もう慣れてきましたか？
最後のセクションです。
![suda_layout_main.jpg](https://qiita-image-store.s3.amazonaws.com/0/100561/7c07b154-c495-fca8-6cf8-ab707c9f78eb.jpeg)

### 機能で分けて考える（メイン編）


#### ページネーション

![スクリーンショット 2016-12-01 4.06.27.png](https://qiita-image-store.s3.amazonaws.com/0/100561/1ebbd788-5f77-c817-25d4-a1ae3b0b1134.png)


```
<ol class="pagination-link">
  <li class="number -current">
    1
  </li>
  <li class="number">
    <a href="" class="link">2</a>
  </li>
  <li class="number">
    <a href="" class="link">3</a>
  </li>
  <li class="next">
    <a href="" class="link">next >></a>
  </li>
</ol>
```

```
.pagination-link {
  list-style-type: none;
  padding: 20px 0;
  display: flex;
  align-items: baseline;
  > .number,.next {
    border: 1px solid #ccc;
    padding: 5px 8px;
    font-size: 13px;
    text-transform: capitalize;
    &.-current {
      font-size: 16px;
    }
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
  .link {
    text-decoration: none;
  }
}
```
`-current`のように、VariantがElementについています。
**Variantは、Elementにもつけることができます。**

RSCSSに直接関係するものではありませんが **`:not(:last-child)`** という擬似クラスに注目してください。
これは、**「最後の子要素以外」** を表しています。
今までは、すべての要素にstyleを指定したあと`:last-child`に打ち消しスタイルを当てていたことが多いかと思いますが、この記述だけでスマートに表現できます。


#### 記事カード
![スクリーンショット 2016-12-01 4.12.11.png](https://qiita-image-store.s3.amazonaws.com/0/100561/62331fe9-6a85-46aa-8871-babb2cd34e05.png)


記事カードですが、これはサイドバーの記事カード単品Componentに投稿日とタグが増え、タイトルの装飾が変わったものですね。
これを全く別コンポーネントと解釈するか、見た目違いと解釈するかは人次第ですが、私だったらここは見た目違いと考えます！

`article-cards`にElementを追加し、`.title`はVariantsで調整をかけましょう。
また、レイアウト用コンポーネントとして`.row-items`を作成しました。

```
.article-card {
  display: flex;
  >.metabox {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  >.metabox >.title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  >.metabox >.count {
    font-size: 10px;
  }
  >.metabox >.time {
    font-size: 14px;
    margin-right: 10px;
  }  
  >.metabox >.layout-row {
    display: flex;
    align-items: baseline;
  }
  .categoryicon,.tagicon,.timeicon {
    margin-right: 10px;
  }
  .categoryitem,.tagitem {
    text-decoration: none;
    font-size: 12px;
    color:#666 ;
  }
  &.-large >.metabox >.title {
      text-decoration: none;
      font-weight: bold;
      color: #333;
  }
}
```
今回の例だと、ネストが深くなりすぎるので追加したElementはComponent化したほうがいいかもしれません。

あとはこのカードたちを並べましょう。
`:not(:last-child)`を使って最後のアイテム以外に破線ボーダーを加えたらよさそうですね。

```
<ul class="article-list">
  <li class="item article-card -large">
    <a href="" class="thumbnail">
      <img src="https://placehold.jp/300x300.png" alt="" />
    </a>
    <div class="metabox">
      <a href="" class="title">
          24歳スダシュウゴ、茨城でフリーランスはじめるってよ
        </a>
      <div class="layout-row">
        <p class="time">
          <i class="timeicon fa fa-clock-o" aria-hidden="true"></i>2016/12/1</p>
        <p class="category">
          <i class="categoryicon fa fa-folder-open-o" aria-hidden="true"></i><a href="" class="categoryitem">日記</a>
        </p>
      </div>
      <p class="tags">
        <i class="tagicon fa fa-tags" aria-hidden="true"></i><a href="" class="tagitem">タグ１</a>,<a href="" class="tagitem">タグ2</a></p>
    </div>
  </li>
  <li class="item article-card -large">
    <a href="" class="thumbnail">
      <img src="https://placehold.jp/300x300.png" alt="" />
    </a>
    <div class="metabox">
      <a href="" class="title">
          24歳スダシュウゴ、茨城でフリーランスはじめるってよ
        </a>
      <div class="layout-row">
        <p class="time">
          <i class="timeicon fa fa-clock-o" aria-hidden="true"></i>2016/12/1</p>
        <p class="category">
          <i class="categoryicon fa fa-folder-open-o" aria-hidden="true"></i><a href="" class="categoryitem">日記</a>
        </p>
      </div>
      <p class="tags">
        <i class="tagicon fa fa-tags" aria-hidden="true"></i><a href="" class="tagitem">タグ１</a>,<a href="" class="tagitem">タグ2</a></p>
    </div>
  </li>
  <li class="item article-card -large">
    <a href="" class="thumbnail">
      <img src="https://placehold.jp/300x300.png" alt="" />
    </a>
    <div class="metabox">
      <a href="" class="title">
          24歳スダシュウゴ、茨城でフリーランスはじめるってよ
        </a>
      <div class="layout-row">
        <p class="time">
          <i class="timeicon fa fa-clock-o" aria-hidden="true"></i>2016/12/1</p>
        <p class="category">
          <i class="categoryicon fa fa-folder-open-o" aria-hidden="true"></i><a href="" class="categoryitem">日記</a>
        </p>
      </div>
      <p class="tags">
        <i class="tagicon fa fa-tags" aria-hidden="true"></i><a href="" class="tagitem">タグ１</a>,<a href="" class="tagitem">タグ2</a></p>
    </div>
  </li>
</ul>
```

```
.article-list {
  >.item:not(:last-child) {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px #ccc dotted;
    }
  }
}

```


#### シェアボタン
![スクリーンショット 2016-12-01 4.13.16.png](https://qiita-image-store.s3.amazonaws.com/0/100561/b96a2331-8447-5fd5-e621-9bd8797e0b05.png)


これらは問い合わせボタンの色違いアイコン違いですね。
Variantsで`background`を変更すると早そうです。
一気にリストのComponentまで作ってしまいましょう。

```

<ul class="sns-share">
  <li>
    <a href="" class="basic-button -twitter">
      <i class="icon fa fa-envelope" aria-hidden="true"></i>
      <span class="label">Twitter</span>
    </a>
  </li>
  <li>
    <a href="" class="basic-button -facebook">
      <i class="icon fa fa-envelope" aria-hidden="true"></i>
      <span class="label">Facebook</span>
    </a>
  </li>
  <li>
    <a href="" class="basic-button -line">
      <i class="icon fa fa-envelope" aria-hidden="true"></i>
      <span class="label">LINE</span>
    </a>
  </li>
  <li>
    <a href="" class="basic-button -hatebu">
      <i class="icon fa fa-envelope" aria-hidden="true"></i>
      <span class="label">はてブ</span>
    </a>
  </li>
  <li>
    <a href="" class="basic-button -google">
      <i class="icon fa fa-envelope" aria-hidden="true"></i>
      <span class="label">Google+</span>
    </a>
  </li>
  <li>
    <a href="" class="basic-button -pocket">
      <i class="icon fa fa-envelope" aria-hidden="true"></i>
      <span class="label">Pocket</span>
    </a>
  </li>
</ul>
```

```
.basic-button {
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  color: white;
  align-items: center;
  &.-contact {
    background: #dd8500;
  }
  &.-twitter {
    background: #55acee;
  }
  &.-facebook {
    background: #3b5998;
  }
  &.-google {
    background: #dc4e41;
  }
  &.-pocket {
    background: #f03e51;
  }
  &.-hatebu {
    background: #00a5de;
  }
  &.-line {
    background: #25af00;
  }
  >.icon {
    padding-right: 10px;
    border-right: 1px solid white;
    margin-right: 10px;
    width: 20px;
  }
  >.label {
    font-weight: bold;
  }
}
```

```
.sns-share {
  display: flex;
  padding: 0;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: space-between;
  li{
    width: calc(100%/3 - 10px);
    &:nth-child(-n+3){
      margin-bottom: 10px;
    }
  }
}
```

これでメインコンテンツのすべてのコンポーネントが出揃いました。
あとは、メインセクションComponent内に配置しましょう。

### 機能で分けたものをレイアウト（メイン）

```
<div class="main-section">
  <ul class="article-list articles">
    <li class="item article-card -large">
      <a href="" class="thumbnail">
        <img src="https://placehold.jp/100x100.png" alt="" />
      </a>
      <div class="metabox">
        <a href="" class="title">
      24歳スダシュウゴ、茨城でフリーランスはじめるってよ
    </a>
        <div class="layout-row">
          <p class="time">
            <i class="timeicon fa fa-clock-o" aria-hidden="true"></i>2016/12/1</p>
          <p class="category">
            <i class="categoryicon fa fa-folder-open-o" aria-hidden="true"></i><a href="" class="categoryitem">日記</a>
          </p>
        </div>
        <p class="tags">
          <i class="tagicon fa fa-tags" aria-hidden="true"></i><a href="" class="tagitem">タグ１</a>,<a href="" class="tagitem">タグ2</a></p>
      </div>
    </li>
    <li class="item article-card -large">
      <a href="" class="thumbnail">
        <img src="https://placehold.jp/100x100.png" alt="" />
      </a>
      <div class="metabox">
        <a href="" class="title">
      24歳スダシュウゴ、茨城でフリーランスはじめるってよ
    </a>
        <div class="layout-row">
          <p class="time">
            <i class="timeicon fa fa-clock-o" aria-hidden="true"></i>2016/12/1</p>
          <p class="category">
            <i class="categoryicon fa fa-folder-open-o" aria-hidden="true"></i><a href="" class="categoryitem">日記</a>
          </p>
        </div>
        <p class="tags">
          <i class="tagicon fa fa-tags" aria-hidden="true"></i><a href="" class="tagitem">タグ１</a>,<a href="" class="tagitem">タグ2</a></p>
      </div>
    </li>
    <li class="item article-card -large">
      <a href="" class="thumbnail">
        <img src="https://placehold.jp/100x100.png" alt="" />
      </a>
      <div class="metabox">
        <a href="" class="title">
      24歳スダシュウゴ、茨城でフリーランスはじめるってよ
    </a>
        <div class="layout-row">
          <p class="time">
            <i class="timeicon fa fa-clock-o" aria-hidden="true"></i>2016/12/1</p>
          <p class="category">
            <i class="categoryicon fa fa-folder-open-o" aria-hidden="true"></i><a href="" class="categoryitem">日記</a>
          </p>
        </div>
        <p class="tags">
          <i class="tagicon fa fa-tags" aria-hidden="true"></i><a href="" class="tagitem">タグ１</a>,<a href="" class="tagitem">タグ2</a></p>
      </div>
    </li>
  </ul>

  <ol class="pagination-link pagination">
    <li class="number -current">
      1
    </li>
    <li class="number">
      <a href="" class="link">2</a>
    </li>
    <li class="number">
      <a href="" class="link">3</a>
    </li>
    <li class="next">
      <a href="" class="link">next >></a>
    </li>
  </ol>
  <ul class="sns-share share">
    <li>
      <a href="" class="basic-button -twitter">
        <i class="icon fa fa-twitter" aria-hidden="true"></i>
        <span class="label">Twitter</span>
      </a>
    </li>
    <li>
      <a href="" class="basic-button -facebook">
        <i class="icon fa fa-facebook" aria-hidden="true"></i>
        <span class="label">Facebook</span>
      </a>
    </li>
    <li>
      <a href="" class="basic-button -line">
        <i class="icon fa fa-comment" aria-hidden="true"></i>
        <span class="label">LINE</span>
      </a>
    </li>
    <li>
      <a href="" class="basic-button -hatebu">
        <span class="icon" aria-hidden="true">B!</span>
        <span class="label">はてブ</span>
      </a>
    </li>
    <li>
      <a href="" class="basic-button -google">
        <i class="icon fa fa-google-plus" aria-hidden="true"></i>
        <span class="label">Google+</span>
      </a>
    </li>
    <li>
      <a href="" class="basic-button -pocket">
        <i class="icon fa fa-get-pocket" aria-hidden="true"></i>
        <span class="label">Pocket</span>
      </a>
    </li>
  </ul>

</div>

```


```
.main-section {
  padding: 30px 50px;
  background: white;
}
```

## セクションをページ内に配置する

一番最初に４つに分けたセクションが出揃いました。
あとはこれらをページ内に配置するだけです。

方針としては、サイドバーとメインエリアを左右に並べるための`.content-section`というComponentを挟んでレイアウトをしていきます。

```
<div class="all-wrap">
  <div class="common-header">
    <div class="site-title top">
      <h1 class="logo">
        <a class="link" href=""><img alt="" class="image" src="https://placehold.jp/60x60.png"></a>
      </h1>
      <p class="description">
        バズる→スダる
      </p>
    </div>
    <div class="hero-banner banner"></div>
  </div>
  <div class="content-section">
    <div class="main-section">
      <ul class="article-list">
        <li class="item article-card -large">
          <a class="thumbnail" href=""><img alt="" src="https://placehold.jp/100x100.png"></a>
          <div class="metabox">
            <a class="title" href="">24歳スダシュウゴ、茨城でフリーランスはじめるってよ</a>
            <div class="layout-row">
              <p class="time">
                <i aria-hidden="true" class="timeicon fa fa-clock-o"></i>2016/12/1
              </p>
              <p class="category">
                <i aria-hidden="true" class="categoryicon fa fa-folder-open-o"></i><a class=
                "categoryitem" href="">日記</a>
              </p>
            </div>
            <p class="tags">
              <i aria-hidden="true" class="tagicon fa fa-tags"></i><a class="tagitem" href=
              "">タグ１</a>,<a class="tagitem" href="">タグ2</a>
            </p>
          </div>
        </li>
        <li class="item article-card -large">
          <a class="thumbnail" href=""><img alt="" src="https://placehold.jp/100x100.png"></a>
          <div class="metabox">
            <a class="title" href="">24歳スダシュウゴ、茨城でフリーランスはじめるってよ</a>
            <div class="layout-row">
              <p class="time">
                <i aria-hidden="true" class="timeicon fa fa-clock-o"></i>2016/12/1
              </p>
              <p class="category">
                <i aria-hidden="true" class="categoryicon fa fa-folder-open-o"></i><a class=
                "categoryitem" href="">日記</a>
              </p>
            </div>
            <p class="tags">
              <i aria-hidden="true" class="tagicon fa fa-tags"></i><a class="tagitem" href=
              "">タグ１</a>,<a class="tagitem" href="">タグ2</a>
            </p>
          </div>
        </li>
        <li class="item article-card -large">
          <a class="thumbnail" href=""><img alt="" src="https://placehold.jp/100x100.png"></a>
          <div class="metabox">
            <a class="title" href="">24歳スダシュウゴ、茨城でフリーランスはじめるってよ</a>
            <div class="layout-row">
              <p class="time">
                <i aria-hidden="true" class="timeicon fa fa-clock-o"></i>2016/12/1
              </p>
              <p class="category">
                <i aria-hidden="true" class="categoryicon fa fa-folder-open-o"></i><a class=
                "categoryitem" href="">日記</a>
              </p>
            </div>
            <p class="tags">
              <i aria-hidden="true" class="tagicon fa fa-tags"></i><a class="tagitem" href=
              "">タグ１</a>,<a class="tagitem" href="">タグ2</a>
            </p>
          </div>
        </li>
      </ul>
      <ol class="pagination-link">
        <li class="number -current">1
        </li>
        <li class="number">
          <a class="link" href="">2</a>
        </li>
        <li class="number">
          <a class="link" href="">3</a>
        </li>
        <li class="next">
          <a class="link" href="">next &gt;&gt;</a>
        </li>
      </ol>
      <ul class="sns-share">
        <li>
          <a class="basic-button -twitter" href=""><i aria-hidden="true" class=
          "icon fa fa-twitter"></i> <span class="label">Twitter</span></a>
        </li>
        <li>
          <a class="basic-button -facebook" href=""><i aria-hidden="true" class=
          "icon fa fa-facebook"></i> <span class="label">Facebook</span></a>
        </li>
        <li>
          <a class="basic-button -line" href=""><i aria-hidden="true" class=
          "icon fa fa-comment"></i> <span class="label">LINE</span></a>
        </li>
        <li>
          <a class="basic-button -hatebu" href=""><span aria-hidden="true" class="icon">B!</span>
          <span class="label">はてブ</span></a>
        </li>
        <li>
          <a class="basic-button -google" href=""><i aria-hidden="true" class=
          "icon fa fa-google-plus"></i> <span class="label">Google+</span></a>
        </li>
        <li>
          <a class="basic-button -pocket" href=""><i aria-hidden="true" class=
          "icon fa fa-get-pocket"></i> <span class="label">Pocket</span></a>
        </li>
      </ul>
    </div>
    <div class="side-section">
      <div class="profile profile-card">
        <p class="title">
          スダシュウゴのプロフィール
        </p><img alt="" src="https://placehold.jp/300x300.png">
        <p class="name">
          スダシュウゴ
        </p>
        <p class="twitter">
          ...
        </p>
        <p class="description">
          茨城県を中心に活動しているフリーのWebデザイナー。おっぱいへの執着心が強い。<br>
          <a href="">「コソアドデザイン」</a>代表
        </p>
      </div><a class="contact basic-button -contact" href=""><i aria-hidden="true" class=
      "icon fa fa-envelope"></i> <span class="label">お問い合わせはコチラ！</span></a>
      <div class="hot hot-articles">
        <p class="heading">
          人気の記事
        </p>
        <ul class="list">
          <li class="article-card">
            <a class="thumbnail" href=""><img alt="" src="https://placehold.jp/300x300.png"></a>
            <div class="metabox">
              <a class="title" href="">
              <p>
                24歳スダシュウゴ、茨城でフリーランスはじめるってよ
              </p></a>
              <p class="count">
                24 views
              </p>
            </div>
          </li>
          <li class="article-card">
            <a class="thumbnail" href=""><img alt="" src="https://placehold.jp/300x300.png"></a>
            <div class="metabox">
              <a class="title" href="">
              <p>
                24歳スダシュウゴ、茨城でフリーランスはじめるってよ
              </p></a>
              <p class="count">
                24 views
              </p>
            </div>
          </li>
          <li class="article-card">
            <a class="thumbnail" href=""><img alt="" src="https://placehold.jp/300x300.png"></a>
            <div class="metabox">
              <a class="title" href="">
              <p>
                24歳スダシュウゴ、茨城でフリーランスはじめるってよ
              </p></a>
              <p class="count">
                24 views
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="common-footer">
    <div class="site-title -center logo">
      <h1 class="logo">
        <a class="link" href=""><img alt="" class="image" src="https://placehold.jp/60x60.png"></a>
      </h1>
      <p class="description">
        バズる→スダる
      </p>
    </div>
    <p class="copyright-block">
      Copyright© スダ部 , 2016 All Rights Reserved.powered by STINGER
    </p>
  </div>
</div>
```

```
.content-section {
  display: flex;
  justify-content: center;
  >.main-section {
    flex-basis: 740px;
    margin-right: 20px;
  }
  >.side-section {
    flex-basis: 320px;
  }
}
```

仕上げに全体の調整をします。

```
.all-wrap {
  width: 1080px;
  margin: 0 auto;
  >.header {
    margin-bottom: 10px;
  }

  >.main {
    margin-bottom: 10px;
  }
}
```


以上でコーディングが終了しました。

## まとめ

 - コンポーネント(Component) で考える。名前付けは2単語で。( .screenshot-image )
 - コンポーネントは 要素(Element) を持つ。名前付けは1単語で。( .blog-post .title )
 - バリアント(Variant) の名前はダッシュを接頭辞（プレフィックス）としてつける ( .shop-banner.-with-icon )
 - コンポーネントはネストしていい
 - 物事をシンプルにするために拡張していいことを覚えておいて。

[RSCSSというCSS設計について](http://qiita.com/kk6/items/760efba180ec526903db)より引用
（公式ガイドラインの和訳をされています。本記事でRSCSSに興味を持たれた方はご一読ください。）


## 参考リンク
サンプルページは茨城のフリーランスデザイナー/カメラマンのスダシュウゴ氏のページを使用させていただきました。
[スダ部](http://sudabu.xyz/)
[コソアドデザイン](http://sudare.xyz/)

公式ガイドライン
[RSCSS.io](http://rscss.io/)
[RSCSSというCSS設計について](http://qiita.com/kk6/items/760efba180ec526903db)

## 最後に
この記事は [スダ Advent Calendar](http://www.adventar.org/calendars/1551) 1日目の記事です。
CSS設計に迷える人達に少しでも手助けになれればいいなと思います。
最後までお読みいただきありがとうございました。
