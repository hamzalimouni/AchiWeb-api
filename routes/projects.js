const router = require("express").Router();
const Project = require("../models/Project");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndOwner, verifyTokenAndOwnerOnRUD } = require("./verifyToken");

// Get Project
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get All Projects
router.get("/", verifyToken, async (req, res) => {
    const query = req.query.competence;
    try {
        const projects = query
            ? await Project.find({ competence: { $in: [query], }, })
            : await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create Project
router.post("/", verifyTokenAndOwner, async (req, res) => {
    const newProduct = new Project(req.body);
    // const currDate = new Date('DD/MM/YYYY');
    const endDate = new Date(req.body.endAt); //YYYY-mm-dd
    const currDate = new Date();
    // currDate.setHours(0, 0, 0, 0);
    try {
        if (endDate > currDate) {
            const savedProject = await newProduct.save();
            res.status(200).json(savedProject);
        }
        else {
            return res.status(500).json("End date must be greater than date now!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update 
router.put("/:id", verifyTokenAndOwner, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });
        res.status(201).json("Project has been updated with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete 
router.delete("/:id", verifyTokenAndOwner, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json("Project has been deleted with successfull");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/owner/:ownerId', async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const projects = await Project.find({ ownerId: ownerId }).exec();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;