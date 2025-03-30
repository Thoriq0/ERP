<?php

namespace App\Models;


use App\Models\Inbound;
use App\Models\BilledParty;
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
    public function inbound(){
        return $this->belongsTo(Inbound::class);
    }

    public function billedParty(){
        return $this->belongsTo(BilledParty::class);
    }
}
