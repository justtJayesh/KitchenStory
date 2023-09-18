const { Router } = require("express");
const axios = require("axios");
const { RecipeModel } = require("../model/Recipes.model");
const { UserModel } = require("../model/User.model");
require("dotenv").config();

const recipesRoute = Router();

// Random
recipesRoute.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=9`
        );
        const recipeData = response.data.recipes;
        res.status(200).json(recipeData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Saving
recipesRoute.get("/save", async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${query}/information?apiKey=${process.env.API_KEY}`
        );
        const recipeData = response.data;

        
        res.status(200).json(recipeData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Searching
recipesRoute.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${query}&number=10`
        );
        const recipeData = response.data.results;
        res.status(200).json(recipeData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = { recipesRoute };
