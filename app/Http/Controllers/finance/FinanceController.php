<?php

namespace App\Http\Controllers\finance;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\AccountPayable;
use App\Models\BilledParty;
use App\Models\Payment;
use App\Models\Expense;
use App\Models\Employee;
use App\Models\LeaveQuota;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\DB; 

class FinanceController extends Controller
{
    public function view(Request $request){
        $totalBP = BilledParty::count();
        $total_unpaid = AccountPayable::where('status_payment', 'unpaid')->count();
        $py_schedule = AccountPayable::where('status_payment', 'scheduled')->count();

        $today = now()->startOfDay();

        $total_due = AccountPayable::whereDate('due_date', '<', $today)
        ->where('status_payment', '!=', 'paid')
        ->count();

        // Ambil bulan yang dipilih dari request (default: bulan sekarang)
        $selectedMonth = $request->get('month', now()->format('m'));
        $year = now()->format('Y');

        // Pie chart data
        $withInbound = AccountPayable::whereNotNull('inbound_id')
            ->whereMonth('created_at', $selectedMonth)
            ->whereYear('created_at', $year)
            ->sum('total_amount');

        $withoutInbound = AccountPayable::whereNull('inbound_id')
            ->whereMonth('created_at', $selectedMonth)
            ->whereYear('created_at', $year)
            ->sum('total_amount');

        // $pieData = [
        //     ['name' => 'Inbound Payment', 'value' => (float) $withInbound, 'month' => $selectedMonth],
        //     ['name' => 'Other Payment', 'value' => (float) $withoutInbound, 'month' => $selectedMonth],
        // ];

        $monthlyPayments = AccountPayable::selectRaw("strftime('%m', created_at) as month, SUM(total_amount) as total")
            ->whereYear('created_at', $year)
            ->groupByRaw("strftime('%m', created_at)")
            ->orderByRaw("strftime('%m', created_at)")
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->month,
                    'total' => (float) $item->total,
                ];
        });

        return Inertia::render('finance/Dashboard', [
            'title' => 'Dashboard Finance',
            'total_bp' => $totalBP,
            'total_unpaid' => $total_unpaid,
            'py_schedule' => $py_schedule,
            'paymentData' => [
                ['name' => 'Inbound Payment', 'value' => (float) $withInbound, 'month' => $selectedMonth],
                ['name' => 'Other Payment', 'value' => (float) $withoutInbound, 'month' => $selectedMonth],
            ],
            'selectedMonth' => $selectedMonth,
            'total_due' => $total_due,
            'monthlyPayments' => $monthlyPayments,
        ]);
    }


    public function apView(){
        // dd();
        return inertia::render('features/AccountPayable', [
            'title' => 'Finance Account Payable',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'ap' => AccountPayable::select()->whereIn('status_payment', ['scheduled', 'unpaid', 'paid'])->with([
                'inbound.product.category',
                'inbound.product.supplier',
                'billedParty'
                // 'inbound.qty'
            ])->get(),
            'bp' => BilledParty::all()
            
        ]);
        // dd(Inbound::all());
    }

    public function paymentView(){
        $payments = Payment::select('id', 'account_payable_id', 'status_payment')
        ->where('status_payment', 'scheduled')
        ->with([
            'accountPayable:id,inbound_id,unit_price,tax,total_amount,due_date,status_payment,ap_code,item_description,discount,note,terms_condition,billed_party_id,status_inbound',
            'accountPayable.billedParty:id,bill_to,account_bill,account_bill_name,account_bank_name',
            'accountPayable.inbound:id,product_id,qty',
            'accountPayable.inbound.product:id,name,supplier_id',
            'accountPayable.inbound.product.supplier:id,name,contact,account_number,account_name,account_bank_name'
        ])
        ->get();
        // dd($payments);
        return inertia::render('features/Payments', [
            'title' => 'Finance Payment',
            'payments' => $payments
        ]);
    }

    public function incomeView(){
        // dd();
        return inertia::render('features/Income', [
            'title' => 'Finance Income',
    
        ]);
    }

    public function outcomeView(){
        // dd();
        return inertia::render('features/Outcome', [
            'title' => 'Finance Outcome',
            'expense' => Expense::all()
        ]);
    }

    public function bpView(){
        // dd()
        return inertia::render('features/BilledParty', [
            'title' => 'Finance Billed Party',
            'bp' => BilledParty::all()
        ]);
    }

    public function timeView(){
        // dd();
        return inertia::render('features/TimeRequestUser', [
            'title' => 'Finance Time Off Request',
            'emplys' => Employee::all(),
            'lq' => LeaveQuota::all(),
            'lqa' => LeaveQuota::where('status', 'validating')->get()
        ]);
        // dd(Employee::all());
    }

    public function attendanceView(){
        // dd();
        return inertia::render('features/Attendance', [
            'title' => 'Finance Attendance',
            'atdnc' => Attendance::all()
        ]);
        // dd(Inbound::all());
    }

    public function reportAttendanceView(){
        // dd();
        return inertia::render('features/ReportAttendanceUser', [
            'title' => 'Finance Reports Attendance',
            'attendance' => Attendance::all(),           
            'usr' => User::all()            
        ]);
        // dd(Inbound::all());
    }


}
