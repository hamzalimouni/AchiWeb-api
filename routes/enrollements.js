const Enrollement = require("../models/Enrollement");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization, verifyTokenAndOwner, verifyTokenAndOwnerOnRUD } = require("./verifyToken");

const router = require("express").Router();


router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const enrollements = await Enrollement.find();
        res.status(200).json(enrollements);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const enrollements = await Enrollement.findById(req.params.id);
        res.status(200).json(enrollements);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create Project's Skill
router.post("/", verifyToken, async (req, res) => {
    const newEnrollement = new Enrollement(req.body);
    try {
        const savedEnrollement = await newEnrollement.save();
        res.status(200).json(savedEnrollement);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update Enrollement
router.put("/:id", verifyTokenAndOwnerOnRUD, async (req, res) => {
    try {
        const updatedEnrollement = await Enrollement.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedEnrollement);
    } catch (error) {
        res.status(500).json(error);
    }
});

// // Get All Project's Skills
// router.get("/find/:id", verifyToken, async (req, res) => {
//     try {
//         const projectSkills = await Project_Skill.findById(req.params.id);
//         res.status(200).json(projectSkills);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// Delete Enrollement
router.delete("/:id", verifyTokenAndOwnerOnRUD, async (req, res) => {
    try {
        await Enrollement.findByIdAndDelete(req.params.id);
        res.status(200).json("Enrollement has been deleted with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;