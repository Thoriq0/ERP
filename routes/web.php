<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\InventoryController;
use App\Http\Controllers\finance\FinanceController;
use App\Http\Controllers\hr\HumanResourceController;
use App\Http\Controllers\admin\WarehouseUserController;
use App\Http\Controllers\warehouse\WarehouseController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth', 'verified')->group(function () {

    // ==== ADMIN ====
    Route::middleware('rolechecking:admin')->group(function(){
        // route userwarehouse action & view
        Route::resource('/admin/user', WarehouseUserController::class);

        // ======= route view features inventory/warehouse ======= 
        Route::get('/admin/dashboard', [AdminController::class, 'view'])->name('admin.dashboard');
        Route::get('/admin/product', [AdminController::class, 'productView'])->name('admin.product');
        Route::get('/admin/category', [AdminController::class, 'categoryView'])->name('admin.category');
        Route::get('/admin/supplier', [AdminController::class, 'supplierView'])->name('admin.supplier');
        Route::get('/admin/inbound', [AdminController::class, 'inboundView'])->name('admin.inbound');
        Route::get('/admin/outbound', [AdminController::class, 'outboundView'])->name('admin.outbound');
        Route::get('/admin/stock', [AdminController::class, 'stockView'])->name('admin.stock');
        Route::get('/admin/shipment', [AdminController::class, 'shipmentView'])->name('admin.shipment');
        Route::get('/admin/delivery', [AdminController::class, 'deliveryView'])->name('admin.delivery');
        Route::get('/admin/prestock', [AdminController::class, 'prestockView'])->name('admin.prestock');
        // Route::get('/admin/reports', [AdminController::class, 'reportInventoryView'])->name('admin.reports');
        // ======= end route view features inventory/warehouse ======= 


        // route inbound action
        Route::post('/admin/inbound', [InventoryController::class, 'inboundStore'])->name('inventory.inbound.store');
        Route::delete('/admin/inbound/{inbound}', [InventoryController::class, 'inboundDestroy'])->name('inventory.inbound.destroy');
        Route::post('/admin/deletefile', [InventoryController::class, 'deleteFile'])->name('delete.file');//FILE DELETE
        Route::post('/admin/inbound/{inbound}', [InventoryController::class, 'inboundUpdate'])->name('inventory.inbound.update');
        Route::post('/admin/ibnd/', [InventoryController::class, 'importInbound'])->name('inventory.inbound.import');
        Route::get('/admin/inbound/export', [InventoryController::class, 'exportInbound']);

        // route inbound pre-stock
        Route::post('/admin/validatestock', [InventoryController::class, 'validateStock'])->name('inventory.stock.store');
        Route::post('/admin/qcstock', [InventoryController::class, 'qcStock'])->name('inventory.qcstock.store');

        // route outbound action
        Route::post('/admin/outbound', [InventoryController::class, 'outboundStore'])->name('inventory.outbound.store');
        Route::delete('/admin/outbound/{outbound}', [InventoryController::class, 'outboundDestroy'])->name('inventory.outbound.destroy');
        Route::post('/admin/outbounddelete', [InventoryController::class, 'deleteOutbound']);
        Route::put('/admin/outbound/{outbound}', [InventoryController::class, 'outboundUpdate'])->name('inventory.outbound.update');

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
        Route::post('/admin/ap', [InventoryController::class, 'apStore'])->name('inventory.ap.store');
        Route::put('/admin/ap/{ap}', [InventoryController::class, 'apUpdate'])->name('inventory.ap.update');
        Route::delete('/admin/ap/{accountPayable}', [InventoryController::class, 'apDestroy'])->name('inventory.ap.destroy');

        // route billed party action
        Route::post('/admin/bp', [InventoryController::class, 'bpStore'])->name('inventory.bp.store');
        Route::put('/admin/bp/{billedParty}', [InventoryController::class, 'bpUpdate'])->name('inventory.bp.update');
        Route::delete('/admin/bp/{billedParty}', [InventoryController::class, 'bpDestroy'])->name('inventory.bp.destroy');

        // route shipmentaction action
        Route::post('/admin/shipmentorder', [InventoryController::class, 'shipmentOrder'])->name('inventory.shipmentorder');

        // route delivery action
        Route::post('/admin/delivery', [InventoryController::class, 'deliveryVal'])->name('inventory.delivery.store');

        // route payment action
        Route::post('/admin/payment', [InventoryController::class, 'paymentGet'])->name('inventory.payment.get');

        // ======= route view features finance =======
        Route::get('/admin/income', [AdminController::class, 'incomeView'])->name('admin.income');
        Route::get('/admin/outcome', [AdminController::class, 'outcomeView'])->name('admin.outcome');
        Route::get('/admin/budget', [AdminController::class, 'budgetView'])->name('admin.budget');
        Route::get('/admin/ap', [AdminController::class, 'apView'])->name('admin.ap');
        Route::get('/admin/payment', [AdminController::class, 'paymentView'])->name('admin.payment');
        Route::get('/admin/bp', [AdminController::class, 'bpView'])->name('admin.bp');
        // ======= end route view features finance =======


        // ======= route view features human resource ======= 
        Route::get('/admin/employee', [AdminController::class, 'employeeView'])->name('admin.employee');
        Route::get('/admin/time', [AdminController::class, 'timeView'])->name('admin.time');
        Route::get('/admin/attendance', [AdminController::class, 'attendanceView'])->name('admin.attendance');
        // ======= end route view features human resource ======= 


        // ======= route action employee =======
        Route::post('/admin/employee', [InventoryController::class, 'employeeStore'])->name('inventory.employee.store');
        Route::delete('/admin/employee/{employee}', [InventoryController::class, 'employeeDestroy'])->name('inventory.employee.destroy');
        Route::put('/admin/employee/{employee}', [InventoryController::class, 'employeeUpdate'])->name('inventory.employee.update');
        // ======= end route action employee =======

        // Route action timeoff
        Route::post('/admin/timeoff', [InventoryController::class, 'timeStore'])->name('inventory.time.store');


        // route view reports
        Route::get('/admin/reportinbound', [AdminController::class, 'reportInboundView'])->name('admin.reportinbound');
        Route::get('/admin/reportoutbound', [AdminController::class, 'reportOutboundView'])->name('admin.reportoutbound');
        Route::get('/admin/reportstock', [AdminController::class, 'reportStockView'])->name('admin.reportstock');
    });

    // ==== ROLE FINANCE (fnc) ====
    Route::middleware('rolechecking:fnc')->group(function(){
        // view
        Route::get('/finance/dashboard', [FinanceController::class, 'view'])->name('finance.dashboard');

        Route::get('/finance/income', [FinanceController::class, 'incomeView'])->name('finance.income');      
        Route::get('/finance/outcome', [FinanceController::class, 'outcomeView'])->name('finance.outcome');      
        Route::get('/finance/budget', [FinanceController::class, 'budgetView'])->name('finance.budget'); 
        Route::get('/finance/ap', [FinanceController::class, 'apView'])->name('finance.ap');     
        Route::get('/finance/payment', [FinanceController::class, 'paymentView'])->name('finance.payment');     
        Route::get('/finance/bp', [FinanceController::class, 'bpView'])->name('finance.bp');

        // route account payable action
        Route::post('/finance/ap', [InventoryController::class, 'apStore'])->name('inventory.ap.store');
        Route::put('/finance/ap/{ap}', [InventoryController::class, 'apUpdate'])->name('inventory.ap.update');
        Route::delete('/finance/ap/{accountPayable}', [InventoryController::class, 'apDestroy'])->name('inventory.ap.destroy');

        // route payment action
        Route::post('/finance/payment', [InventoryController::class, 'paymentGet'])->name('inventory.payment.get');

        // route billed party action
        Route::post('/finance/bp', [InventoryController::class, 'bpStore'])->name('inventory.bp.store');
        Route::put('/finance/bp/{billedParty}', [InventoryController::class, 'bpUpdate'])->name('inventory.bp.update');
        Route::delete('/finance/bp/{billedParty}', [InventoryController::class, 'bpDestroy'])->name('inventory.bp.destroy');
    });

    // ==== ROLE HUMAN RESOURCE (hr) ====
    Route::middleware('rolechecking:hr')->group(function(){
        // view
        Route::get('/hr/dashboard', [HumanResourceController::class, 'view'])->name('hr.dashboard');
        Route::get('/hr/employee', [HumanResourceController::class, 'employeeView'])->name('hr.employee');
        Route::get('/hr/time', [HumanResourceController::class, 'timeView'])->name('hr.time');
        Route::get('/hr/attendance', [HumanResourceController::class, 'attendanceView'])->name('hr.attendance');
        
        // Route employee action
        Route::post('/hr/employee', [InventoryController::class, 'employeeStore'])->name('hr.employee.store');
    });

    // ==== ROLE Warehouse/Inventory (wrhs) ====
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
        Route::get('/wrhs/delivery', [WarehouseController::class, 'deliveryView'])->name('wrhs.delivery');
        Route::get('/wrhs/inboundreports', [WarehouseController::class, 'inboundReportsView'])->name('wrhs.inboundreports');
        Route::get('/wrhs/outboundreports', [WarehouseController::class, 'outboundreportsView'])->name('wrhs.outboundreports');
        Route::get('/wrhs/stockreports', [WarehouseController::class, 'stockreportsView'])->name('wrhs.stockreports');
        Route::get('/wrhs/shipmentreports', [WarehouseController::class, 'shipmentreportsView'])->name('wrhs.shipmentreports');
        Route::get('/wrhs/prestock', [WarehouseController::class, 'prestockView'])->name('wrhs.prestock');

        // Route inbound action 
        Route::post('/wrhs/inbound', [InventoryController::class, 'inboundStore'])->name('wrhs.inbound.store');
        Route::delete('/wrhs/inbound/{inbound}', [InventoryController::class, 'inboundDestroy'])->name('wrhs.inbound.destroy');

        // route inbound pre-stock
        Route::post('/wrhs/validatestock', [InventoryController::class, 'validateStock'])->name('wrhs.stock.store');
        Route::post('/wrhs/qcstock', [InventoryController::class, 'qcStock'])->name('wrhs.qcstock.store');
        Route::put('/wrhs/inbound/{inbound}', [InventoryController::class, 'inboundUpdate'])->name('wrhs.inbound.update');

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

        // route shipmentaction action
        Route::post('/wrhs/shipmentorder', [InventoryController::class, 'shipmentOrder'])->name('inventory.shipmentorder');

    });

    // ==== ROLE STAFF (STAFF) ====
    Route::get('/staff/dashboard', [StaffController::class, 'view'])->name('staff.dashboard');

    // Profile User
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
