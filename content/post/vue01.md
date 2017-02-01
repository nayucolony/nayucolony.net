+++

Title = "Vue.jsをはじめてみる#1 ~公式ガイドを読む編~"
date = "2016-12-12T20:40:55+09:00"

+++


## はじめに
CSSがすきなフロントエンドエンジニアのナユです。
[フロントエンドエンジニア Advent Calendar 2016](http://qiita.com/advent-calendar/2016/frontend-engineers) 12日目の記事です。

私はCSSがすきですが、フロントエンドエンジニアを名乗る以上はしっかりとしたJavaScriptがかける必要があります。
ですので、このアドベントカレンダーを機に「Vue.js」勉強ログをつけてみることにしました。

<!--more-->

ありがとうアドベントカレンダー。これがなければゆうゆうと「来年は頑張る」とかいってたはず。

## 現状スキルセット
スキルセットとしては、
 - ただ動くだけのjQuery/JavaScriptなら調べながら使えます。
 - あとはHTML/CSSをかけます。
 - Reactちょっとだけやったことあります

というレベル。ほぼマークアップエンジニアです。
いや、アクセシビリティはそんなに詳しくないので、戒めの意味でも「HTMLコーダー」レベルです。

今の課題は、「いいJavaScriptを書く」というところにあるかなと思っているので、知見を広げるために「Vue.js」というフレームワークを触ってみることにします。

同じくらいのスキルセットの人は一緒に頑張りましょう。
もっと上のレベルの方は、ご教授のほどよろしくお願いします！

## 概要を掴む
まずは、Vue.jsがなんなのか、あたりをつかみます。

[vue.js](https://jp.vuejs.org/)
日本語公式ページあるの嬉しい。
軽くて速い、仮想DOM、ふむふむ。

>公式ガイドは、HTML、CSS そして JavaScript の中レベルのフロントエンドの知識を前提にしています。フロントエンドの開発が初めてであるならば、最初のステップとして、フレームワークに直接入門するのは良いアイデアではないかもしれません。基礎を学んで戻ってきましょう！他のフレームワークでの以前の経験は役に立ちますが、必至ではありません。

[はじめに - Vue.js](https://jp.vuejs.org/v2/guide/)

えっ、どうしようかな……
とりあえず、一通り触ってみて、わかるレベルでやっていきます。

## インストール
少なくとも、触ってみるだけならば
`<script src="https://unpkg.com/vue/dist/vue.js"></script>`
を読み込むだけでいいっぽい。
この辺はjQueryと同じですね。

npmからインストールしてきてbuildして…ていうのはしっかりした開発か、自分が必要になったら改めて検討します。

## まずはHello,World
```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```



- `el`:書き出しターゲット(Vue特有の表現っぽい。elementの略かな？)
- `data`:データ対応（この場合、messageが`Hello Vue!`）

html内の`{{ message }}`にappで定義した`message:Hello Vue!`が書き込まれるっていう風な動きですね。

`new`っていうのは、JavaScriptの`new演算子`ですね。
ちょっと復習します。

### new演算子？
JavaScriptには、オブジェクトという考え方があります。
そこで用いられるのがnew演算子です。
まずは、オブジェクトについて少し説明。

#### オブジェクト
名前をキーにアクセスできる配列の事を言います。
いろんなデータやデータ操作についてのあれこれがつまった入れ物のようなものです。

例えば「nayu」というオブジェクトを定義するときはこんな感じです。

```js
var nayu = {
  name  : nayu,
  sex   : male,
  birth : 1993/04/28,
  part  : frontendengineer
}
```
こういう風に、オブジェクト内に名前をつけて情報を定義しておきます。
すると、「ナユの誕生日」をデータとして使いたい時に`nayu.birth`だとか`nayu['birth']`だとかでデータにアクセスできます(これらの違いは割愛)。
`nayu`,`1993/04/28`などのデータを **プロパティ** と呼びます。

これらは宣言したあとからも外から書き換えることができます。

さて、この、すごい入れ物であるオブジェクト。
今は「nayu」オブジェクトを自分で定義しましたが、JavaScriptにはもともといろいろなオブジェクトが用意されていて、呼び出すだけで様々なデータ操作が行えます。

では、もともと用意されたオブジェクトに直接外からアクセスしてデータを書き換える行為が発生したときはどうでしょう。

答えは、そのデータを使っている別の場所では予定と違うデータに書き換わってしまっていて、不都合が発生します。

そのため、用意されているオブジェクトを使う時は、「原本」ではなく「コピー」を作って使いましょうということになっています。

この、オブジェクトをコピーする行為を「インスタンス化」、できあがったコピーは「インスタンス」と呼びます。
（instanceは「事実、事例、実例」という意味があります。
実物のサンプルコピーということで、まさに実例ですね。）

Gitでいうとブランチを切ってきてそのエリアで作業する、みたいなものです。

さて、本題に戻りましょう。
今の`new`演算子はインスタンスを作ることだということを踏まえて見てみると、この操作はVue.jsの元々用意しているオブジェクト`Vue`をインスタンス化し、それの中身を書き換えて`app`という名前のオブジェクトとして定義した、ということが記述されているとわかります。

ふむふむ、なるほど、Vue.jsは、テンプレートを提供してくれているのですね。
コピーして、書き換えて、好きに使えよ、という感じでしょうか。

## v-bindでデータバインディング

```html
<div id="app-2">
  <span v-bind:title="message">
    Hover your mouse over me for a few seconds to see my dynamically bound title!
  </span>
</div>
```

```JavaScript
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})
```

htmlの方で１点、みたこともないものが出てきましたね。
`v-bind:title`とは何でしょうか…。

公式ガイドによると、ディレクティブというもののようです。
挙動を見ると、「`title`属性に`message`のプロパティを書き込んだ」という風に見えます。
HTMLにデータを書き込むことを「束縛する」と表現するのか…？
データバインディング、みたいな単語はたまに聞くのですが、その辺も関連してくるのかな。
この辺はおいおい勉強していきましょう。

## v-ifで条件分岐
```html
<div id="app-3">
  <p v-if="seen">Now you see me</p>
</div>
```

```JavaScript
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```
`v-if`ができました。if文っぽいですね。
`seen:true`を返すと要素が出現、`seen:false`を返すと要素が消滅します。
別に`seen`じゃなくて`nyanko`とかでも行けました。
要は、`v-if="true"`なのか`v-if="false"`なのかで判断するっていうことですね。うん、これはすぐわかった。

ちなみに、ガイドによると、消滅、更新、などのタイミングでのトランジションエフェクトもVueは提供してくれているようです。これはよさそうですね。

## v-forでループ

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```JavaScript
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
```

なるほど、徐々にVueのやり口が見えてきました。
`todos`の`text`プロパティが尽きるまで`<li>`を描画するんですね。

`XX in YY`は、in YYは、JS側のtodosオブジェクトをさしてますね。
todoはHTML側で任意に設定されています。
textはtodosオブジェクト内で定義されています。
この辺の文法は、またしっかり学ぶ必要がありそうです。

consoleから`app4.todos.push({ text: 'New item' })`を叩くと要素が増えました。
`push()`は配列の末尾にデータを突っ込むメソッドですね。

## v-on,v-modelでユーザー入力の制御

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```JavaScript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```
`v-on:click`
clickイベントらしきものができました。
clickすると`reverseMessage`メソッドを呼び出す感じですね。
定義の仕方は、`methods`オブジェクトに`reverseMessage`を記述。
中身は普通のJavaScriptのfunctionですね。
内容的には、
 - split('')：`app5`の`message`を一文字ずつ区切って配列に格納
 - reverse()：順番を全部ひっくり返す
 - join('')：連結（つなぎ部分に挿入する文字はなし）

そのインスタンスのみで通用する値、メソッドがあるってなんか不思議な気分ですね。
こういうのがない場合、グローバルに存在する関数はどこからでも呼出せていたので。
これだと`el:#app-5`内で通用する関数ってことですよね。
他の場所で使いたければ、都度指定する必要があるわけでしょう。


```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```JavaScript
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

なるほど、データバインディングがなんとなくわかりました。
つまりは、リアルタイムに片方を、もしくはお互いを更新するってことですね？
さっきの`v-bind`はJavaScriptからHTMLだったけれど、今回の`v-model`は双方向ですね。

HTMLの`<input>`の要素がJavaScriptの`message`を書き換え、すぐさまHTMLの`{{ message }}`に反映するといった感じですね。
なるほどです。データバインディング、すばらしい。


## コンポーネントシステム
これは多分、だいたいCSS設計のコンポーネントシステムとおなじようなものでしょう。。

### コンポーネントの定義
```JavaScript
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
```

```html
<ol>
  <!-- todos 配列にある各 todo に対して todo-item コンポーネントのインスタンス作成する -->
  <todo-item></todo-item>
</ol>
```

なんとなく、感覚的にわかった感じはあります。

### コンポーネントに値を渡す


```html
<div id="app-7">
  <ol>
    <!-- todo オブジェクトによって各 todo-item を提供します。それは、内容を動的にできるように表します。-->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>
```

```JavaScript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { text: 'Vegetables' },
      { text: 'Cheese' },
      { text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```

流れ的には
 - `<todo-item>`コンポーネントはprops(値)の箱をもっていて、親コンポーネントからpropsを受け取る。
 - `v-bind`を使って`todo.text`データをHTML上の`<todo-item>`と紐付ける
 - HTML上に`<todo-item>`が`groceryList`のアイテムの数だけ生成される

うーん、理屈はわかったんだけど、`v-for`あたりをうまくかけるかは微妙です。
いちいち参照しないとわかんなそう。すぐ慣れる気はします。

---

さて、ふんわりとした雰囲気は掴むことができました。
次回は引き続きガイドを進めつつ、わからない単語がでてきたら都度調べて、という風にやっていきます。


## 参考文献

[改訂新版 JavaScript本格入門](http://gihyo.jp/book/2016/978-4-7741-8411-1)
[vue.js](https://jp.vuejs.org/)
