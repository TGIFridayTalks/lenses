'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = recipes;

var _lorgnette = require('lorgnette');

var _FilterRecipesUtils = require('../lib/FilterRecipesUtils');

var _RecipeStates = require('../constants/RecipeStates');

var recipeStates = _interopRequireWildcard(_RecipeStates);

var _RecipesConstants = require('../constants/RecipesConstants');

var _FiltersConstants = require('../constants/FiltersConstants');

var _RecipeConstants = require('../constants/RecipeConstants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  filters: {
    category: null,
    search: null,
    tag: null,
    state: recipeStates.PUBLISHED
  },
  filtered: [],
  all: []
};

var filteredLens = _lorgnette.lens.prop('filtered');

var categoryLens = _lorgnette.lens.prop('filters').prop('category');
var searchLens = _lorgnette.lens.prop('filters').prop('search');
var tagLens = _lorgnette.lens.prop('filters').prop('tag');

var changeCategoryLens = (0, _lorgnette.multi)(categoryLens, filteredLens);
var changeSearchLens = (0, _lorgnette.multi)(searchLens, tagLens, filteredLens);
var changeTagLens = (0, _lorgnette.multi)(tagLens, searchLens, filteredLens);

function recipes() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  var recipes = void 0,
      filters = void 0;

  switch (action.type) {
    case _RecipesConstants.RECIPES_LOAD_SUCCEED:
    case _RecipesConstants.RECIPE_REMOVE_SUCCEED:
    case _RecipeConstants.RECIPE_SAVE_SUCCEED:
      recipes = [].concat(_toConsumableArray(action.data));
      return _extends({}, state, {
        all: recipes,
        filtered: (0, _FilterRecipesUtils.filteredRecipes)(recipes, state.filters)
      });
    case _FiltersConstants.FILTERS_CHANGE_CATEGORY:
      filters = (0, _FilterRecipesUtils.mergeFilters)(state.filters, { category: action.category });
      return changeCategoryLens.set(state, action.category, (0, _FilterRecipesUtils.filteredRecipes)(state.all, filters));
    case _FiltersConstants.FILTERS_CHANGE_SEARCH:
      filters = (0, _FilterRecipesUtils.mergeFilters)(state.filters, { search: action.search }, { tag: null });
      return changeSearchLens.set(state, action.search, null, (0, _FilterRecipesUtils.filteredRecipes)(state.all, filters));
    case _FiltersConstants.FILTERS_CHANGE_TAG:
      filters = (0, _FilterRecipesUtils.mergeFilters)(state.filters, { tag: action.tag }, { search: null });
      return changeTagLens.set(state, action.tag, null, (0, _FilterRecipesUtils.filteredRecipes)(state.all, filters));
    default:
      return state;
  }
}