class RecipeAPI {
  async getRecipes(searchTerm) {
    const res = await fetch(`/api/recipes?q=${searchTerm}`);
    const json = await res.json();
    return json.hits.map(hit => {
      const { recipe } = hit;
      return {
        url: recipe.url,
        name: recipe.label,
        thumbnailUrl: recipe.images.THUMBNAIL.url,
        calories: recipe.calories.toFixed(2),
        carbs: recipe.totalNutrients.CHOCDF.quantity.toFixed(2) + ' ' + recipe.totalNutrients.CHOCDF.unit,
        protein: recipe.totalNutrients.PROCNT.quantity.toFixed(2) + ' ' + recipe.totalNutrients.PROCNT.unit,
        sugars: recipe.totalNutrients.SUGAR.quantity.toFixed(2) + ' ' + recipe.totalNutrients.SUGAR.unit,
        sodium: recipe.totalNutrients.NA.quantity.toFixed(2) + ' ' + recipe.totalNutrients.NA.unit
      };
    });
  }
}