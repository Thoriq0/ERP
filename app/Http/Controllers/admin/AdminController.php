<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Stock;
use App\Models\Inbound;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Models\AccountPayable;
use App\Models\StagingInbound;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function view(){
        // dd();
        return Inertia::render('admin/Dashboard', [
            'title' => 'Dashboard Admin'
        ]);
    }

    public function productView(){
        // dd();
        return inertia::render('features/Product', [
            'title' => 'Admin Inventory Product',
            'product' => Product::all(),
            'categories' => Category::select('id', 'name')->get(),
            'suppliers' => Supplier::select('id', 'name')->get(),
        ]);
        // dd(Inbound::all());
    }

    public function categoryView(){
        // dd();
        return inertia::render('features/Category', [
            'title' => 'Admin Inventory Category',
            'category' => Category::all(),
        ]);
    }

    public function supplierView(){
        // dd();
        return inertia::render('features/Supplier', [
            'title' => 'Admin Inventory Supplier',
            'supplier' => Supplier::all()
        ]);
        // dd(Inbound::all());
    }

    public function inboundView(){
        // dd();
        return inertia::render('features/Inbound', [
            'title' => 'Admin Inventory Inbound',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            
        ]);
        // dd(Inbound::all());
    }

    public function prestockView(){
        return inertia::render('features/PreStockValidation', [
            'title' => 'Validating Stock',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'staging' => StagingInbound::with([
                'inbound.product.category',
                'inbound.product.supplier'
            ])->get()
            // ->where('status', 'validating')->get()
        ]);
        
    }

    public function outboundView(){
        // dd();
        return inertia::render('features/Outbound', [
            'title' => 'Admin Inventory Outbound',
            'outbound' => Outbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                        ->select('id', 'name', 'category_id', 'supplier_id')
                        ->get(),
        ]);
        // dd(Inbound::all());
    }

    public function stockView(){
        // dd();
        return inertia::render('features/Stock', [
            'title' => 'Admin Inventory Stock',
            'stock' => Stock::with(['product.category', 'product.supplier'])->get(),
        ]);
        // dd(Inbound::all());
    }

    public function shipmentView(){
        // dd();
        return inertia::render('features/Shipment', [
            'title' => 'Admin Inventory Shipment',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
        ]);
        // dd(Inbound::all());
    }

    public function deliveryView(){
        // dd();
        return inertia::render('features/Delivery', [
            'title' => 'Admin Inventory Delivery',
    
        ]);
    }


    // features in user finance

    public function apView(){
        // dd();
        return inertia::render('features/AccountPayable', [
            'title' => 'Admin Finance Account Payable',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'ap' => AccountPayable::with([
                'inbound.product.category',
                'inbound.product.supplier',
                // 'inbound.qty'
            ])->get()
            
        ]);
        // dd(Inbound::all());
    }

    public function incomeView(){
        // dd();
        return inertia::render('features/Income', [
            'title' => 'Admin Finance Income',
    
        ]);
    }

    public function outcomeView(){
        // dd();
        return inertia::render('features/Outcome', [
            'title' => 'Admin Finance Outcome',
    
        ]);
    }

    public function budgetView(){
        // dd();
        return inertia::render('features/Budget', [
            'title' => 'Admin Finance Budget Control',
    
        ]);
    }

    public function paymentView(){
        $payments = Payment::select('id', 'account_payable_id', 'status_payment')
        ->where('status_payment', 'scheduled')
        ->with([
            'accountPayable:id,inbound_id,unit_price,tax,total_amount,due_date,status_payment,ap_code',
            'accountPayable.inbound:id,product_id',
            'accountPayable.inbound.product:id,name,supplier_id',
            'accountPayable.inbound.product.supplier:id,name,contact,address,account_number'
        ])
        ->get();
        // dd($payments);
        return inertia::render('features/Payments', [
            'title' => 'Admin Finance Payment',
            'payments' => $payments
        ]);
    }
    

    // features in user human resouce
    public function employeeView(){
        // dd();
        return inertia::render('features/Employee', [
            'title' => 'Admin HR Employee',
        ]);
        // dd(Inbound::all());
    }

    public function timeView(){
        // dd();
        return inertia::render('features/TimeRequest', [
            'title' => 'Admin HR Time Off Request',
        ]);
        // dd(Inbound::all());
    }

    public function attendanceView(){
        // dd();
        return inertia::render('features/Attendance', [
            'title' => 'Admin HR attendance Employee',
        ]);
        // dd(Inbound::all());
    }
}
