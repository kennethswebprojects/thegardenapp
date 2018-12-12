const express = require('express');
const router = express.Router();

//let fs = require('fs');
//let Cart = require('../models/cart');
//let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', function (req, res, next) {
    res.render('index',
        {
            title: 'The Garden App Home page' //,
            //products: products
        }
    );
});
/*
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
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});


*/

module.exports = router;

