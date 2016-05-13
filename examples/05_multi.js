const { lens, multi } = require('lorgnette');

let lastCartItem = lens.prop('items', []).last();
let totalCount = lens.prop('total');
let cartLens = multi(lastCartItem, totalCount);

let cart = {
  total: 2,
  items: [
    'potato',
    'cheese'
  ]
};

cartLens.get(cart) // returns [Just('cheese'), Just(2)]

cartLens.set(cart, 'carrot', 3)
// returns
// {
//   total: 3,
//   items: ['potato', 'cheese', 'carrot']
// }

cartLens.update(cart, () => 'carrot', x => x + 1)
// returns
// {
//   total: 3,
//   items: ['potato', 'cheese', 'carrot']
// }
