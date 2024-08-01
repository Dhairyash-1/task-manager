# Next.js Task Manager

This is a task manager application built using Next.js 14+ with TypeScript. The application allows users to create, edit, and manage tasks with different statuses, priorities, and deadlines. It also supports drag-and-drop functionality to move tasks between four columns: To Do, In Progress, In Review, and Finished.

## Features

- Create, edit, and delete tasks
- Assign statuses to tasks (To Do, In Progress, In Review, Finished)
- Set task priorities (Urgent, Medium, Low)
- Set deadlines for tasks
- Drag and drop tasks between columns

## Tech Stack

- Next.js 14+
- TypeScript
- React
- Tailwind CSS
- Axios

## Screenshots

![Screenshot 1](https://i.imgur.com/uHRwOIK.png)

## Live Demo

Check out the live demo of the project [here](https://task-manager-inky-beta.vercel.app/).

## Getting Started

Follow the steps below to clone the repository and run the project locally.

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/task-manager.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd task-manager
   ```

3. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

4. **Set up environment variables**

   Copy the `.env.sample` file to `.env` and fill in your MongoDB URI and token secret:

   ```bash
   cp .env.sample .env
   ```

   Edit the `.env` file and add your `MONGODB_URI` and `TOKEN_SECRET` values.

### Running the Project

1. **Start the development server**

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

2. **Open the application in your browser**

   The application should now be running at `http://localhost:3000`.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Contributions are welcome!

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Feel free to customize this README file as needed for your project. If you have any questions or need further assistance, please open an issue in the repository.
