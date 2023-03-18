const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const SkillStudentSchema = new mongoose.Schema({
    studentId: { type: ObjectId, ref: 'User' },
    skillId: { type: ObjectId, ref: 'Skill' },
    skillType: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model("SkillStudent", SkillStudentSchema);