# URL Shortener Project

## Demo

You can see a live demonstration of the project at [http://3.142.90.17/](http://3.142.90.17/).

## Description

This project is a URL shortener application developed with Laravel on the backend and React on the frontend. It allows users to shorten long URLs, list all shortened URLs, and redirect to the original URLs using the shortened ones.

## Features

- Shorten long URLs
- List all shortened URLs
- Redirect to original URLs
- API documentation with Swagger
- Automated testing with PHPUnit

## Technologies Used

- Laravel
- React
- Axios
- Bootstrap
- Swagger for API documentation
- PHPUnit for testing

## Prerequisites

- PHP >= 8.1
- Composer
- Node.js
- NPM or Yarn
- MySQL or any other database compatible with Laravel

## Installation for Develoment

Follow these steps to install and run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```

2. Install PHP dependencies with Composer:

    ```bash
    composer install
    ```

3. Install Node.js dependencies with NPM or Yarn:

    ```bash
    npm install
    # or if you use Yarn
    yarn install
    ```

4. Copy the `.env.example` file to `.env` and set up your database:

    ```bash
    cp .env.example .env
    ```

    Make sure to configure the necessary environment variables in the `.env` file.

5. Generate the application key:

    ```bash
    php artisan key:generate
    ```

6. Run the migrations to create the tables in the database:

    ```bash
    php artisan migrate
    ```

7. Compile the frontend assets:

    ```bash
    npm run dev
    # or if you use Yarn
    yarn dev
    ```

8. Start the development server:

    ```bash
    php artisan serve
    ```

## Installation for Production

Follow these steps to install and run the project in a production environment:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```

2. **Install PHP dependencies with Composer:**

    ```bash
    composer install --optimize-autoloader --no-dev
    ```

3. **Install Node.js dependencies with NPM or Yarn:**

    ```bash
    npm install --production
    # or if you use Yarn
    yarn install --production
    ```

4. **Copy the `.env.example` file to `.env` and set up your database:**

    ```bash
    cp .env.example .env
    ```

    Make sure to configure the necessary environment variables in the `.env` file.

5. **Generate the application key:**

    ```bash
    php artisan key:generate
    ```

6. **Run the migrations to create the tables in the database:**

    ```bash
    php artisan migrate --force
    ```

7. **Compile the frontend assets:**

    ```bash
    npm run build
    # or if you use Yarn
    yarn run build
    ```

8. **Configure Apache to serve the application:**

    Make sure you have Apache configured to point to your application's path. Here's a basic Apache configuration example:

    ```apache
    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/url-shortener/public

        <Directory /var/www/html/url-shortener>
            AllowOverride All
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined
    </VirtualHost>
    ```

9. **Ensure proper permissions for storage and cache:**

    ```bash
    sudo chown -R www-data:www-data /var/www/html/url-shortener/storage
    sudo chown -R www-data:www-data /var/www/html/url-shortener/bootstrap/cache
    ```

10. **Restart Apache to apply the changes:**

    ```bash
    sudo systemctl restart httpd
    ```

With these steps, your application should be up and running in a production environment. 

## Routes

### Web Routes

```php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UrlController;

// Route for the welcome page
Route::get('/', function () {
    return view('index');
});

// Catch-all route for React views (GET /*)
Route::view('/{path?}', 'app')->where('path', '.*');

```

### API Routes

```php
use App\Http\Controllers\UrlController;

// Route to get the list of shortened URLs (GET /api/v1/urls)
Route::get('/api/v1/urls', [UrlController::class, 'index']);

// Route to shorten a URL (POST /api/v1/shorten)
Route::post('/api/v1/shorten', [UrlController::class, 'shorten']);

// Route to redirect a shortened URL (GET /{shortened})
Route::get('/{shortened}', [UrlController::class, 'redirect']);
```

## Project Structure

resources/
  js/
    components/
      App.jsx
      Pagination.jsx
      UrlForm.jsx
      UrlList.jsx
      UrlShorter.jsx
routes/
  web.php
  api.php
app/
  Http/
    Controllers/
      UrlController.php
tests/
  Feature/
    UrlShortenerTest.php

### API Documentation

The API documentation is done with Swagger. Follow these steps to publish and generate the Swagger documentation:

1. **Publish the Swagger configuration:**

    ```bash
    php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"
    ```

2. **Generate the Swagger documentation:**

    ```bash
    php artisan l5-swagger:generate
    ```

3. **Access the documentation:**

    Open your browser and navigate to the following URL to view the API documentation:

    ```url
    http://your-domain/api/documentation
    ```

Replace `your-domain` with your actual domain or IP address where the application is hosted.

With these steps, you will have access to the Swagger-generated API documentation for your project.

### Running Tests

To run automated tests with PHPUnit, use the following command:

```bash
php artisan test
```

## Contributing
Contributions are welcome! If you want to contribute, please follow these steps:

Fork the project
Create a new branch (git checkout -b feature/new-feature)
Make your changes and commit them (git commit -am 'Add new feature')
Push the changes to your branch (git push origin feature/new-feature)
Open a Pull Request

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

```bash
Feel free to adjust any details such as URLs or paths as needed!
```