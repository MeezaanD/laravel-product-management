# Product Management System

A Laravel application for managing products, including features for creating, editing, and deleting products, as well as managing their details such as name, price, description, and stock quantity.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **PHP** (8.x or above recommended)
- **Composer** (PHP package manager)
- **Laravel** (for developing and running the Laravel application)
- **SQLite** (for local database setup)
- **Node.js & npm** (for managing frontend dependencies)

---

## Installation & Setup

### 1. Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/MeezaanD/laravel-product-management
```

Navigate to the project directory:

```bash
cd laravel-product-management
```

### 2. Install Dependencies

Install PHP dependencies using Composer:

```bash
composer install
```

Install frontend dependencies using npm:

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Set up the SQLite database by ensuring the following line is present in `.env`:

```plaintext
DB_CONNECTION=sqlite
```

Create the SQLite database file:

```bash
touch database/database.sqlite
```

### 4. Generate Application Key

Generate the Laravel application key for secure encryption:

```bash
php artisan key:generate
```

### 5. Run Migrations

Set up the database schema by running migrations:

```bash
php artisan migrate
```

---

## Running the Application

Start the Laravel development server:

```bash
php artisan serve
```

The application will be available at **http://localhost:8000**.

---

## Frontend Development

To compile and watch frontend assets during development:

```bash
npm run dev
```

For production optimization and minification of frontend assets:

```bash
npm run build
```

---

### Happy Coding! 🚀

