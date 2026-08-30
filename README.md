# E-Commerce App with Admin Dashboard

A fullstack admin panel for an e-commerce platform, built with .NET 10 and Angular 21. Manage products, categories, orders, and users with a modern JWT-authenticated API and responsive frontend.

## Tech Stack

**Backend**
- .NET 10 Web API
- Entity Framework Core + SQL Server
- ASP.NET Core Identity for authentication
- JWT Bearer tokens for API security
- Clean architecture with Application, Domain, and Infrastructure layers

**Frontend**
- Angular 21 (standalone components)
- RxJS for state management
- JWT interceptor for automatic token attachment
- Angular guards for route protection
- Tailwind CSS for styling

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 20+ + npm
- SQL Server (or localDB)

### Backend
```bash
cd backend
dotnet restore
dotnet run --project EcommerceAdmin.Api
```

The API will be available at `https://localhost:<port>` (default 5001/5002). Seed data is loaded automatically on first startup.

### Frontend
```bash
cd frontend/e-commerce
npm install
npm run start
```

The dev server starts at `http://localhost:4200`. The Angular app connects to the backend API at `/api/` — make sure the backend is running first.

## Project Structure

```
e-commerce-admin/
├── backend/           ← .NET 10 Web API solution
│   ├── EcommerceAdmin.Api/       ← Controllers, Program, config
│   ├── EcommerceAdmin.Application/← Services, DTOs, interfaces
│   ├── EcommerceAdmin.Domain/    ← Entities (Product, Order, User, etc.)
│   └── EcommerceAdmin.Infrastructure/← EF Core, Repositories, Identity
└── frontend/          ← Angular 21 app
    └── e-commerce/
        ├── src/           ← Components, guards, services, interceptors
        ├── app/           ← Root app component + routes
        └── features/    ← Feature modules (auth, cart, dashboard, orders)
```

## Key Features
- User registration & login with JWT tokens
- Role-based access (Admin vs Customer)
- Product/catalog management
- Order processing with inventory validation
- Refresh token flow with automatic renewal