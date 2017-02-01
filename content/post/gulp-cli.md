+++
Title = "globalにgulp-cliをインストールしようとするとエラーが発生する"
tags = ["gulp",""]
slug = "gulp-cli"
date = "2016-12-13T13:18:13+09:00"

+++



## 現象
gulp 4.x系に対応するべく、globalからgulp(3.9.0)をアンインストールし、改めてgulp-cliをインストールしようとしたろころ下記のようなエラーが発生する。
インストールは中断され、gulp-cliがインストールできない。

<!--more-->

```sh
nayucolony:~ demo$ sudo npm install -g gulp-cli
/usr/local/bin/gulp -> /usr/local/lib/node_modules/gulp-cli/bin/gulp.js
npm ERR! Darwin 15.6.0
npm ERR! argv "/usr/local/bin/node" "/usr/local/bin/npm" "install" "-g" "gulp-cli"
npm ERR! node v6.9.2
npm ERR! npm  v3.10.9
npm ERR! path /usr/local/share/man/man1/gulp.1
npm ERR! code EEXIST

npm ERR! Refusing to delete /usr/local/share/man/man1/gulp.1: ../../../lib/node_modules/gulp/gulp.1 symlink target is not controlled by npm /usr/local
npm ERR! File exists: /usr/local/share/man/man1/gulp.1
npm ERR! Move it away, and try again.

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/demo/npm-debug.log
nayucolony:~ demo$ gulp -v
-bash: /usr/local/bin/gulp: No such file or directory
nayucolony:~ demo$
```

## 原因

下記に注目

```sh
npm ERR! Refusing to delete /usr/local/share/man/man1/gulp.1: ../../../lib/node_modules/gulp/gulp.1 symlink target is not controlled by npm /usr/local
npm ERR! File exists: /usr/local/share/man/man1/gulp.1
npm ERR! Move it away, and try again.
```

npm側から操作できないゴミファイルが存在してインストールがうまくいってない様子


## 対応
下記のコマンドを叩いて、上記の２行目に表示されているゴミファイルを削除する

```sh
sudo rm /usr/local/share/man/man1/gulp.1
```

その後、改めて

```sh
sudo npm install -g gulp-cli
```
を叩くことでインストールが完了した。


## 備考
`sudo`は管理者権限で実行するためのコマンドで、パスワードを要求されることがあるので都度入力を行うこと。


また、本件とは関係しないが、gulp-cliをglobalにインストールすることについては公式の推奨事項ではあるものの、否定的な意見もあるのでよく考えて行うこと。
