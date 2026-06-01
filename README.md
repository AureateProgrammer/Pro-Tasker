# Pro-Tasker Backend

A Node.js + Express backend API for the Pro-Tasker full-stack MERN project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT
- `GET /api/auth/me` - Get current user profile (protected)

### Projects
- `GET /api/projects` - Get all projects for logged-in user
- `POST /api/projects` - Create a new project
- `GET /api/projects/:projectId` - Get a single project
- `PUT /api/projects/:projectId` - Update a project
- `DELETE /api/projects/:projectId` - Delete a project

### Tasks
- `GET /api/projects/:projectId/tasks` - List tasks for a project
- `POST /api/projects/:projectId/tasks` - Create a task in a project
- `GET /api/projects/:projectId/tasks/:taskId` - Get a specific task
- `PUT /api/projects/:projectId/tasks/:taskId` - Update a task
- `DELETE /api/projects/:projectId/tasks/:taskId` - Delete a task
