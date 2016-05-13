'use strict';

var _require = require('lorgnette');

var lens = _require.lens;


var lastCartItem = lens.prop('items', []).last();

var cart = {
  items: ['potato', 'cheese']
};

lastCartItem.get(cart); // returns Just('cheese')
lastCartItem.set(cart, 'carrot'); // returns { items: ['potato', 'cheese', 'carrot'] }