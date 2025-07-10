Formula One Insight Dashboard
A full-stack web application for exploring, analyzing, and visualizing Formula One data. The project is organized into a .NET backend (API, data access, services, and models) and a modern React frontend.
Features
Browse Circuits, Drivers, Teams, and Races
View Detailed Statistics and Results
Interactive Data Visualizations
RESTful API for Data Access
Modular, Scalable Architecture
Project Structure
Apply to TeamDetailsP...
Getting Started
Prerequisites
.NET 8 SDK
Node.js (v18+)
SQL Server (or change connection string for your DB)
Visual Studio 2022+ (recommended for C#)
Backend Setup
Restore & Build
Apply to TeamDetailsP...
Run
Apply Migrations & Update Database
Apply to TeamDetailsP...
Run
Run the API
Apply to TeamDetailsP...
Run
The API will start on https://localhost:5001 (or as configured).
Frontend Setup
Install Dependencies
Apply to TeamDetailsP...
Run
Run the Frontend
Apply to TeamDetailsP...
Run
The app will be available at http://localhost:5173 (default Vite port).
API Overview
RESTful endpoints for Circuits, Drivers, Teams, Races, and Results
See F1API/Controllers/ for available endpoints
Example: GET /api/driver, GET /api/circuit/{id}
Development Notes
Database Migrations: Managed via Entity Framework Core in the DAO project.
Models & DTOs: Shared in the Models project for consistency.
Repository Pattern: Used for data access abstraction.
Service Layer: Encapsulates business logic.
Frontend: Built with React, TypeScript, and Vite.
Contributing
Fork the repo
Create a feature branch (git checkout -b feature/your-feature)
Commit your changes
Push to the branch
Open a Pull Request
License
This project is licensed under the MIT License.
Acknowledgements
Formula 1 Official Data
React
ASP.NET Core
Entity Framework Core
