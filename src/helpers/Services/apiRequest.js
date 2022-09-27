const dataToggleUrl = {
  categoryListBtns: (type) => `https://www.${type}ldb.com/api/json/v1/1/list.php?c=list`,
  categoryListItems: (type, category) => `https://www.${type}ldb.com/api/json/v1/1/filter.php?c=${category}`,
  allRecipesList: (type) => `https://www.${type}ldb.com/api/json/v1/1/search.php?s=`,
  recipeById: (type, id) => `https://www.${type}ldb.com/api/json/v1/1/lookup.php?i=${id}`,
  ingredientSearch: (type, ingrediente) => `https://www.${type}ldb.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  nameSearch: (type, name) => `https://www.${type}ldb.com/api/json/v1/1/search.php?s=${name}`,
  firstLetterSearch: (type, letter) => `https://www.${type}ldb.com/api/json/v1/1/search.php?f=${letter}`,
};
export async function requestFetch(URL, type) {
  const key = type === 'themea' ? 'meals' : 'drinks';
  try {
    const request = await fetch(URL)
      .then((response) => response.json())
      .then((objresponse) => objresponse[key]);
    return request;
  } catch (error) {
    return console.log(error);
  }
}

export const fetchApi = async (pag, key, id) => {
  const typePag = pag.toLowerCase().includes('foods') ? 'themea' : 'thecocktai';
  const URL = dataToggleUrl[key](typePag, id);
  const request = await requestFetch(URL, typePag);
  return request;
};
