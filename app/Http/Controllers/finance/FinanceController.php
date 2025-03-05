<?php

namespace App\Http\Controllers\finance;

use Inertia\Inertia;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\AccountPayable;
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
