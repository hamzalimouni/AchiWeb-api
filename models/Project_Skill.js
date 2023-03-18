const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const SkillPojectSchema = new mongoose.Schema({
    projectId: { type: ObjectId, ref: 'Project' },
    skillId: { type: ObjectId, ref: 'Skill' },
    isRequired: { type: Boolean, default: false, },
}, { timestamps: true });


module.exports = mongoose.model("SkillProject", SkillPojectSchema);