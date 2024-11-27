# Project Laravel + Inertia + React

## Steps to run the project

1. **Clone the repository**:
    ```bash
    git clone <repo-url>
    ```

2. **Install Laravel dependencies**:
    - Laravel menggunakan Composer untuk mengelola dependensi PHP. Jalankan perintah berikut untuk menginstalnya:
    ```bash
    composer install
    ```

3. **Install Node.js dependencies**:
    - Project ini menggunakan npm atau yarn untuk mengelola dependensi JavaScript (React, Inertia). Pilih salah satu:
    
    - **Jika menggunakan npm**:
    ```bash
    npm install
    ```
    
    - **Jika menggunakan yarn**:
    ```bash
    yarn install
    ```

4. **Copy `.env.example` to `.env`**:
    - Setelah meng-clone, file `.env` akan hilang. perlu menyalin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi lokal sesuai dengan kebutuhan (misalnya, database, mail, API keys, dll):
    ```bash
    cp .env.example .env
    ```

5. **Generate the Laravel application key**:
    - Laravel memerlukan aplikasi key yang unik. Jalankan perintah berikut untuk meng-generate key tersebut:
    ```bash
    php artisan key:generate
    ```

6. **Set up your database**:
    - Pastikan database sudah ada dan konfigurasi `.env` sudah sesuai. Setelah itu, jalankan migrasi database untuk mempersiapkan struktur tabel:
    ```bash
    php artisan migrate
    ```

7. **Run frontend build (React)**:
    - Jalankan build untuk aplikasi frontend (React). Pastikan `npm` atau `yarn` sudah terpasang.
    ```bash
    npm run dev  # atau yarn dev
    ```

8. **Run Laravel development server**:
    - Sekarang bisa menjalankan server Laravel untuk menjalankan aplikasi di localhost:
    ```bash
    php artisan serve
    ```

9. **Access the application**:
    - Setelah langkah-langkah di atas, aplikasi dapat diakses melalui:
    ```
    http://localhost:8000
    ```

## Additional Notes:
- Pastikan sudah menginstal PHP, Composer, Node.js, npm/yarn.
- File-file yang di-ignore, seperti `.env`, `node_modules`, dan `vendor`, tidak akan ter-clone ke repository. Pastikan untuk menginstal dependensi yang diperlukan dengan menjalankan `composer install` dan `npm install` atau `yarn install` setelah clone.
- Jangan lupa untuk menyesuaikan konfigurasi `.env` sesuai dengan lokal.
- Jalankan Vite atau Webpack dan Laravel secara bersamaan (npm run dev & php artisan serve)

