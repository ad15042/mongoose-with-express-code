# mongoose-with-express-code
## プロジェクト名
WEB Developer BootcampというUdemy講座で作成した商品管理アプリ　

## プロジェクト概要
データベースはMogoose、サーバサイドはNode.jsを使用してフレームワークはExpressを使って作成した。
以下の機能を具備したアプリケーションを開発した。
1. 商品一覧ページでは登録された商品の確認が可能
2. 商品詳細ページでは各商品の詳細情報の確認が可能
3. 新規登録ページでは、新規の商品を登録が可能
4. 商品更新ページでは登録ずみ商品のデータを変更が可能
5. 各商品に設定された削除ボタンを押下して、モーダルでも実行を押下することで商品の削除が可能
講座ではスタイルまでは考慮していなかったので、BootStrapを用いてUIをいい感じにした。
※本アプリについてはエラーハンドリングは作成せず、値のバリデーションも最低限にしている。

### 環境
| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js                | 21.5.0     |
| Express                | 4.18.2      |
| ejs                    | 3.1.9     |
| mongoose                | 8.1.1        |
その他のパッケージのバージョンは package.json を参照してください

## ディレクトリ構成
.
├── node_modules
├── index.js
├── models
│   └── product.js
├── package-lock.json
├── package.json
├── seed.js
└── views
    └── products
        ├── index.ejs
        ├── new.ejs
        ├── show.ejs
        └── update.ejs

## 開発準備（備忘録として残す）
### プロジェクトの作成からサーバの起動まで
```
$ mkdir project_name
$ cd project_name
$ npm init
$ npm i express mongoose ejs
$ touch index.js
$ mkdir views
$ ls
index.js		node_modules		package-lock.json	package.json		views
$ nodemon index.js
[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
```
- 注)Mongo DBへのコネクションエラーが発生する場合は、mongod(デーモン)が起動していることを確認する。

##  Mongooseのモデルの作成からデータの確認まで
今回、モデルはmodels/product.jsに定義する。
テストデータをデータベースに入れるために、シードファイル(seed)というものを用意する。
seedファイルで作成したデータを登録した後、MongoDB側でデータが投入されているか確認する。
```
$ node seed.js # seedファイルの実行
$  mongosh  # Mongo Shellに接続
test> show dbs  # 全てのDBを表示
admin           40.00 KiB
animalShelter  128.00 KiB
config          84.00 KiB
farmStand        8.00 KiB
local           72.00 KiB

test> use farmStand  # 作成したデータベースに切り替え
switched to db farmStand
farmStand> show collections  # コレクションを確認
products
farmStand> db.products.find()  # 投入したデータを確認
[
  {
    _id: ObjectId('65c1979495012924428df5a7'),
    name: 'ルビーグレープフルーツ',
    price: 198,
    category: '果物',
    __v: 0
  }
]

```
