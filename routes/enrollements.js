const Enrollement = require("../models/Enrollement");
const Project = require("../models/Project");
const User = require("../models/User");
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

router.get("/projects/:id", verifyTokenAndAuthorization, (req, res) => {
    const studentId = req.params.id;
    Enrollement.find({ studentId: studentId })
        .populate("projectId")
        .then(enrollments => {
            // const studentProjects = enrollments.map(enrollment => enrollment.projectId);
            return res.status(200).json(enrollments);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("An error occurred while retrieving the student's projects");
        });
});

// Create Project's Skill
router.post('/', verifyToken, async (req, res) => {
    try {
        const { projectId, studentId, result } = req.body;

        const project = await Project.findById(projectId);
        const student = await User.findById(studentId);

        const enrollment = new Enrollement({
            projectId: project._id,
            studentId: student._id,
            result: result
        });
        await enrollment.save();

        res.status(201).json(enrollment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating enrollment' });
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