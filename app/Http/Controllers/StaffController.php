<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    

    // DASHBOARD VIEW
    public function view(){
        return Inertia::render('warehouse/Dashboard', [
            'title' => 'DASHBOARD STAFF'
        ]);
    }
}
