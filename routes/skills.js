const Skill = require("../models/Skill");
const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

const router = require("express").Router();


// Create Skill
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newSkill = new Skill(req.body);
    try {
        const savedSkill = await newSkill.save();
        res.status(200).json(savedSkill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Skill
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Skill
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get All Skills
router.get("/", verifyToken, async (req, res) => {
    const query = req.query.level;
    try {
        const skills = query
            ? await Skill.find({ level: { $in: [query], }, })
            : await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete Skill
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.status(200).json("Skill has been deleted with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;