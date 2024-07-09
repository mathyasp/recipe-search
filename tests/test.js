const RecipeAPI = require('../public/recipeAPI.js');
const api = new RecipeAPI();

global.fetch = jest.fn();

describe('RecipeAPI', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ hits: [] }),
    }));
  });

  it('getRecipes returns formatted recipes', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          hits: [
            {
              recipe: {
                url: "http://example.com/recipe",
                label: "Test Recipe",
                images: {
                  THUMBNAIL: {
                    url: "http://example.com/image.jpg"
                  }
                },
                calories: 200,
                totalNutrients: {
                  CHOCDF: {
                    quantity: 20,
                    unit: "g"
                  },
                  PROCNT: {
                    quantity: 10,
                    unit: "g"
                  },
                  SUGAR: {
                    quantity: 5,
                    unit: "g"
                  },
                  NA: {
                    quantity: 1.5,
                    unit: "mg"
                  }
                }
              }
            }
          ]
        })
      })
    );

    const api = new RecipeAPI();
    const recipes = await api.getRecipes('chicken');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/recipes?q=chicken');
    expect(recipes).toEqual([
      {
        url: "http://example.com/recipe",
        name: "Test Recipe",
        thumbnailUrl: "http://example.com/image.jpg",
        calories: "200.00",
        carbs: "20.00 g",
        protein: "10.00 g",
        sugars: "5.00 g",
        sodium: "1.50 mg"
      }
    ]);
  });

  it('getRecipes handles network errors', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));

    const api = new RecipeAPI();

    try {
      await api.getRecipes('chicken');
    } catch (error) {
      // Assert that the error message is as expected
      expect(error.message).toBe('API is down');
    }
  });

  it('handles API failure with status code 500', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: "Internal Server Error" }),
      })
    );

    try {
      await api.getRecipes('chicken');
    } catch (error) {
      expect(error.message).toContain('API request failed with status 500');
    }
  });
});