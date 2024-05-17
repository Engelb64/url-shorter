<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UrlController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route for the welcome page
Route::get('/', function () {
    return view('index');
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes for the URL Shortener API. These routes allow for URL shortening,
| listing all shortened URLs, and redirecting shortened URLs.
|
*/

// Route to get the list of shortened URLs (GET /api/v1/urls)
Route::get('/api/v1/urls', [UrlController::class, 'index']);

// Route to shorten a URL (POST /api/v1/shorten)
Route::post('/api/v1/shorten', [UrlController::class, 'shorten']);

// Route to redirect a shortened URL (GET /{shortened})
Route::get('/{shortened}', [UrlController::class, 'redirect']);

// Route to delete a URL (DELETE /api/v1/urls/{id})
Route::delete('/api/v1/urls/{id}', [UrlController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Catch-All Route for React
|--------------------------------------------------------------------------
|
| Catch-all route to handle React views. This route ensures that any URL
| not handled by the previous routes is directed to the main view of the
| React application.
|
*/

// Catch-all route for React views (GET /*)
Route::view('/{path?}', 'app')->where('path', '.*');
