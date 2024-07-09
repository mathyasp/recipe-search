# Recipe API

The Recipe API is a TypeScript-based solution designed to fetch and process recipes from a specified endpoint. It provides a structured way to retrieve recipes based on a search term and process the results into a more consumable format.

## Features

- **Fetch Recipes**: Send a request to the `/api/recipes` endpoint with a query parameter to search for recipes.
- **Process Recipes**: Converts the raw API response into a structured format, making it easier to consume in applications.

## Interfaces

### `Recipe`

Represents the structure of a recipe, including:

- `url`: The URL to the recipe.
- `label`: The name of the recipe.
- `images`: Contains URLs to the recipe's images, including a thumbnail.
- `calories`: The total calories of the recipe.
- `totalNutrients`: Detailed information about the recipe's nutrients, including carbohydrates (CHOCDF), protein (PROCNT), sugars (SUGAR), and sodium (NA).

### `Hit`

Represents a single search result, containing a `Recipe`.

## Class `RecipeAPI`

### Methods

#### `async getRecipes(searchTerm: string)`

Fetches recipes based on the provided search term. Throws an error if the API request fails.

#### `processRecipes(hits: Hit[])`

Processes the raw search hits into a structured format, extracting and formatting relevant information from each recipe.

## Usage

To use the Recipe API, create an instance of the `RecipeAPI` class and call the `getRecipes` method with your desired search term. The method returns a promise that resolves to an array of processed recipes.

```typescript
import { RecipeAPI } from './path/to/recipeAPI';

const api = new RecipeAPI();
api.getRecipes('chicken')
  .then(recipes => console.log(recipes))
  .catch(error => console.error(error));
```

## Installation
To integrate the Recipe API into your project, ensure you have TypeScript and the necessary dependencies installed. Then, include the recipeAPI.ts file in your project.

## Contributing
Contributions to the Recipe API are welcome. Please ensure to follow the project's coding standards and submit your pull requests for review.

## License
This project is licensed under the MIT License - see the LICENSE file for details.