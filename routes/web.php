<?php

use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\InventoryController;
use App\Http\Controllers\admin\WarehouseUserController;
use App\Http\Controllers\finance\FinanceController;
use App\Http\Controllers\hr\HumanResourceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\warehouse\WarehouseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth', 'verified')->group(function () {

    // ==== ADMIN ====
    Route::middleware('rolechecking:admin')->group(function(){
        // route features inventory/warehouse
        Route::get('/admin/dashboard', [AdminController::class, 'view'])->name('admin.dashboard');
        Route::get('/admin/product', [AdminController::class, 'productView'])->name('admin.product');
        Route::get('/admin/category', [AdminController::class, 'categoryView'])->name('admin.category');
        Route::get('/admin/supplier', [AdminController::class, 'supplierView'])->name('admin.supplier');
        Route::get('/admin/inbound', [AdminController::class, 'inboundView'])->name('admin.inbound');
        Route::get('/admin/outbound', [AdminController::class, 'outboundView'])->name('admin.outbound');
        Route::get('/admin/stock', [AdminController::class, 'stockView'])->name('admin.stock');
        Route::get('/admin/shipment', [AdminController::class, 'shipmentView'])->name('admin.shipment');
        Route::get('/admin/prestock', [AdminController::class, 'prestockView'])->name('admin.prestock');

        // route userwarehouse action & view
        Route::resource('/admin/user', WarehouseUserController::class);

        // route inbound action
        Route::post('/admin/inbound', [InventoryController::class, 'inboundStore'])->name('inventory.inbound.store');
        Route::delete('/admin/inbound/{inbound}', [InventoryController::class, 'inboundDestroy'])->name('inventory.inbound.destroy');

        // route inbound pre-stock
        Route::post('/admin/validatestock', [InventoryController::class, 'validateStock'])->name('inventory.stock.store');
        Route::post('/admin/qcstock', [InventoryController::class, 'qcStock'])->name('inventory.qcstock.store');
        Route::put('/admin/inbound/{inbound}', [InventoryController::class, 'inboundUpdate'])->name('inventory.inbound.update');

        // route outbound action
        Route::post('/admin/outbound', [InventoryController::class, 'outboundStore'])->name('inventory.outbound.store');
        Route::delete('/admin/outbound/{outbound}', [InventoryController::class, 'outboundDestroy'])->name('inventory.outbound.destroy');

        // route supplier action
        Route::post('/admin/supplier', [InventoryController::class, 'supplierStore'])->name('inventory.supplier.store');
        Route::delete('/admin/supplier/{supplier}', [InventoryController::class, 'supplierDestroy'])->name('inventory.supplier.destroy');
        Route::put('/admin/supplier/{supplier}', [InventoryController::class, 'supplierUpdate'])->name('inventory.supplier.update');

        // route product action
        Route::post('/admin/product', [InventoryController::class, 'productStore'])->name('inventory.product.store');
        Route::delete('/admin/product/{product}', [InventoryController::class, 'productDestroy'])->name('inventory.product.destroy');
        Route::put('/admin/product/{product}', [InventoryController::class, 'productUpdate'])->name('inventory.product.update');

        // route category action
        Route::post('/admin/category', [InventoryController::class, 'categoryStore'])->name('inventory.category.store');
        Route::delete('/admin/category/{category}', [InventoryController::class, 'categoryDestroy'])->name('inventory.category.destroy');
        Route::put('/admin/category/{category}', [InventoryController::class, 'categoryUpdate'])->name('inventory.category.update');

        // route account payable action
        Route::put('/admin/ap/{ap}', [InventoryController::class, 'apUpdate'])->name('inventory.ap.update');

        // route features finance
        Route::get('/admin/income', [AdminController::class, 'incomeView'])->name('finance.income');
        Route::get('/admin/outcome', [AdminController::class, 'outcomeView'])->name('finance.outcome');
        Route::get('/admin/budget', [AdminController::class, 'budgetView'])->name('finance.budget');
        Route::get('/admin/ap', [AdminController::class, 'apView'])->name('admin.ap');
        
        // route features human resource
        
        // route features logistics
    });

    // ==== FINANCE (fnc) ====
    Route::middleware('rolechecking:fnc')->group(function(){
        // view
        Route::get('/finance/dashboard', [FinanceController::class, 'view'])->name('finance.dashboard');
        Route::get('/finance/income', [FinanceController::class, 'incomeView'])->name('finance.income');      
        Route::get('/finance/outcome', [FinanceController::class, 'outcomeView'])->name('finance.outcome');      
        Route::get('/finance/budget', [FinanceController::class, 'budgetView'])->name('finance.budget');      
    });

    // ==== HUMAN RESOURCE (hr) ====
    Route::middleware('rolechecking:hr')->group(function(){
        // view
        Route::get('/hr/dashboard', [HumanResourceController::class, 'view'])->name('hr.dashboard');
        
    });

    // ==== Warehouse/Inventory (wrhs) ====
    Route::middleware('rolechecking:wrhs')->group(function(){
        // view
        Route::get('/wrhs/dashboard', [WarehouseController::class, 'view'])->name('wrhs.dashboard');
        Route::get('/wrhs/inbound', [WarehouseController::class, 'inboundView'])->name('wrhs.inbound');
        Route::get('/wrhs/outbound', [WarehouseController::class, 'outboundView'])->name('wrhs.outbound');
        Route::get('/wrhs/stock', [WarehouseController::class, 'stockView'])->name('wrhs.stock');
        Route::get('/wrhs/product', [WarehouseController::class, 'productView'])->name('wrhs.product');
        Route::get('/wrhs/supplier', [WarehouseController::class, 'supplierView'])->name('wrhs.supplier');
        Route::get('/wrhs/category', [WarehouseController::class, 'categoryView'])->name('category.supplier');
        Route::get('/wrhs/shipment', [WarehouseController::class, 'shipmentView'])->name('wrhs.shipment');
        Route::get('/wrhs/inboundreports', [WarehouseController::class, 'inboundReportsView'])->name('wrhs.inboundreports');
        Route::get('/wrhs/outboundreports', [WarehouseController::class, 'outboundreportsView'])->name('wrhs.outboundreports');
        Route::get('/wrhs/stockreports', [WarehouseController::class, 'stockreportsView'])->name('wrhs.stockreports');
        Route::get('/wrhs/shipmentreports', [WarehouseController::class, 'shipmentreportsView'])->name('wrhs.shipmentreports');

        // Route inbound action 
        Route::post('/wrhs/inbound', [InventoryController::class, 'inboundStore'])->name('wrhs.inbound.store');
        Route::delete('/wrhs/inbound/{inbound}', [InventoryController::class, 'inboundDestroy'])->name('wrhs.inbound.destroy');

        // Route outbound action
        Route::post('/wrhs/outbound', [InventoryController::class, 'outboundStore'])->name('wrhs.outbound.store');
        Route::delete('/wrhs/outbound/{outbound}', [InventoryController::class, 'outboundDestroy'])->name('wrhs.outbound.destroy');

        // route supplier action
        Route::post('/wrhs/supplier', [InventoryController::class, 'supplierStore'])->name('wrhs.supplier.store');
        Route::delete('/wrhs/supplier/{supplier}', [InventoryController::class, 'supplierDestroy'])->name('wrhs.supplier.destroy');

        // route product action
        Route::post('/wrhs/product', [InventoryController::class, 'productStore'])->name('wrhs.product.store');
        Route::delete('/wrhs/product/{product}', [InventoryController::class, 'productDestroy'])->name('wrhs.product.destroy');

        // route category
        Route::post('/wrhs/category', [InventoryController::class, 'categoryStore'])->name('wrhs.category.store');
        Route::delete('/wrhs/category/{category}', [InventoryController::class, 'categoryDestroy'])->name('wrhs.category.destroy');

    });

    // Profile User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
