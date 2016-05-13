import { lens, multi } from 'lorgnette';
import { filteredRecipes, mergeFilters } from '../lib/FilterRecipesUtils';
import * as recipeStates from '../constants/RecipeStates';

import {
  RECIPES_LOAD_SUCCEED,
  RECIPE_REMOVE_SUCCEED,
  RECIPES_FILTER
} from '../constants/RecipesConstants';
import {
  FILTERS_CHANGE_CATEGORY,
  FILTERS_CHANGE_SEARCH,
  FILTERS_CHANGE_TAG
} from '../constants/FiltersConstants';
import { RECIPE_SAVE_SUCCEED } from '../constants/RecipeConstants';

let initialState = {
  filters: {
    category: null,
    search: null,
    tag: null,
    state: recipeStates.PUBLISHED
  },
  filtered: [],
  all: []
}

const filteredLens = lens.prop('filtered');

const categoryLens = lens.prop('filters').prop('category');
const searchLens = lens.prop('filters').prop('search');
const tagLens = lens.prop('filters').prop('tag');

const changeCategoryLens = multi(categoryLens, filteredLens);
const changeSearchLens = multi(searchLens, tagLens, filteredLens);
const changeTagLens = multi(tagLens, searchLens, filteredLens);

export default function recipes(state=initialState, action) {
  let recipes, filters;

  switch (action.type) {
  case RECIPES_LOAD_SUCCEED:
  case RECIPE_REMOVE_SUCCEED:
  case RECIPE_SAVE_SUCCEED:
    recipes = [...action.data];
    return {
      ...state,
      all: recipes,
      filtered: filteredRecipes(recipes, state.filters)
    }
  case FILTERS_CHANGE_CATEGORY:
    filters = mergeFilters(state.filters, { category: action.category });
    return changeCategoryLens.set(state, action.category, filteredRecipes(state.all, filters));
  case FILTERS_CHANGE_SEARCH:
    filters = mergeFilters(state.filters, { search: action.search }, { tag: null });
    return changeSearchLens.set(state, action.search, null, filteredRecipes(state.all, filters));
  case FILTERS_CHANGE_TAG:
    filters = mergeFilters(state.filters, { tag: action.tag }, { search: null });
    return changeTagLens.set(state, action.tag, null, filteredRecipes(state.all, filters));
  default:
    return state;
  }
}
