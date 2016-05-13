const { Lens } = require('lorgnette/dist/lens');
const { just, nothing } = require('lorgnette');

export class ArrayFindLens extends Lens {
  constructor(criteria) {
    super();
    this.criteria = criteria;
  }

  get(obj) {
    if (obj instanceof Array) {
      var value = obj.find(this.criteria);

      if (typeof value !== 'undefined') {
        return just(value)
      } else {
        return nothing
      }
    }
    return nothing;
  }

  update(obj, func) {
    if (this.criteria !== null && obj instanceof Array) {
      var index = obj.findIndex(this.criteria);
      var oldVal = obj[index];
      var newVal = func(oldVal);
      if (oldVal !== newVal) {
        obj = obj.slice();
        obj[index] = newVal;
      }
    }
    return obj;
  }
}
