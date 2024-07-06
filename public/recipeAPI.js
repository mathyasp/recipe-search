class RecipeAPI {
  async getRecipes(searchTerm) {
    const res = await fetch(`/api/recipes?q=${searchTerm}`);  
    const json = await res.json();
    return json;
  }
}