<?php

namespace App\Http\Controllers\finance;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller; 

class FinanceController extends Controller
{
    // Route
    public function view(){
        return Inertia::render('finance/Dashboard', [
            'title' => 'Dashboard Finance'
        ]);
    }

    // Income
    public function incomeView(){
        return Inertia::render('finance/Income', [
            'title' => 'Income',
            
        ]);
    }
}
