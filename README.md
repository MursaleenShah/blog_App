# RBAC Blog Platform
A full-stack Role-Based Access Control (RBAC) blog application where:

Users can view posts.

Admins can create, update, and delete posts.

## Project Structure

/backend
/frontend

Backend: Node.js + Express + MongoDB

Frontend: React + TailwindCSS

## Features
JWT Authentication

Role-based authorization (User / Admin)

Admins can create, update, delete posts

Public users can view all posts

Protected routes for admins

## Backend Setup (Node.js + Express)
Prerequisites
Node.js installed

MongoDB Atlas account or local MongoDB server

.env file with environment variables

## Install dependencies
cd backend
npm install

## Create .env file
Inside backend folder, create a .env file:
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Replace variables accordingly.

Run the server
nodemon index.js

## Important Backend API Routes

| Method | Route            | Description  | Access |
|--------|------------------|--------------|--------|
| GET    | /api/posts/      | Get all posts| Public |
| GET    | /api/posts/:id   | Get a single post | Public |
| POST   | /api/posts/      | Create a post | Admin |
| PUT    | /api/posts/:id   | Update a post | Admin |
| DELETE | /api/posts/:id   | Delete a post | Admin |


## Frontend Setup (React + TailwindCSS)

## Prerequisites
Node.js installed

## Install dependencies
cd frontend
npm install

## Set up environment variables
Create .env file  inside the frontend/ folder and add url like:
VITE_BACKEND_URL="http://localhost:5000"


Run the frontend
npm run dev
It will connect to your backend

## Authentication is handled using JWT tokens attached in the Authorization header as:
Authorization: Bearer your_token_here

