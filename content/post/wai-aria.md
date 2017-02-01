+++

Title = "WAI-ARIAの勉強をしているのでメモ"
date = "2016-12-12T20:40:55+09:00"
draft = true

+++

## WAI-ARIAとは

WAIとは[Web Accessibility Initiative] (http://www.w3.org/WAI/)のこと。
W3C の中で、Web アクセシビリティに関する仕様を検討する部会の名前だそう。

ARIAとは"Accessible"な"Rich Internet Applications"のこと。

WAIの策定した、アクセシビリティに関する仕様といっちゃっておｋ？

## Roles
要素に属性を記述することで、役割を表すことができる。

- Landmark Roles
- Document Structure Roles
- Widget Roles

の３つに別れる。

## 疑問
- 「字間広く」とは


## Landmark Roles
「これがなんのランドマークであるか」の情報を、支援技術に伝達する。
指定しなくても、暗黙的にroleを示す要素もある。

(ex)
- `main`要素は、暗黙的にrole属性を持ち、値は`main`である。
- `nav`要素は、暗黙的にrole属性を持ち、値は`navigation`である。

### application
アプリケーションであることを表す。
ページ全体（`body`とか）に記述することが多い。
Voiceoverでは「アプリケーション」と読み上げられる。


### document
ドキュメントであることを表す。
これもページ全体に記述することが多い。
Voiceoverでは特に読み上げはなし。

### banner
大見出し（標題）またはウェブサイトのタイトルを含むリージョン
バナー画像を表すものではない。
headerなどに用いるべき



### complementary
### contentinfo
### form
### main
### navigation
### search


### tab
`tab`と読み上げられる。

### tablist
`tablist`値を持つ要素以下に`tab`値を持つ要素がある場合
`tab`値を持つ要素の全体数と、今フォーカスしている要素が何個目に当たるのかを読み上げてくれる。

### tabpanel
`tablist`に対応した内容の部分
