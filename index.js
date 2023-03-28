const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const projectRoute = require("./routes/projects");
const skillRoute = require("./routes/skills");
const studentSkillRoute = require("./routes/students_skills");
const projectSkillRoute = require("./routes/project_skills");
const enrollementRoute = require("./routes/enrollements");
const multer = require('multer');

app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to Mongo db")).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);
app.use('/api/skills', skillRoute);
app.use('/api/student/skills', studentSkillRoute);
app.use('/api/project/skills', projectSkillRoute);
app.use('/api/enrollements', enrollementRoute);




app.listen(PORT, () => {
    console.log("is connected!!");
})

// , {
//     useNewUrlParser: true, useUnifiedTopology: true
// }