document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const search = document.getElementById('search');
  const recipeList = document.getElementById('recipe-list');
  let currentPage = 1;
  const itemsPerPage = 10;
  let results = []; 
  
  const recipes = new RecipeAPI();

  const renderRecipes = (recipes, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = recipes.slice(startIndex, endIndex);
    recipeList.innerHTML = ''; 
    paginatedItems.forEach((hit, index) => {
      const li = document.createElement('li');
      const recipeName = document.createElement('h2');
      recipeName.textContent = hit.recipe.label;
      li.appendChild(recipeName);
      const recipeLink = document.createElement('a');
      recipeLink.href = hit.recipe.url;
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
    const json = await recipes.getRecipes(searchTerm);
    results = json.hits; 
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