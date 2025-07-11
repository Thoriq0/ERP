<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Attendance;
use App\Models\Employee;
use App\Models\LeaveQuota;
use App\Models\User;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    // DASHBOARD VIEW
    public function view(){
        return Inertia::render('user/Dashboard', [
            'title' => 'Dashboard Staff'
        ]);
    }

    // DASHBOARD VIEW
    public function attendanceView(){
        // dd();
        return inertia::render('features/Attendance', [
            'title' => 'Attendance',
            'atdnc' => Attendance::all()
        ]);
        // dd(Inbound::all());
    }

    public function timeView(){
        // dd();
        return inertia::render('features/TimeRequestUser', [
            'title' => 'Time Off Request',
            'emplys' => Employee::all(),
            'lq' => LeaveQuota::all(),
            'lqa' => LeaveQuota::where('status', 'validating')->get()
        ]);
        // dd(Employee::all());
    }

    public function reportAttendanceView(){
        // dd();
        return inertia::render('features/ReportAttendanceUser', [
            'title' => 'Reports Attendance',
            'attendance' => Attendance::all(),
            // 'usr' => User::select('id', 'name', 'role')->get()            
            'usr' => User::all()            
        ]);
        // dd(Inbound::all());
    }
}
