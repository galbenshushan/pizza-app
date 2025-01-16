# Pizza Orders Project

## Introduction

This is a Pizza Orders application with a frontend built using Vite, a Node.js backend, and MongoDB as the database. 
This repository provides the necessary files to run the application with Docker and Docker Compose.

## Project Structure

- **Frontend**: A Vite app running on port `8080` that serves the user interface for pizza orders.
- **Backend**: A Node.js app running on port `3000` that handles API requests and communicates with the MongoDB database.
- **MongoDB**: 

## Prerequisites

Before running the project, ensure the following tools are installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

### 2. Build and Run the Containers
To build and run all services (frontend, backend, and MongoDB), use Docker Compose:

docker-compose up -d

This will:

Build the frontend from the ./frontend/pizza-orders directory.
Build the backend from the ./backend directory.
Fill the data with the `pizza-orders.orders` file that in the repo and run MongoDB container on localhost:27018





### MongoDB Replica Set Setup and Watch Functionality

I intended to use a MongoDB Replica Set for enabling the watch functionality, which is blocked on standalone instances. 
The reason I wanted to use watch was to monitor changes in the database in real-time, allowing the application to react dynamically to data updates. 
However, due to issues with the replica set configuration in the Docker environment, I was unable to complete the setup, preventing the use of watch as planned.


