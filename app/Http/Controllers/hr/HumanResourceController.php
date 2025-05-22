<?php

namespace App\Http\Controllers\hr;

use Inertia\Inertia;
use App\Models\Employee;
use App\Models\LeaveQuota;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class HumanResourceController extends Controller
{
    public function view(){
        $totalEmployee = Employee::count();
        $totalPendigApproval = LeaveQuota::where('status', 'validating')->count();
        $totalApprovalRequest = LeaveQuota::where('status', 'validated')->count();
        return Inertia::render('hr/Dashboard', [
            'title' => 'Dashboard Human Resource',
            'total_employee' => $totalEmployee,
            'total_pending_approval' => $totalPendigApproval,
            'total_approval_request' => $totalApprovalRequest,
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
            'lq' => LeaveQuota::all(),
            'lqa' => LeaveQuota::where('status', 'validating')->get()
        ]);
        // dd(Employee::all());
    }

    public function attendanceView(){
        // dd();
        return inertia::render('features/Attendance', [
            'title' => 'Human Resource Attendance',
            'atdnc' => Attendance::all()
        ]);
        // dd(Inbound::all());
    }
}
