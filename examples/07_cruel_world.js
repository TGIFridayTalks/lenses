import { seq, filter, compose } from 'transducers.js';
import { lens, just } from 'lorgnette';

const checkIfSatisfies = criteria => coll => just(coll.some(v => criteria.test(v)));

export function mergeFilters(...filters) {
  return Object.assign({}, ...filters);
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

export function filteredRecipes(recipes, filters) {
  let transformations = [];
  if (filters.state) {
    transformations.push(filter((recipe) => recipe.state === filters.state));
  }
  if (filters.category) {
    transformations.push(filter((recipe) => recipe.category === filters.category));
  }
  if (filters.tag && filters.tag.trim() !== '') {
    let tagCriteria = new RegExp(filters.tag, "i");
    transformations.push(filter(recipe => (
      lens.prop('tags').get(recipe).then(checkIfSatisfies(tagCriteria)).getOr(false)
    )));
  }
  if (filters.search && filters.search.trim() !== '') {
    let searchCriteria = new RegExp(filters.search, "i");
    let criteriaCheck = checkIfSatisfies(searchCriteria);

    transformations.push(filter(recipe => (
      searchCriteria.test(recipe.title) ||
      searchCriteria.test(recipe.body) ||
      searchCriteria.test(recipe.description) ||
      searchCriteria.test(recipe.category) ||
      lens.prop('ingridients').get(recipe).then(criteriaCheck).getOr(false) ||
      lens.prop('tags').get(recipe).then(criteriaCheck).getOr(false)
    )));
  }
  return seq(recipes, compose.apply(null, transformations));
}
