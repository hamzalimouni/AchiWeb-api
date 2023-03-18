const express = require("express");
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

app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL).then(console.log("Connected to Mongo db")).catch((err) => console.log(err));

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