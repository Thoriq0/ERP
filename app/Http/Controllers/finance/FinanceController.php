<?php

namespace App\Http\Controllers\finance;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class FinanceController extends Controller
{
    public function view(){
        return Inertia::render('finance/Dashboard', [
            'title' => 'Dashboard Finance'
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
