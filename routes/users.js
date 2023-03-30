const router = require("express").Router();
const { find } = require("../models/User");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Add User
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC),
        role: req.body.role,
    });

    try {
        const savedUser = await newUser.save();
        const { password, ...others } = savedUser._doc;
        res.status(201).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get User
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get All Users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Delete User
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;