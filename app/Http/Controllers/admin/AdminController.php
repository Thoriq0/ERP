<?php

namespace App\Http\Controllers\admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Inbound;
use App\Models\Outbound;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    // Route --
    public function view(){
        // dd();
        return Inertia::render('admin/Dashboard', [
            'title' => 'Dashboard Admin'
        ]);
    }

    // User --
    public function userView(){
        // dd();
        return Inertia::render('admin/UserWarehouse', [
            'title' => 'User Warehouse',
            'user' => User::all()
        ]);
    }

    // Inventory --
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


}
