// 各種ライブラリのインポート
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
// Productモデルのインポート
const Product = require('./models/product');
var methodOverride = require('method-override');

// エラー処理
main().catch(err => console.log(err, 'Mongo DBへの接続失敗'));

async function main() {
    // 以下のURIはmongoDBのサーバだけではなく、DBの場所(今回だとfarmStand)も指している。
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('Mongo DBへの接続成功')

    // もしデータベースに認証が必要な場合は、ユーザー名とパスワードを含めて接続します
    // await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test
}

// formデータをパースする
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// ejsのディレクトリの設定
app.set('views', path.join(__dirname, 'views'));
// ejsをview エンジンに設定
app.set('view engine', 'ejs');
// POSTメソッドをPATCHメソッドでオーバーライドする
app.use(methodOverride('_method')) // _methodは何でも良いが、formのactionで渡すクエリストリングと同じにすること。

// カテゴリを定義
const categories = ['野菜', '果物', '乳製品'];

// 商品一覧のルーティング
app.get('/products', async (req, res) => {
    // プロダクトを全件検索
    const products = await Product.find({});
    // 一覧ベージに遷移
    res.render('products/index', { products, categories });
})

// 商品を新規登録するためのルーティング
app.get('/product/new', (req, res) => {
    //　カテゴリオブジェクトを渡す
    res.render('products/new', { categories });
})

// 商品を更新するためのルーティング
app.get('/product/:id/update', async (req, res) => {
    // リクエストからidを取得
    const { id } = req.params;
    // idをキーに更新対象のプロダクトを検索
    const singleProduct = await Product.findById(id).exec();
    // 詳細ページに遷移(カテゴリオブジェクトも渡す)
    res.render('products/update', { singleProduct, categories });
})

// 商品詳細画面のルーティング
app.get('/product/:id/detail', async (req, res) => {
    // リクエストからidを取得
    const { id } = req.params;
    // idをキーに詳細表示したいプロダクトを検索
    const singleProduct = await Product.findById(id).exec();
    // 詳細ページに遷移
    res.render('products/show', { singleProduct });
})

// 商品削除のルーティング
app.get('/product/:id/delete', async (req, res) => {
    // リクエストからidを取得
    const { id } = req.params;
    // idをキーにプロダクトを検索して削除する
    const singleProduct = await Product.findByIdAndDelete(id);
    console.log(`${singleProduct.name}を削除しました。`)
    // 一覧ベージに遷移
    res.redirect('/products');
})

// カテゴリのフィルタリング
app.get('/product/category', async (req, res) => {
    // クエリストリングからフィルタリングするカテゴリ名を取得
    const fillterName = req.query.name;
    // 指定のカテゴリで検索
    const products = await Product.find({ category: fillterName })
    // カテゴリでフィルタされたプロダクトを一覧ベージに渡す
    res.render('products/index', { products, categories });
})



// 商品登録画面で登録ボタンを押したときのルーティング
app.post('/product', async (req, res) => {
    // リクエストボディに含まれるデータを取得
    const { productname, price, category } = req.body;
    // 新規データを登録する
    const createdProduct = await Product.create({ name: productname, price: price, category: category });
    console.log(`${createdProduct.name}を登録しました。`)
    // products(一覧画面)にリダイレクト(ここにはURIを記載する)
    res.redirect('/products');
})


// 商品更新画面で更新ボタンを押したときのルーティング
app.patch('/product/:id', async (req, res) => {
    // リクエストからidを取得
    const { id } = req.params;
    // リクエストボディに含まれるデータを取得
    const { productname, price, category } = req.body;
    console.log(`更新後 名前：${productname} 価格:${price} カテゴリ:${category}`);
    // 新規データを登録する
    const updateProduct = await Product.findByIdAndUpdate(id, { name: productname, price: price, category: category }, { runValidators: true });
    console.log(`更新前 名前：${updateProduct.name} 価格:${updateProduct.price} カテゴリ:${updateProduct.category}`);
    // products(一覧画面)にリダイレクト(ここにはURIを記載する)
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('****ポート3000で待ち受け中****')
})