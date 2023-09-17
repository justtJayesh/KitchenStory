const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
    {},
    {
        versionKey: false,
    }
);

const RecipeModel = mongoose.model("recipes", recipeSchema);

module.exports = { RecipeModel };
