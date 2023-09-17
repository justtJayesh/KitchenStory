const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();

const recipesRoute = Router();

recipesRoute.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=6`
        );
        const recipeData = response.data.recipes;
        res.status(200).json(recipeData);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: error.message });
    }
});

recipesRoute.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${query}&number=10`
        );
        const recipeData = response.data.results;
        res.status(200).json(recipeData);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ error: "Error fetching recipe" });
    }
});

module.exports = { recipesRoute };
