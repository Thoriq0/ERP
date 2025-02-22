<?php

namespace App\Http\Controllers\warehouse;

use Inertia\Inertia;
use App\Models\Stock;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class WarehouseController extends Controller
{
    public function view(){
        return Inertia::render('warehouse/Dashboard', [
            'title' => 'Dashboard WareHouse'
        ]);
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
            'title' => 'Inventory Shipment',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
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

    public function inboundReportsView(){
        // dd();
        return inertia::render('warehouse/InboundReports', [
            'title' => 'Inventory Inbound Reports',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function outboundreportsView(){
        // dd();
        return inertia::render('warehouse/OutboundReports', [
            'title' => 'Inventory Outbound Reports',
            'outbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }
    public function stockreportsView(){
        // dd();
        return inertia::render('warehouse/StockReports', [
            'title' => 'Inventory Stock Reports',
            
        ]);
        // dd(Inbound::all());
    }
    public function shipmentreportsView(){
        // dd();
        return inertia::render('warehouse/ShipmentReports', [
            'title' => 'Inventory Shipment Reports',
            
        ]);
        // dd(Inbound::all());
    }
}
