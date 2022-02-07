const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        return res.status(201).json({ task });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findById(taskID);
        if (!task) return res.status(404).json({ message: 'Task Not Found'});
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const updateTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findByIdAndUpdate(taskID, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) return res.status(404).json({ message: 'Task Not Found'});
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const deleteTask = async (req, res) => {
    const { id: taskID } = req.params;
    try {
        const task = await Task.findByIdAndDelete(taskID);
        if (!task) return res.status(404).json({ message: 'Task Not Found'});
        return res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}