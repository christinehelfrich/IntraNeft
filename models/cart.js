//const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchemas = 

new Schema ({

  id: {
    type: Number,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

module.exports = mongoose.model('Cart', cartSchemas);

/*
const sequelize = require('../util/database');


const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});


module.exports = Cart;
*/
