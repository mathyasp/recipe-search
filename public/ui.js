document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const search = document.getElementById('search');
  const recipeList = document.getElementById('recipe-list');
  let currentPage = 1;
  const itemsPerPage = 5;
  let results = []; 
  
  const recipes = new RecipeAPI();

  const renderRecipes = (recipes, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = recipes.slice(startIndex, endIndex);
    recipeList.innerHTML = ''; 
    paginatedItems.forEach(recipe => {
      const li = document.createElement('li');

      const recipeThumbnail = document.createElement('img');
      recipeThumbnail.src = recipe.thumbnailUrl;
      li.appendChild(recipeThumbnail);

      const recipeName = document.createElement('h2');
      recipeName.textContent = recipe.name;
      li.appendChild(recipeName);

      const stats = document.createElement('p');
      stats.textContent = `Calories: ${recipe.calories}, Carbs: ${recipe.carbs}, Protein: ${recipe.protein}, Sugars: ${recipe.sugars}, Sodium: ${recipe.sodium}`;
      li.appendChild(stats);

      const recipeLink = document.createElement('a');
      recipeLink.href = recipe.url;
      recipeLink.textContent = "View Recipe";
      recipeLink.target = "_blank";
      li.appendChild(recipeLink);

      recipeList.appendChild(li);
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    currentPage = 1; 

    const searchTerm = search.value;
    results = await recipes.getRecipes(searchTerm); // Directly assign the result
    renderRecipes(results, currentPage);
  });

  document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    renderRecipes(results, currentPage);
    document.getElementById('pageIndicator').textContent = `Page ${currentPage}`;
  });

  document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderRecipes(results, currentPage);
      document.getElementById('pageIndicator').textContent = `Page ${currentPage}`;
    }
  });
});