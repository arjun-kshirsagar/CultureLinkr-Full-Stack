const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title });
  res.status(201).json(task);
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await Task.findByPk(id);
  if (task) {
    task.title = title !== undefined ? title : task.title;
    task.completed = completed !== undefined ? completed : task.completed;
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleted = await Task.destroy({ where: { id } });
  res.status(deleted ? 204 : 404).json({});
};
