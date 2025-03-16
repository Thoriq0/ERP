<?php

namespace App\Http\Controllers\finance;

use Inertia\Inertia;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\AccountPayable;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class FinanceController extends Controller
{
    public function view(){
        return Inertia::render('finance/Dashboard', [
            'title' => 'Dashboard Finance'
        ]);
    }

    public function apView(){
        // dd();
        return inertia::render('features/AccountPayable', [
            'title' => 'Account Payable',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'ap' => AccountPayable::with([
                'inbound.product.category',
                'inbound.product.supplier',
                // 'inbound.qty'
            ])->get()
            
        ]);
        // dd(Inbound::all());
    }

    public function paymentView(){
        $payments = Payment::select('id', 'account_payable_id', 'status_payment')
        ->where('status_payment', 'scheduled')
        ->with([
            'accountPayable:id,inbound_id,unit_price,tax,total_amount,due_date,status_payment,ap_code',
            'accountPayable.inbound:id,product_id',
            'accountPayable.inbound.product:id,name,supplier_id',
            'accountPayable.inbound.product.supplier:id,name,contact,address,account_number'
        ])
        ->get();
        // dd($payments);
        return inertia::render('features/Payments', [
            'title' => 'Payment',
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
    
        ]);
    }

    public function budgetView(){
        // dd();
        return inertia::render('features/Budget', [
            'title' => 'Finance Budget Control',
    
        ]);
    }
}
