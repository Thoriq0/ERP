<?php

namespace App\Http\Controllers\warehouse;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use App\Models\Inbound;
use App\Models\Outbound;

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
            'title' => 'Inventory Inbound',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function outboundView(){
        // dd();
        return inertia::render('features/Outbound', [
            'title' => 'Inventory Outbound',
            'outbound' => Outbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function stockView(){
        // dd();
        return inertia::render('features/Stock', [
            'title' => 'Inventory Stock',
            'inbound' => Inbound::all()
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
            'title' => 'Inventory Product',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function supplierView(){
        // dd();
        return inertia::render('features/Supplier', [
            'title' => 'Inventory Supplier',
            'inbound' => Inbound::all()
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
