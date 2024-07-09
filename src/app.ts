import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import fetch from 'node-fetch'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/recipes', async (req: Request, res: Response) => {
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