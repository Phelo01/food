'use strict';
// const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes`;

const show = function(recipe){
    const html = `
    <div class="showRecipe">
        <h2 class="title">${recipe.title}</h2>
        <img src="${recipe.image}" alt="" class="pizzaImg">
        <p class="description">the food will take ${recipe.cookingTime} minute to cook with ${recipe.servings} servings </p>
    </div>
    `;
    document.querySelector('.showRecipe').innerHTML = ''
    document.querySelector('.showRecipe').insertAdjacentHTML('afterbegin', html)
}

console.log('xeno elewa')
console.log('testing git');

const pizzaRecipe = async function () {
    try {
        const id = window.location.hash.slice(1);
        console.log(id)
        // const res = await fetch(`${url}/${id}`);
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const info = await res.json();
        if (!res.ok) throw new Error('not found');

        let {recipe} = info.data;
        recipe = {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        image: recipe.image_url,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title
        };

        show(recipe)
    } catch (error) {
        console.error(error)
    };
};

const searchRecipe = async function (query) {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
    const info = await res.json();
    if (!res.ok) throw new Error('not found');
    console.log(info.data.recipes)
}


document.querySelector('.search').addEventListener('submit', function(e){
    e.preventDefault();
    // alert('phelo loves omoge');
    const query = document.querySelector('.search_input').value;
    if (!query) return;
    searchRecipe(query);
})

window.addEventListener('hashchange', pizzaRecipe)
window.addEventListener('load', pizzaRecipe)


