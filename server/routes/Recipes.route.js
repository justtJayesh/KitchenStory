const { Router } = require("express");
const axios = require("axios");
const { RecipeModel } = require("../model/Recipes.model");
const { UserModel } = require("../model/User.model");
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
        res.status(400).json({ error: error.message });
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
        res.status(400).json({ error: error.message });
    }
});

recipesRoute.put("/", async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

recipesRoute.get("/savedRecipes/:id", async (req, res) => {
    try {
        const user = await UserModel.findOne(req.body.userID);
        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = { recipesRoute };
