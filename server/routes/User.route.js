const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");

const userRoute = Router();

userRoute.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.status(200).json({ message: "User Already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const newUser = new UserModel({ username, password: hashPassword });
    await newUser.save();

    res.status(200).json({ message: "User Registered Successfully" });
});

userRoute.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.status(200).json({ message: "User does not exists!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res
            .status(200)
            .json({ message: "Username or Password is Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ token, userID: user._id });
});

module.exports = { userRoute };
