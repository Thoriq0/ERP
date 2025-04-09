<?php

namespace App\Http\Controllers\hr;

use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class HumanResourceController extends Controller
{
    public function view(){
        return Inertia::render('hr/Dashboard', [
            'title' => 'Dashboard HumanResource'
        ]);
    }

    public function employeeView(){
        return Inertia::render('features/Employee', [
            'title' => 'HR Employee',
            'employee' => Employee::all(),
        ]);
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
