<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Inbound;
use App\Models\Outbound;
use App\Models\User;

class AdminController extends Controller
{
    public function view(){
        // dd();
        return Inertia::render('admin/Dashboard', [
            'title' => 'Dashboard Admin'
        ]);
    }

    public function userView(){
        dd();
        // return Inertia::render('admin/UserWarehouse', [
        //     'title' => 'User Warehouse',
        //     'user' => User::all()
        // ]);
    }

    public function inboundView(){
        // dd();
        return inertia::render('admin/Inbound', [
            'title' => 'Admin Inventory Inbound',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function outboundView(){
        // dd();
        return inertia::render('admin/Outbound', [
            'title' => 'Admin Inventory Outbound',
            'outbound' => Outbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function stockView(){
        // dd();
        return inertia::render('admin/Stock', [
            'title' => 'Admin Inventory Stock',
            
        ]);
        // dd(Inbound::all());
    }

    public function shipmentView(){
        // dd();
        return inertia::render('admin/Shipment', [
            'title' => 'Admin Inventory Stock',
            
        ]);
        // dd(Inbound::all());
    }
}
