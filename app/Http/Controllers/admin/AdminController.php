<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Inbound;
use App\Models\Outbound;
use App\Models\Stock;

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
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function supplierView(){
        // dd();
        return inertia::render('features/Supplier', [
            'title' => 'Admin Inventory Supplier',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function inboundView(){
        // dd();
        return inertia::render('features/Inbound', [
            'title' => 'Admin Inventory Inbound',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function outboundView(){
        // dd();
        return inertia::render('features/Outbound', [
            'title' => 'Admin Inventory Outbound',
            'outbound' => Outbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function stockView(){
        // dd();
        return inertia::render('features/Stock', [
            'title' => 'Admin Inventory Stock',
            'inbound' => Stock::all()
        ]);
        // dd(Inbound::all());
    }

    public function shipmentView(){
        // dd();
        return inertia::render('features/Shipment', [
            'title' => 'Admin Inventory Shipment',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }


    // features in user finance
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
}
