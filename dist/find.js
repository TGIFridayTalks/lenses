'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('lorgnette/dist/lens');

var Lens = _require.Lens;

var _require2 = require('lorgnette');

var just = _require2.just;
var nothing = _require2.nothing;

var ArrayFindLens = exports.ArrayFindLens = function (_Lens) {
  _inherits(ArrayFindLens, _Lens);

  function ArrayFindLens(criteria) {
    _classCallCheck(this, ArrayFindLens);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayFindLens).call(this));

    _this.criteria = criteria;
    return _this;
  }

  _createClass(ArrayFindLens, [{
    key: 'get',
    value: function get(obj) {
      if (obj instanceof Array) {
        var value = obj.find(this.criteria);

        if (typeof value !== 'undefined') {
          return just(value);
        } else {
          return nothing;
        }
      }
      return nothing;
    }
  }, {
    key: 'update',
    value: function update(obj, func) {
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
  }]);

  return ArrayFindLens;
}(Lens);