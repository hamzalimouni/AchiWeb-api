const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    level: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Skill", SkillSchema);