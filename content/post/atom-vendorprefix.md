+++
date = "2016-10-19T13:14:00+09:00"
Title = "AtomのEmmetでvendor-prefixが勝手に挿入されるのを無効にする"
tags = ["editor",""]
slug = "atom-vendorprefix"

+++

## 勝手にベンダープレフィックスがつく

emmet、つかってますか？<br>
flexbox、つかってますか？<br>
私は使ってます。

<!--more-->

ある日、`df`で展開しようとして

```css
display: -webkit-flex;
display: -ms-flex;
display: flex;
```

みたいになってイライラしてました。
これからはね、 **Autoprefixer** の時代だからね、こんなもの勝手につけなくていいの。

Autoprefixerについては下記参照。  
[CSSベンダープレフィックス-webkit-を今この瞬間に辞める為のAutoprefixerの導入とお薦め設定](http://qiita.com/tonkotsuboy_com/items/377913c51b1ac00deffe)


## 解決方法

ホームディレクトリ`（Macintosh HD/ユーザ/ :house:）`に
`emmet`というフォルダをつくって、その中に`preferences.json`というフォルダを作る。

これは、Atomのemmetが標準でここのファイルを読み込むようになってて、ユーザーは元ファイルをいじらなくてもここにファイルを自作しておけば設定を上塗りしてくれるんです。

中身は以下の通り

```json
{
  "css.autoInsertVendorPrefixes": false,
  "less.autoInsertVendorPrefixes": false,
  "scss.autoInsertVendorPrefixes": false,
  "sass.autoInsertVendorPrefixes": false,
  "caniuse.enabled": false
}
```

あとはAtomを再起動すればおっけーです。

`"caniuse.vendor":false`を書いちゃうと挿入機能がうまく無効化してくれない場合があるので
上記のようにするといいと思います。
