const Project = require('../models/Project');
const Task = require('../models/Task');

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
  });

  res.status(201).json(project);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description ?? project.description;

  const updatedProject = await project.save();
  res.json(updatedProject);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  await Task.deleteMany({ project: project._id });
  await project.deleteOne();

  res.json({ message: 'Project and associated tasks deleted' });
};

exports.getTasks = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  const task = await Task.create({
    title,
    description,
    status,
    project: project._id,
  });

  res.status(201).json(task);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    project: req.params.projectId,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const project = await Project.findById(task.project);
  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    project: req.params.projectId,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const project = await Project.findById(task.project);
  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status || task.status;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.taskId,
    project: req.params.projectId,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const project = await Project.findById(task.project);
  if (!project.owner.equals(req.user._id)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
};
