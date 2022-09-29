const dataToggleUrl = {
  categoryListBtns: (type) => `https://www.the${type}db.com/api/json/v1/1/list.php?c=list`,
  // categoryListItems: (type, category) => `https://www.the${type}db.com/api/json/v1/1/filter.php?c=${category}`,
  allRecipesList: (type) => `https://www.the${type}db.com/api/json/v1/1/search.php?s=`,
  // recipeById: (type, id) => `https://www.the${type}db.com/api/json/v1/1/lookup.php?i=${id}`,
  ingredient: (type, ingrediente) => `https://www.the${type}db.com/api/json/v1/1/filter.php?i=${ingrediente}`,
  name: (type, name) => `https://www.the${type}db.com/api/json/v1/1/search.php?s=${name}`,
  firstLetter: (type, letter) => `https://www.the${type}db.com/api/json/v1/1/search.php?f=${letter}`,
};

export async function requestCategoryButtons(pag, id) {
  const typePag = pag === 'meals-all' ? 'meal' : 'cocktail';
  const URL = dataToggleUrl[id](typePag);
  try {
    const request = await fetch(URL);
    const response = await request.json();
    return await Object.values(response)[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function requestFetchAll(pag, id) {
  const typePag = pag === 'meals-all' ? 'meal' : 'cocktail';
  const URL = dataToggleUrl[id](typePag, typePag);
  try {
    const request = await fetch(URL);
    const response = await request.json();
    return await Object.values(response)[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const fetchApi = async (pag, key, id) => {
  const typePag = pag === 'foods' ? 'meal' : 'cocktail';
  const URL = dataToggleUrl[key](typePag, id);
  const invalid = key === 'firstLetter' && id.length > 1;
  if (invalid) {
    alert('Your search must have only 1 (one) character');
    return null;
  }
  try {
    const request = await fetch(URL);
    const response = await request.json();
    if (Object.values(response)[0] === null) {
      alert('Sorry, we haven\'t found any recipes for these filters.');
      return null;
    }
    return await Object.values(response)[0];
  } catch (error) {
    console.log(error);
    alert('Sorry, we haven\'t found any recipes for these filters.');
    return null;
  }
};
