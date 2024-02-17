/**
 * データベースのProductモデルに初期データを投入するためのスクリプトファイル
 * nodeから実行する
 */

const mongoose = require('mongoose');
const Product = require('./models/product');

// エラー処理
main().catch(err => console.log(err, 'コネクションエラー'));

async function main() {
    // farmStand DBにアクセスする
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('接続OK')

    // もしデータベースに認証が必要な場合は、ユーザー名とパスワードを含めて接続します
    // await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test
}

// 初期データインスタンスを生成
// const p = new Product({
//     name: 'ルビーグレープフルーツ',
//     price: 198,
//     category: '果物'
// })

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(e => {
//         console.log(e);
//     })

const seedProcuts = [
    {
        name: 'ナス',
        price: 98,
        category: '野菜',
    },
    {
        name: 'カットメロン',
        price: 498,
        category: '果物',
    },
    {
        name: '種無しスイカのカット',
        price: 380,
        category: '果物',
    },
    {
        name: 'オーガニックセロリ',
        price: 198,
        category: '野菜',
    },
    {
        name: 'ヤクルト',
        price: 98,
        category: '乳製品',
    },
]

Product.insertMany(seedProcuts)
    .then(p => {
        console.log(p);
    })
    .catch(e => {
        console.log(e);
    })