# Campaign manager - Installation and Setup

This project is a Laravel application with a React front-end built using the new Laravel 12 stater kit. Follow these instructions to get it up and running on your local machine.

## Prerequisites

* **PHP:** You'll need PHP installed on your system. 
* **Composer:**  PHP's dependency manager.
* **Node.js and npm (or yarn):**
    * **Using Brew to install Node:** `brew install node`
    * **Verify installation:** `node -v` and `npm -v` (or `yarn -v`)


## Installation Steps

1. **Clone the repository:**

   ```bash
   git@github.com:haraldsuurorg/campaign-manager.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd campaign-manager
   ```

3. **Install PHP dependencies:**

   ```bash
   composer install
   ```

4. **Install JavaScript dependencies:**

   ```bash
   npm install  # or yarn install
   ```

5. **Copy the environment file:**

   ```bash
   cp .env.example .env
   ```

6. **Generate an application key:**

   ```bash
   php artisan key:generate
   ```


7. **Run database migrations:**

   ```bash
   php artisan migrate
   ```


8. **Start the development servers:**

   * **If You are using Laravel version 12+ then the development servers can be starter using a single command:**
     ```bash
     composer dev
     ```

     
   * **For older Laravel versions the Laravel and Vite development servers need to be started separately :** 
     ```bash
     # In one terminal window
     php artisan serve
     ```
     
     ```bash
     # In another terminal window
     npm run dev # or yarn dev
     ```
   


## Accessing the Application

Once both servers are running, you can access your application in your web browser at the URL provided by `composer dev` (usually `http://127.0.0.1:8000`). 
Happy advertising!
