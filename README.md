# Product Management System

A Laravel application for managing products, including features for creating, editing, and deleting products, as well as managing their details such as name, price, description, and stock quantity.

---

## Prerequisites

Before running the application, make sure you have the following installed:

- **PHP** (preferably 8.x or above)
- **Composer** (PHP package manager)
- **Laravel** (for developing and running the Laravel application)
- **SQLite** (for local database setup)
- **Node.js and npm** (for managing frontend dependencies)

---

## Steps to Clone and Run the Application

```bash

1. Clone the Repository

Start by cloning the repository to your local machine using Git.

git clone https://github.com/MeezaanD/laravel-product-management
After cloning, navigate to the project directory:

cd laravel-product-management

2. Install Dependencies
Install the PHP dependencies using Composer:

composer install
This will install all required PHP libraries for the backend.

Next, install the frontend dependencies with npm:

npm install
This will install the necessary packages for the frontend (CSS, JavaScript, etc.).

3. Set Up the Environment
Copy the .env.example file to create your own environment configuration file:

cp .env.example .env

Open the .env file and set up the SQLite database by ensuring the following line is present:
DB_CONNECTION=sqlite
Create the SQLite database file:

touch database/database.sqlite
4. Generate Application Key
Generate the Laravel application key for secure encryption:

php artisan key:generate
This will automatically set the APP_KEY in the .env file.

5. Run Migrations
Run the migrations to set up the database schema:

php artisan migrate
This will create the necessary tables for managing products in the SQLite database.

Running the Application
Now that everything is set up, you can run the Laravel development server:

php artisan serve
This will start the application at http://localhost:8000. AND BEGIN FROM HERE

Frontend Development
To compile and watch frontend assets, use the following command:

npm run dev
This will start the development environment, which will automatically refresh your browser whenever changes are made.

If you want to prepare the assets for production, run:

npm run build
This will optimize and minify the frontend assets for a production environment.
