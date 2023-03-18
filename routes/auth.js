const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
    });

    try {
        const savedUser = await newUser.save();
        const { password, ...others } = savedUser._doc;
        res.status(201).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json("Wrong credentials");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const passwordOriginal = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (passwordOriginal !== req.body.password) return res.status(401).json("Wrong Credetials");

        const accessToken = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_SEC, { expiresIn: "3d" });

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
