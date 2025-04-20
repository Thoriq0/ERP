<?php

namespace App\Http\Controllers\hr;

use Inertia\Inertia;
use App\Models\Employee;
use App\Models\LeaveQuota;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class HumanResourceController extends Controller
{
    public function view(){
        return Inertia::render('hr/Dashboard', [
            'title' => 'Dashboard Human Resource'
        ]);
    }

    public function employeeView(){
        return Inertia::render('features/Employee', [
            'title' => 'Human Resource Employee',
            'employee' => Employee::all(),
        ]);
    }

    public function timeView(){
        // dd();
        return inertia::render('features/TimeRequest', [
            'title' => 'Human Resource Time Off Request',
            'emplys' => Employee::all(),
            'lq' => LeaveQuota::all()
        ]);
        // dd(Employee::all());
    }

    public function attendanceView(){
        // dd();
        return inertia::render('features/Attandance', [
            'title' => 'Human Resource Attendance ',
        ]);
        // dd(Inbound::all());
    }
}
