const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRoute } = require("./routes/User.route");
const { recipesRoute } = require("./routes/Recipes.route");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", userRoute);
app.use("/recipes", recipesRoute);

mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
    console.log("Server is running...");
});
