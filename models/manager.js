const mongoose = require("mongoose");

// Manager Schema
const managerSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "name can't be blank"]
    },
    taskId: {
        type: String,
        required: [true, "taskId can't be blank"],
        unique: true
    },
    status: {
        type: String
    },
    assignTo: {
        type: String,
        required: [true, "User Id can't be blank"]
    },
    points: { type: String }
}, {
    timestamps: true
});

module.exports = {
    managers: mongoose.model("managers", managerSchema)
};