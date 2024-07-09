export interface Recipe {
  url: string;
  label: string;
  images: {
    THUMBNAIL: {
      url: string;
    };
  };
  calories: number;
  totalNutrients: {
    CHOCDF: { quantity: number; unit: string; };
    PROCNT: { quantity: number; unit: string; };
    SUGAR: { quantity: number; unit: string; };
    NA: { quantity: number; unit: string; };
  };
}

interface Hit {
  recipe: Recipe;
}

export class RecipeAPI {
  async getRecipes(searchTerm: string) {
    try {
      const res = await fetch(`/api/recipes?q=${searchTerm}`);
      if (!res.ok) {
        throw new Error('API request failed with status ' + res.status);
      }
      const json = await res.json();
      return this.processRecipes(json.hits);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  processRecipes(hits: Hit[]) {
    return hits.map(hit => {
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