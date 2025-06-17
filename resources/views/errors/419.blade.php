<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>419 | Page Expired</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100 text-gray-800 flex items-center justify-center min-h-screen">
    <div class="text-center">
        <h1 class="text-7xl font-bold text-gray-900">419</h1>
        <p class="mt-4 text-xl text-gray-600">Session expired. Please login again.</p>
        <a href="{{ route('login') }}" class="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Go to Login
        </a>
    </div>
</body>
</html>
