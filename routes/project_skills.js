const Project_Skill = require("../models/Project_Skill");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization, verifyTokenAndOwner, verifyTokenAndOwnerOnRUD } = require("./verifyToken");

const router = require("express").Router();


// Create Project's Skill
router.post("/", verifyTokenAndOwner, async (req, res) => {
    const newProjectSkill = new Project_Skill(req.body);
    try {
        const savedProjectSkill = await newProjectSkill.save();
        res.status(200).json(savedProjectSkill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Project's Skill
router.put("/:id", verifyTokenAndOwnerOnRUD, async (req, res) => {
    try {
        const updatedProjectSkill = await Project_Skill.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedProjectSkill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get All Project's Skills
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const projectSkills = await Project_Skill.findById(req.params.id);
        res.status(200).json(projectSkills);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Project's Skill
router.delete("/:id", verifyTokenAndOwnerOnRUD, async (req, res) => {
    try {
        await Project_Skill.findByIdAndDelete(req.params.id);
        res.status(200).json("Project's skills has been deleted with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;