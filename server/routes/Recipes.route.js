const { Router } = require("express");
const axios = require("axios");
const { RecipeModel } = require("../model/Recipes.model");
const { UserModel } = require("../model/User.model");
const { user } = require("@nextui-org/react");
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
recipesRoute.post("/save", async (req, res) => {
    const { query, userID } = req.query;

    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${query}/information?apiKey=${process.env.API_KEY}`
        );

        const recipeData = response.data;

        const user = await UserModel.findById(userID);
        // user.savedRecipes.push(recipeData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    const response = axios.get(
        `https://api.spoonacular.com/recipes/${query}/information?apiKey=${process.env.API_KEY}`
    );
    const recipeData = response.data;

    const user = UserModel.findById({ userID });
    user.saverRecipes.push(recipeData);
    user.save();
    res.status(200).json(recipeData);
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
