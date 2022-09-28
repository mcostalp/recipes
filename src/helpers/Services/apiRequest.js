const dataToggleUrl = {
  // categoryListBtns: (type) => `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`,
  // categoryListItems: (type, category) => `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`,
  // allRecipesList: (type) => `https://www.the${type}db.com/api/json/v1/1/search.php?s=`,
  // recipeById: (type, id) => `https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`,
  ingredient: (type, ingrediente) => `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  name: (type, name) => `https://www.the${type}db.com/api/json/v1/1/search.php?s=${name}`,
  firstLetter: (type, letter) => `https://www.the${type}db.com/api/json/v1/1/search.php?f=${letter}`,
};
export async function requestFetch(URL, type) {
  const key = type === 'meal' ? 'meal' : 'cocktail';
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
  const typePag = pag === 'foods' ? 'meal' : 'cocktail';
  const URL = dataToggleUrl[key](typePag, id);
  // const request = await requestFetch(URL, typePag);
  // return request;
  try {
    const request = await fetch(URL);
    const response = await request.json();
    return await Object.values(response)[0];
  } catch (error) {
    return alert('Your search must have only 1 (one) character');
    // return error;
  }
};
