const express = require('express');
const router = express.Router({ mergeParams: true });
const protect = require('../middleware/auth');
const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/projectController');

router.use(protect);

router.route('/').get(getProjects).post(createProject);
router.route('/:projectId').get(getProjectById).put(updateProject).delete(deleteProject);
router.route('/:projectId/tasks').get(getTasks).post(createTask);
router.route('/:projectId/tasks/:taskId').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
