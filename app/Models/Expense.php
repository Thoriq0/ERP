<?php

namespace App\Models;

use App\Models\Payment;
use App\Models\AccountPayable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory;

    protected $guarded=['id'];

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function accountPayable()
    {
        return $this->belongsTo(AccountPayable::class);
    }
}
