<?php

namespace App\Http\Controllers\finance;

use Inertia\Inertia;
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
    public function view(){
        $totalBP = BilledParty::count();
        $total_unpaid = AccountPayable::where('status_payment', 'unpaid')->count();
        $py_schedule = AccountPayable::where('status_payment', 'scheduled')->count();

        // pie chart
        $months = collect(range(1, 12))->map(function ($month) {
            return str_pad($month, 2, '0', STR_PAD_LEFT);
        });

        $payments = DB::table('account_payables')
            ->selectRaw("strftime('%m', created_at) as month, SUM(total_amount) as total")
            ->groupByRaw("strftime('%m', created_at)")
            ->pluck('total', 'month');

        $pieData = $months->map(function ($month) use ($payments) {
            return [
                'month' => $month,
                'total' => (float) ($payments[$month] ?? 0),
            ];
        });

        return Inertia::render('finance/Dashboard', [
            'title' => 'Dashboard Finance',
            'total_bp' => $totalBP,
            'total_unpaid' => $total_unpaid,
            'py_schedule' => $py_schedule,
            'paymentData' => $pieData,
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


}
