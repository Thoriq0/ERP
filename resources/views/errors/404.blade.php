<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404 | Page Not Found</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100 text-gray-800 flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-7xl font-bold text-gray-900">404</h1>
        <p class="mt-4 text-xl text-gray-600">The page you are looking for could not be found.</p>

        <button
            onclick="window.history.back()"
            class="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
            Back to Previous Page
        </button>
    </div>
</body>
</html>
