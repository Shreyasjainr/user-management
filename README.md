# User Management System

A clean and responsive React application for managing users efficiently. Built with TypeScript, React, and Tailwind CSS.

## Features

- View all users in a tabular layout  
- Add, edit, and view user details  
- Assign countries to each user  
- Responsive layout with sidebar navigation  
- Modal-based forms for interactions  
- Toast notifications for quick feedback  

## Tech Stack

- **React 19** – Frontend framework  
- **TypeScript** – Type safety and maintainability  
- **Tailwind CSS** – Utility-first styling  
- **Axios** – API requests  
- **JSON Server** – Mock REST API  
- **React Toastify** – Notifications  

## Installation

1. Navigate to your project directory:
   ```bash
   cd user-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Run both the frontend and backend servers:

**1. Start the JSON Server (Mock API):**
```bash
npm run server
```
Runs at `http://localhost:3001`

**2. Start the React App:**
```bash
npm start
```
Runs at `http://localhost:3000`

## Available Scripts

- `npm start` – Start development server  
- `npm run build` – Create production build  
- `npm test` – Run tests  
- `npm run server` – Start JSON server  

## Project Structure

```
src/
├── components/   # UI components
├── config/       # API configuration
├── services/     # API service functions
├── types/        # Type definitions
├── icons/        # SVG assets
└── App.tsx       # Root component
```

## Usage

- **Add User** – Click “+ New” in the header  
- **Edit/View User** – Use the options menu on each row  
- **Select Countries** – Choose multiple countries per user  

## API Endpoints

- `GET /users` – Fetch all users  
- `POST /users` – Create a new user  
- `PUT /users/:id` – Update a user  
- `GET /countries` – Fetch country list  

Data is stored locally in `db.json`.
