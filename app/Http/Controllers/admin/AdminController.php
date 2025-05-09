<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Stock;
use App\Models\Expense;
use App\Models\Inbound;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Outbound;
use App\Models\Shipment;
use App\Models\Supplier;
use App\Models\Attendance;
use App\Models\LeaveQuota;
use App\Models\BilledParty;
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
            'products' => Product::with(['category:id,name', 'supplier:id,name,contact,address'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'usr' => User::all(),
            
        ]);
        // dd(Inbound::all());
    }

    public function prestockView(){
        return inertia::render('features/PreStockValidation', [
            'title' => 'Admin Validating Stock',
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
            'stocks' => Stock::with(['product:id,name,category_id,supplier_id', 'product.category:id,name', 'product.supplier:id,name'])
            ->select('id', 'qty', 'warehouse', 'product_id')
            ->get(),
            'usr' => User::select('id', 'name')->get()
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
            'shipmentO' => Shipment::with([
                'outbound:id,qty,out_status,product_id,receiver,created_at', 
                'outbound.product:id,name,category_id,supplier_id',
                'outbound.product.category:id,name',
                'outbound.product.supplier:id,name'
            ])
            ->where('status_shipment', 'preparing')
            ->select('id', 'outbound_id', 'delivery_estimate', 'status_shipment')
            ->get(),

            'shipmentE' => Shipment::with([
                'outbound:id,qty,out_status,product_id,receiver,created_at', 
                'outbound.product:id,name,category_id,supplier_id',
                'outbound.product.category:id,name',
                'outbound.product.supplier:id,name'
            ])
            ->where('status_shipment', 'shipping process')
            ->select('id', 'outbound_id', 'delivery_estimate', 'status_shipment')
            ->get(),

            'smallShip' => Shipment::with(['outbound.product:id,name'])->select('id', 'outbound_id')->get(),
        ]);
        // dd(Inbound::all());
    }

    public function deliveryView(){
        // dd();
        return inertia::render('features/Delivery', [
            'title' => 'Admin Inventory Delivery',
            'shipmentE' => Shipment::with([
                'outbound:id,qty,out_status,product_id,receiver,created_at', 
                'outbound.product:id,name,category_id,supplier_id',
                'outbound.product.category:id,name',
                'outbound.product.supplier:id,name'
            ])
            ->whereIn('status_shipment', ['shipping process', 'Delivered'])
            ->select('id', 'outbound_id', 'delivery_estimate', 'status_shipment')
            ->get(),
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
            'ap' => AccountPayable::select()->whereIn('status_payment', ['scheduled', 'unpaid', 'paid'])->with([
                'inbound.product.category',
                'inbound.product.supplier',
                'billedParty'
                // 'inbound.qty'
            ])->get(),
            'bp' => BilledParty::all()
            
        ]);
        // dd(Inbound::all());
    }

    public function bpView(){
        // dd()
        return inertia::render('features/BilledParty', [
            'title' => 'Admin Billed Party',
            'bp' => BilledParty::all()
        ]);
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
            'expense' => Expense::all()
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
            'accountPayable:id,inbound_id,unit_price,tax,total_amount,due_date,status_payment,ap_code,item_description,discount,note,terms_condition,billed_party_id,status_inbound',
            'accountPayable.billedParty:id,bill_to,account_bill,account_bill_name,account_bank_name',
            'accountPayable.inbound:id,product_id,qty',
            'accountPayable.inbound.product:id,name,supplier_id',
            'accountPayable.inbound.product.supplier:id,name,contact,account_number,account_name,account_bank_name'
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
            'employee' => Employee::all()
        ]);
        // dd(Inbound::all());
    }

    public function timeView(){
        // dd();
        return inertia::render('features/TimeRequest', [
            'title' => 'Admin HR Time Off Request',
            'emplys' => Employee::all(),
            'lq' => LeaveQuota::all(),
            'lqa' => LeaveQuota::where('status', 'validating')->get()
        ]);
        // dd(Employee::all());
    }

    public function attendanceView(){
        // dd();
        return inertia::render('features/Attendance', [
            'title' => 'Admin HR Attendance',
            'atdnc' => Attendance::all()
        ]);
        // dd(Inbound::all());
    }

    public function reportInboundView(){
        // dd();
        return inertia::render('report/InboundReports', [
            'title' => 'Admin Reports Inbound',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name,contact,address'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'usr' => User::all(),
            
        ]);
        // dd(Inbound::all());
    }

    public function reportOutboundView(){
        // dd();
        return inertia::render('report/OutboundReports', [
            'title' => 'Admin Report Outbound',
            'outbound' => Outbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                        ->select('id', 'name', 'category_id', 'supplier_id')
                        ->get(),
            'stocks' => Stock::with(['product:id,name,category_id,supplier_id', 'product.category:id,name', 'product.supplier:id,name'])
            ->select('id', 'qty', 'warehouse', 'product_id')
            ->get(),
            'usr' => User::select('id', 'name')->get()
        ]);
        // dd(Inbound::all());
    }

    public function reportStockView(){
        // dd();
        return inertia::render('report/StockReports', [
            'title' => 'Admin Reports Stock',
            'stock' => Stock::with(['product.category', 'product.supplier'])->get(),
        ]);
        // dd(Inbound::all());
    }

}
