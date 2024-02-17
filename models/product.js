// 農産物の商品情報を保持するモデル

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['果物', '野菜', '乳製品']
    }
})

// モデル作成
const Product = mongoose.model('Product', productSchema);

// エクスポート
module.exports = Product;

