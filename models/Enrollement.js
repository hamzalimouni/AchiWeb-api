const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const EnrollementSchema = new mongoose.Schema({
    projectId: { type: ObjectId, ref: 'Project' },
    studentId: { type: ObjectId, ref: 'User' },
    result: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("Enrollement", EnrollementSchema);