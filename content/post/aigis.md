+++

Title = "styleguideジェネレータ「aigis」を使ってみた"
date = "2016-09-21T21:14:27+09:00"
slug = "aigis"

+++

スタイルガイドジェネレータ「aigis」というものがあるらしく、ちょっと触って見るついでにメモを残しておきます。

exampleを触ってだいたいの感触を掴むというのがこのエントリの趣旨です。

## aigisとは
[株式会社ピクセルグリッド](https://www.pxgrid.com/)謹製のスタイルガイドジェネレータです。
<!--more-->

以下、[日本語ドキュメント](https://pxgrid.github.io/aigis/docs/jp/)より引用。

>aigisでは、メンテナブルなスタイルガイドを作成することができます。 aigisを使えば以下の様なことが可能です。

> - テキストファイルであれば、.scss .styls .mdなど、どのような形式からでもスタイルガイドを作成できます。
> - Markdownを使用してドキュメントを記述することができます。
> - スタイルガイドのテーマをカスタマイズすることができます。またテーマでは、JadeやHandlebarsといったテンプレートエンジンを利用できます。

なお、このエントリは割と **黒い画面こわい人向け** の記事です。

黒い画面怖くない人は、適宜読み飛ばしてください！
(とか言っておきながら、npmコマンドとGitコマンドが動く環境になっていることが前提です！ )

## 作業用フォルダをつくる
そういえば、いつも作業するときホームディレクトリに「Works」とか「Practice」とか作ってその中でやってるんですけど、なんかディレクトリ作るのに参考になるサイトないですかね〜。  

とりあえずホームディレクトリに練習用フォルダを作っちゃいましょう。

`cd ~`でホームディレクトリに戻れます。

ちなみに、ホームディレクトリとは`Macintosh HD > ユーザ > ***(あなたのユーザ名)` **←ココ**

```sh
$ cd ~            //ホームディレクトリへ移動
$ mkdir practice  //practiceというフォルダを作る
$ cd ./practice   //practiceへ移動
```

（$マークよりも右側を記述してくださいね）

## aigisを落としてくる

```sh
$ git clone https://github.com/pxgrid/aigis.git
```

これは、今いるディレクトリに[aigis](https://github.com/pxgrid/aigis)の中身をダウンロードしてくるコマンド。

Gitコマンドねーよ！ みたいなことを言われた人はがんばってgitをインストールしてください。

```sh
Cloning into 'aigis'...
remote: Counting objects: 4360, done.
remote: Total 4360 (delta 0), reused 0 (delta 0), pack-reused 4360
Receiving objects: 100% (4360/4360), 933.49 KiB | 246.00 KiB/s, done.
Resolving deltas: 100% (2229/2229), done.
Checking connectivity... done.
```
まあなんかこんな感じになったらokです。

## aigisをインストールする
落としてきたのは、aigisに必要なファイルのダウンロード指示書だと思ってください。

（いろんなプログラムを組み合わせて動いてるから、全部詰め込むと重いんだよ）

ここで、追加でaigisに関連するファイルをインストールします。

```sh
$ cd ./aigis/examples                //サンプルフォルダへ移動
$ npm install --save-dev node-aigis  //aigisをインストール
$ ./node_modules/.bin/aigis -v       //aigisのバージョンチェック
1.1.5                                //バージョン
```

`$ npm install --save-dev node-aigis`が動かねーよっていう方は多分npmだのNode.jsだのが入っていないので頑張っていれてください。

記事書いてる時点では1.1.5でしたがまあこの辺の数字は随時かわるかもしれません。

## aigisのテンプレートを生成
`$ ./node_modules/.bin/aigis init`

こうなったらokです

```sh
Created the following files and directories:
Cowardly refusing to overwrite existing: aigis_config.yml
  aigis_assets
  aigis_assets/css/highlight/okadia.css
  aigis_assets/css/theme.css
  template_ejs
  template_ejs/components.ejs
  template_ejs/index.ejs
  template_ejs/sidemenu.ejs
```

## aigisを起動
`$ ./node_modules/.bin/aigis run -c ./aigis_config.yml`

こんな感じになります。
意味的には、今いるファイルにある`aigis_config.yml`をaigisに読み込ませるような感じです。

```sh
[Info] Config File: /Users/yuki/practice/aigis/examples/aigis_config.yml
[Info] Start: Generate Styleguide
[Info] Output: /Users/yuki/practice/aigis/examples/styleguide
[Info] Finish: Generate Styleguide
```

はい、これでok。

## スタイルガイドを見てみる
では、Finderでホームディレクトリ内に作った`practice`フォルダの中の`aigis`フォルダを開いてみましょう。  
`styleguide`といフォルダがあると思いますが、これが先ほどaigisを起動させることで生成されたスタイルガイドです。
`index.html`を開くと、スタイルガイドが生成されていることがわかると思います。

### index.html
基本的には、全て`aigis_config.yml`がどのファイルをどうするのかという管理をしています。

```sh
# Index page created from markdown file
index: ./index.md
```

`index.html`は、`aigis_config.yml`と同階層にある`index.md`から生成しますよ、とのこと。

### その他ページ
サイドバーの`base`をクリックするとbase部分に関する記述が出てきます。
（なんか最後にスラッシュついてないのでちょっとおかしな遷移しますが）。
他ページも同様です。
このあたりも`aigis_config.yml`に書いています

```sh
#The directory containing the source files to parse recursively
source:
  - ./css
  - ./demo.md
```

つまり、今いる`examples`フォルダ内の`css`フォルダ内のテキストファイル(今回だと`style.css`)、もしくは`demo.md`から生成しますよということですね。
他にも対象ファイルを増やしたければここに追記していきましょう。
ちなみに、最初の「aigisとは？」の部分に書いたように、拡張子はかなりいろんな部分をサポートしているみたいです。
ただし、`aigis_config.yml`の以下の部分で「どの拡張子のファイルを対象にするのか」は書いておくこと。

```sh
# The types that aigis will scan to document comment
source_type:
  - .css   
  - .sass  
  - .scss  
  - .styl  
# If you want to generate documents from markdown
# source_type: .md
```

また、`.md`がリストにないのに`demo.md`が対象になっているのは、ファイル名と拡張子を指定しているからです。
`./css`のように、フォルダを指定した場合はフォルダ内にある上記リストの拡張子を持つファイルのみが生成対象になります。
ファイル名と拡張子まで指定しなくても`.md`を生成対象にしたい場合、一番下の行の#を消してコメントアウトを解除するか、リストに`.md`を追加してしまいましょう。


(`//`で始まる部分は説明用に私が記述したものです。)

<div class="highlight">
<pre>


//以下、メタ情報。カテゴリやタグの情報を書くとサイドバーとメインに自動反映してくれる。

/*
---                 
name: Button
category:           
  - mod/btn         
  - base            
  - mod             
tag:                
  - latest          
  - base            
compile: false
---

//以下、メインセクション記述。markdownで書くこと。

Button styles.
* Base button style.          
* Use `a` or `button` tag.

//以下シンタックスエリア。ファイル形式を書くと自動でシンタックスハイライトがかかる。

```html
&lt;a class="ag-btn">Button&lt;/a>
&lt;button class="ag-btn ag-btn--primary">Button&lt;/button>
```

```ejs
&lt;a class="ag-btn">&lt;%- name %>&lt;/a>
&lt;button class="ag-btn ag-btn--primary">&lt;%- name %>&lt;/button>
```

```jade
a.ag-btn
  != name
button.ag-btn.ag-btn--primary
  != name
```

```hbs
{{include './button.html'}}
&lt;hr>
&lt;a class="ag-btn">{{name}}&lt;/a>
&lt;button class="ag-btn ag-btn--primary">{{name}}&lt;/button>
```

*/

//以下、コンポーネントのCSS


.ag-btn {
  -webkit-appearance: none;
  display: inline-block;
  border: none;
  background-color: #3DB680;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  line-height: 40px;
  min-width: 200px;
  font-size: 20px;
  box-sizing: border-box;
 }

.ag-btn--primary {
  color: black;
  background-color: #FFEA3A;
 }

</pre>
</div>

`:`の後に半角スペースが空いてないとエラー吐いたりするなど割とシビアなので注意。
あんまり縦長になるとつらそうなので、1スタイル1ファイルとかでいいかもしれませんね。
今回だと、`header.css`、`footer.css`…などのように。

ちなみに、今回は`examples/styleguide`の中にファイルが吐き出されましたが、フォルダ名なんかは`aigis_config.yml`内のここで変えられますよ。

```yaml
# The directory that aigis will build to
dest: ./styleguide
```

この`dest: `以降を任意のパスに書き換えることで好きな階層の好きなフォルダ内に吐き出させることができます。

また、更新があった場合は随時
`./node_modules/.bin/aigis run -c ./aigis_config.yml`
を叩いて生成しなおしてください。

## まとめ
さて、これで、aigisを使って自由にメンテナブルなstyleguideを作ることができますね！

スニペット管理にもなりますし、これでスタイル管理することで迷子にならないサイト制作をしていきましょう！

気が向いたら、gulpにaigisを組み込んで、変化があったら自動で生成されるようにしたりする方法も書きたいなと思います！

またこの記事は何か気づきがありしだい追記していく予定なのでどうぞよろしくおねがいします！
