const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');

exports.getCollections = (req, res, next) => { 
  Product.find()
  .then(products => {
    let titleArray = []
    let collectionsArray = []
    let allProductsArray = []

    products.forEach(product => {
      allProductsArray.push(product)
      if (titleArray.includes(product.collectionTitle)){
      }
      else{
        titleArray.push(product.collectionTitle)
        collectionsArray.push(product)
      }    
    });
  res.render('shop/collections', {
    allProducts: allProductsArray,
    prods: collectionsArray,
    pageTitle: 'Collections', 
    path: '/collections'
  });
})
.catch(err => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
});

};

exports.getProducts = (req, res, next) => {
  console.log("got prods")
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
     
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.getCollectionProds = (req, res, next) => {

  const collectionTitle = req.params.collectionTitle;
  Product.find({ 'product.collectionTitle': collectionTitle })
    .then(products => {
      let collectionProducts = []
      products.forEach(product => {
        if (product.collectionTitle === collectionTitle){
          collectionProducts.push(product)
        }
      })
      res.render('shop/product-list', {
        prods: collectionProducts,
        pageCollection: collectionTitle,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      console.log(error)
      return next(error);
    });

}




exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {

  const userId = req.user._id;
  
  User.findById(userId)
    //.populate('cart.items.productId')
    //.execPopulate()
    .then(user => {      
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      console.log(`Was not able to fetch the cart: ${err}`);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log("Cart isssmnot posted");
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  
  const userId = req.user._id;
  console.log("postorder!")
  console.log(req.user)
  
  
  User.findById(userId)
    //.populate('cart.items.productId')
    //.execPopulate()
    .then(user => {
      
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      //let prodtest = Product.findById(orders[0].products[0]._id)
      const products = req.user.cart.items;
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        products: products
      });
    })
    .catch(err => {
      console.log(`Orders not rendered ${err}`)
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


