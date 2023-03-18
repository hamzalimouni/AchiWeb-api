const Student_Skill = require("../models/Student_Skill");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();


// Create Student's Skill
router.post("/", verifyToken, async (req, res) => {
    const newStudentSkill = new Student_Skill(req.body);
    try {
        const savedStudentSkill = await newStudentSkill.save();
        res.status(200).json(savedStudentSkill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Student's Skill
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedStudentSkill = await Student_Skill.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedStudentSkill);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get All Student's Skills
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const studentSkills = await Student_Skill.findById(req.params.id);
        res.status(200).json(studentSkills);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Student's Skill
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Student_Skill.findByIdAndDelete(req.params.id);
        res.status(200).json("Student's skills has been deleted with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;