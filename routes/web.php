<?php

use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\finance\FinanceController;
use App\Http\Controllers\hr\HumanResourceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\warehouse\WarehouseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
    // as
});

Route::middleware('auth', 'verified')->group(function () {

    // Admin
    Route::middleware('rolechecking:admin')->group(function(){
        // view
        Route::get('/admin/dashboard', [AdminController::class, 'view'])->name('admin.dashboard');
        Route::get('/admin/user', [AdminController::class, 'userView'])->name('admin.user');
        Route::get('/admin/inbound', [AdminController::class, 'inboundView'])->name('admin.inbound');
        Route::get('/admin/outbound', [AdminController::class, 'outboundView'])->name('admin.outbound');
        Route::get('/admin/stock', [AdminController::class, 'stockView'])->name('admin.stock');
        Route::get('/admin/shipment', [AdminController::class, 'shipmentView'])->name('admin.shipment');
    });

    // Finance (fnc)
    Route::middleware('rolechecking:fnc')->group(function(){
        // view
        Route::get('/finance/dashboard', [FinanceController::class, 'view'])->name('finance.dashboard');
        Route::get('/finance/income', [FinanceController::class, 'incomeView'])->name('finance.income');      
    });

    // Human Resource (hr)
    Route::middleware('rolechecking:hr')->group(function(){
        // view
        Route::get('/hr/dashboard', [HumanResourceController::class, 'view'])->name('hr.dashboard');
        // coba
    });

    // Warehouse/Inventory (wrhs)
    Route::middleware('rolechecking:wrhs')->group(function(){
        // view
        Route::get('/wrhs/dashboard', [WarehouseController::class, 'view'])->name('wrhs.dashboard');
        Route::get('/wrhs/inbound', [WarehouseController::class, 'inboundView'])->name('wrhs.inbound');
        Route::get('/wrhs/outbound', [WarehouseController::class, 'outboundView'])->name('wrhs.outbound');
        Route::get('/wrhs/stock', [WarehouseController::class, 'stockView'])->name('wrhs.stock');
        Route::get('/wrhs/shipment', [WarehouseController::class, 'shipmentView'])->name('wrhs.shipment');
    });

    // Profile User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
