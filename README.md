# Natours CRUD API

This is a CRUD (Create, Read, Update, Delete) API for managing tours. It provides endpoints for creating, retrieving, updating, and deleting tours.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## API Endpoints

### Tours

- `GET /api/v1/tours`: Get all tours
- `GET /api/v1/tours/:id`: Get a specific tour by ID
- `POST /api/v1/tours`: Create a new tour
- `PATCH /api/v1/tours/:id`: Update a specific tour by ID
- `DELETE /api/v1/tours/:id`: Delete a specific tour by ID

### Authentication (Optional)
#### Implementing (comming soon)

<!-- If your API requires authentication, you can include the following endpoints:

- `POST /api/auth/signup`: User sign up
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout -->

### Other Endpoints

Includes other relevant endpoints specific to this project.
#### Get Tour stats
- GET api/v1/tours/tour-stats

#### Monthly Plan (specify the year)
- GET api/v1/tours/monthly-plan/2021

#### Top 5 Affordable
- GET api/v1/tours/top-5-cheap

## Getting Started

### Prerequisites

- Node.js
- MongoDB 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SOUMOJIT-CHAKRABORTY/Natours-Project.git
   
   cd Natours-Project
   npm install
   ```
 #### Check package.json for start commands🙂  
 

   

