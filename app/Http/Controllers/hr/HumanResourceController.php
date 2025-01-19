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
}
