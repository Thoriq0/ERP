<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    // DASHBOARD VIEW
    public function view(){
        return Inertia::render('user/Dashboard', [
            'title' => 'DASHBOARD STAFF'
        ]);
    }

    // DASHBOARD VIEW
    public function attandanceView(){
        return Inertia::render('features/Attandance', [
            'title' => 'Attendance'
        ]);
    }
}
