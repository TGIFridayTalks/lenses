'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeFilters = mergeFilters;
exports.filteredRecipes = filteredRecipes;

var _transducers = require('transducers.js');

var _lorgnette = require('lorgnette');

var checkIfSatisfies = function checkIfSatisfies(criteria) {
  return function (coll) {
    return (0, _lorgnette.just)(coll.some(function (v) {
      return criteria.test(v);
    }));
  };
};

function mergeFilters() {
  for (var _len = arguments.length, filters = Array(_len), _key = 0; _key < _len; _key++) {
    filters[_key] = arguments[_key];
  }

  return Object.assign.apply(Object, [{}].concat(filters));
}

// recipes = [
//   {
//     tags: ['internet'],
//     title: 'манная каша',
//     body: 'Самая вкусная манная каша готовится так...',
//     ingridients: ['молоко', ...]
//   },
//   ...
// ]
//
// filters = {
//   search: 'каша',
//   tag: 'internet'
// }

function filteredRecipes(recipes, filters) {
  var transformations = [];
  if (filters.state) {
    transformations.push((0, _transducers.filter)(function (recipe) {
      return recipe.state === filters.state;
    }));
  }
  if (filters.category) {
    transformations.push((0, _transducers.filter)(function (recipe) {
      return recipe.category === filters.category;
    }));
  }
  if (filters.tag && filters.tag.trim() !== '') {
    (function () {
      var tagCriteria = new RegExp(filters.tag, "i");
      transformations.push((0, _transducers.filter)(function (recipe) {
        return _lorgnette.lens.prop('tags').get(recipe).then(checkIfSatisfies(tagCriteria)).getOr(false);
      }));
    })();
  }
  if (filters.search && filters.search.trim() !== '') {
    (function () {
      var searchCriteria = new RegExp(filters.search, "i");
      var criteriaCheck = checkIfSatisfies(searchCriteria);

      transformations.push((0, _transducers.filter)(function (recipe) {
        return searchCriteria.test(recipe.title) || searchCriteria.test(recipe.body) || searchCriteria.test(recipe.description) || searchCriteria.test(recipe.category) || _lorgnette.lens.prop('ingridients').get(recipe).then(criteriaCheck).getOr(false) || _lorgnette.lens.prop('tags').get(recipe).then(criteriaCheck).getOr(false);
      }));
    })();
  }
  return (0, _transducers.seq)(recipes, _transducers.compose.apply(null, transformations));
}