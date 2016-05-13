'use strict';

var _require = require('lorgnette');

var lens = _require.lens;
var multi = _require.multi;


var lastCartItem = lens.prop('items', []).last();
var totalCount = lens.prop('total');
var cartLens = multi(lastCartItem, totalCount);

var cart = {
  total: 2,
  items: ['potato', 'cheese']
};

cartLens.get(cart); // returns [Just('cheese'), Just(2)]

cartLens.set(cart, 'carrot', 3);
// returns
// {
//   total: 3,
//   items: ['potato', 'cheese', 'carrot']
// }

cartLens.update(cart, function () {
  return 'carrot';
}, function (x) {
  return x + 1;
});
// returns
// {
//   total: 3,
//   items: ['potato', 'cheese', 'carrot']
// }