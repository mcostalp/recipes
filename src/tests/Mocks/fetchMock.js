import oneMeal from './data/oneMeal'
import oneDrink from "./data/oneDrink";
import drinks from './data/drinks'
import otherDrinks from './data/otherDrinks';
import newMeals from './data/newMeals'
import meals from './data/meals'
import { mealsCateg, drinksCateg } from './data/newCategories';
import drinksByIngredient from './data/drinksByIngredient'
import mealsByIngredient from './data/mealsByIngredient'
import beefMeals from './data/beefMeals';
import breakfastMeals from './data/breakfastMeals';
import chickenMeals from './data/chickenMeals';
import dessertMeals from './data/dessertMeals'
import goatMeals from './data/goatMeals'
import ordinaryDrinks from './data/ordinaryDrinks'
import cocktailDrinks from './data/cocktailDrinks'
import shakeDrinks from './data/shakeDrinks';
import cocoaDrinks from './data/cocoaDrinks';




  const gigaMock = (type, param = '') => {
    jest.spyOn(global, 'fetch')
    .mockImplementation((endPoint) => Promise.resolve({
      json: async () => {
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/lookup.php?i=${param}`) return  type === 'themeal' ? oneMeal : oneDrink //id
        if (endPoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return otherDrinks //recommendations
        if (endPoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return newMeals //recommendations
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/list.php?c=list`) return type === 'themeal' ? mealsCateg : drinksCateg //category btn
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/filter.php?i=${param}`) return type === 'themeal' ? mealsByIngredient : drinksByIngredient //filter ingredient
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/search.php?s=${param}`) return type === 'themeal' ? meals : drinks //filter name
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/search.php?f=${param}`) return type === 'themeal' ? meals : drinks //filter firstLetter
        if (endPoint.includes(`https://www.${type}db.com/api/json/v1/1/filter.php?c=`)) {
          let category;
          category = endPoint.replace(`https://www.${type}db.com/api/json/v1/1/filter.php?c=`, '')
          if (type === 'themeal') {
            if(category === 'Beef') return beefMeals
            if(category === 'Breakfast') return breakfastMeals
            if(category === 'Chicken') return chickenMeals
            if(category === 'Dessert') return dessertMeals
            if(category === 'Goat') return goatMeals
            return console.log('Error: Link da categoria de food não encontrada')
          } else {
            if(category === 'Ordinary Drink') return ordinaryDrinks
            if(category === 'Cocktail') return cocktailDrinks
            if(category === 'Shake') return shakeDrinks
            if(category === 'Other/Unknown') return otherDrinks
            if(category === 'Cocoa') return cocoaDrinks
            return console.log('Error: Link da categoria de drink não encontrada')
          }
        }
      }
    }))
  }

  export default gigaMock;