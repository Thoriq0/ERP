<?php

namespace App\Http\Controllers\hr;

use Inertia\Inertia;
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
            'title' => 'HR Employee'
        ]);
    }

    public function workView(){
        // dd();
        return inertia::render('features/WorkTime', [
            'title' => 'Admin HR Work Time Employee',
        ]);
        // dd(Inbound::all());
    }

    public function salaryView(){
        // dd();
        return inertia::render('features/Salary', [
            'title' => 'Admin HR Salary Employee',
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
