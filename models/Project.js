const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    startAt: { type: Date, default: Date.now, required: true },
    endAt: { type: Date, required: true },
    ownerId: { type: ObjectId, ref: 'User' },
}, { timestamps: true });


module.exports = mongoose.model("Project", ProjectSchema);