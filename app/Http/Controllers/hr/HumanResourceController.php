<?php

namespace App\Http\Controllers\hr;

use Inertia\Inertia;
use App\Models\Employee;
use App\Models\Attendance;
use App\Models\LeaveQuota;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Schema;

class HumanResourceController extends Controller
{
    public function view(){
        $totalEmployee = Employee::count();
        $totalPendigApproval = LeaveQuota::where('status', 'validating')->count();
        $totalApprovalRequest = LeaveQuota::where('status', 'validated')->count();

        $columns = Schema::getColumnListing('attendances');
        if (!in_array('employee_id', $columns)) {
            // Kalau kolom employee_id tidak ada, langsung kembalikan pesan teks
            $chartData = [
                ['month' => 'N/A', 'average_attendance' => 'Belum terdapat data perhitungan'],
            ];
        } else {
            // Ambil data kehadiran per karyawan per bulan
            $attendanceData = DB::table('attendances')
                ->selectRaw("strftime('%Y-%m', created_at) as month, employee_id, COUNT(*) as hadir")
                ->groupBy('month', 'employee_id')
                ->get();
        
            if ($attendanceData->isEmpty()) {
                $chartData = [
                    ['month' => 'N/A', 'average_attendance' => 'Belum terdapat data perhitungan'],
                ];
            } else {
                // Proses rata-rata kehadiran per bulan
                $monthlyAvg = [];
        
                foreach ($attendanceData as $record) {
                    $month = $record->month;
                    if (!isset($monthlyAvg[$month])) {
                        $monthlyAvg[$month] = [
                            'total_hadir' => 0,
                            'jumlah_karyawan' => 0,
                        ];
                    }
        
                    $monthlyAvg[$month]['total_hadir'] += $record->hadir;
                    $monthlyAvg[$month]['jumlah_karyawan'] += 1;
                }
        
                $chartData = [];
                foreach ($monthlyAvg as $month => $data) {
                    $chartData[] = [
                        'month' => $month,
                        'average_attendance' => round($data['total_hadir'] / $data['jumlah_karyawan'], 2),
                    ];
                }
            }
        }
        
        return Inertia::render('hr/Dashboard', [
            'title' => 'Dashboard',
            'totalEmployee' => $totalEmployee,
            'totalPendigApproval' => $totalPendigApproval,
            'totalApprovalRequest' => $totalApprovalRequest,
            'attendanceAvgChart' => $chartData,
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

        public function reportAttendanceView(){
        // dd();
        return inertia::render('report/AttendanceReports', [
            'title' => 'Human Resource Reports Attendance',
            'attendance' => Attendance::all(),           
            'usr' => User::all()            
        ]);
        // dd(Inbound::all());
    }

        public function edit(Request $request): Response
    {
        
        return Inertia::render('Profile/ProfilePage', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'title' => 'Profile',
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        // dd($request->uniqueNumber);
        $employee = Employee::where('uniqueNumber', $request->uniqueNumber);

        $employee->update([
            'name' => $request->name,
            'email' => $request->email
        ]);
        
        $request->user()->save();

        return Redirect::route("profile.edit");
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function index()
    {
        return Inertia::render('admin/UserWarehouse', [
            'title' => 'User Warehouse',
            'user' => User::all()
        ]);
    }
}
