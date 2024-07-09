require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Comment to test workflow
app.use(express.json());
app.use(express.static('public'));

app.get('/api/recipes', async (req, res) => {
  const searchTerm = req.query.q;
  const appId = process.env.RECIPE_APP_ID;
  const apiKey = process.env.RECIPE_API_KEY;
  const path = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${appId}&app_key=${apiKey}`;

  try {
    const apiRes = await fetch(path);
    const json = await apiRes.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));