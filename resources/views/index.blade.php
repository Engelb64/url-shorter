<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>
    @viteReactRefresh
    @vite(['resources/js/app.js', 'resources/sass/app.scss'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
