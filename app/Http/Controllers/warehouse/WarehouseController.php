<?php

namespace App\Http\Controllers\warehouse;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class WarehouseController extends Controller
{
    public function view(){
        return Inertia::render('warehouse/Dashboard', [
            'title' => 'Dashboard WareHouse'
        ]);
    }

    public function outboundView(){
        // dd();
        return inertia::render('warehouse/Outbound', [
            'title' => 'Inventory Outbound',
            
        ]);
        // dd(Inbound::all());
    }
}
