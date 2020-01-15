import axios from 'axios'

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: 'https://www.themealdb.com/api/json/v2/9973533',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function getLatest() {
  var res = []
  return userApiClient.get('/Latest.php')
  .then(async (response)=> {
    await response.data.meals.forEach((meal)=>{

      res.push({name : meal.strMeal,
      id : meal.idMeal,
      pic :meal.strMealThumb})
    })
    return {results : res, error:false}
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}

function getRandom() {
  var res = []
  return userApiClient.get('/randomselection.php')
  .then(async (response)=> {
    await response.data.meals.forEach((meal)=>{

      res.push({name : meal.strMeal,
      id : meal.idMeal,
      pic :meal.strMealThumb})
    })
    return {results : res, error:false}
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}

function getMeals(meal){
  var res = []
  return userApiClient.get('/search.php?s='+meal)
  .then(async (response)=> {
    if(response.data.meals!==null){
    await response.data.meals.forEach((meal)=>{

      res.push({name : meal.strMeal,
      id : meal.idMeal,
      pic :meal.strMealThumb})
    })
    }
    return {results : res, error:false}
  })
  .catch(function (error) {
    console.warn(error)
    return {results:'error',error:error}
  });
}

function getIngredients(){
  var res = []
  return userApiClient.get('list.php?i=list')
  .then(async (response)=> {
    await response.data.meals.forEach((meal)=>{

      res.push({name : meal.strIngredient,
      id : meal.idIngredient,
      pic :"https://www.themealdb.com/images/ingredients/"+meal.strIngredient+"-Medium.png"})
    })

    return {results : res, error:false}
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}


function getMealByName(name){
  return userApiClient.get('search.php?s='+name)
  .then(function (response) {
    return response.data.meals[0]
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}


function getMealsByArea(name){
  return userApiClient.get('filter.php?a='+name)
  .then(async function (response) {
    var json = []
    await response.data.meals.forEach(meal =>{
      json.push({name:meal.strMeal,pic:meal.strMealThumb})
    })
    return json;
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}

function getMealsByCategory(name){
  return userApiClient.get('filter.php?c='+name)
  .then(async function (response) {
    var json = []
    await response.data.meals.forEach(meal =>{
      json.push({name:meal.strMeal,pic:meal.strMealThumb})
    })
    return json;
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}

function getMealsByIngredients(name){
  return userApiClient.get('/filter.php?i='+name)
  .then(async function (response) {
    var json = []
    await response.data.meals.forEach(meal =>{
      json.push({name:meal.strMeal,pic:meal.strMealThumb})
    })
    return json;
  })
  .catch(function (error) {
    return {results:'error',error:error}
  });
}



export const drinksService = {
  getIngredients,
  getMeals,
  getRandom,
  getLatest,
  getMealByName,
  getMealsByArea,
  getMealsByCategory,
  getMealsByIngredients,
}
