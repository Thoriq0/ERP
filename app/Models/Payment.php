<?php

namespace App\Models;


use App\Models\AccountPayable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function accountPayable()
    {
        return $this->belongsTo(AccountPayable::class);
    }
}
