/*

let express = require('express');
const router = express.Router();

const fs = require('fs');

const Cart = require('../models/cart.js');
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));


router.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

router.get('/', function (req, res) {
    res.render('index',
        {
        title: 'The Garden App Shopping Cart',
        products: products
        }
    );
});

router.get('/add/:id', function(req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const product = products.filter(function (item) {
        return item.id === productId;
    });
    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect('/');
});

router.get('/cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('cart', {
            products: null
        });
    }
    const cart = new Cart(req.session.cart);
    res.render('cart', {
        title: 'The Garden App NodeJS Shopping Cart',
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    });
});

router.get('/remove/:id', function(req, res, next) {
    const productId = req.params.id;
    const cart = new appCart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

module.exports = router;


*/