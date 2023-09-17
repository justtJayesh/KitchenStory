const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
    },
    {
        versionKey: false,
    }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
