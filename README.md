


### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js (v18+)](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server) (or change connection string for your DB)
- [Visual Studio 2022+](https://visualstudio.microsoft.com/) (recommended for C#)

---

### Backend Setup

1. **Restore & Build**
   ```bash
   dotnet restore
   dotnet build
   ```

2. **Apply Migrations & Update Database**
   ```bash
   cd DAO
   dotnet ef database update
   ```

3. **Run the API**
   ```bash
   cd ../F1API
   dotnet run
   ```
   The API will start on `https://localhost:5001` (or as configured).

---

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd "Formula One FE"
   npm install
   ```

2. **Run the Frontend**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

---

## API Overview

- RESTful endpoints for Circuits, Drivers, Teams, Races, and Results
- See `F1API/Controllers/` for available endpoints
- Example: `GET /api/driver`, `GET /api/circuit/{id}`

---

## Development Notes

- **Database Migrations:** Managed via Entity Framework Core in the `DAO` project.
- **Models & DTOs:** Shared in the `Models` project for consistency.
- **Repository Pattern:** Used for data access abstraction.
- **Service Layer:** Encapsulates business logic.
- **Frontend:** Built with React, TypeScript, and Vite.

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Formula 1 Official Data](https://www.formula1.com/)
- [React](https://react.dev/)
- [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
