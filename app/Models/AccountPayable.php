<?php

namespace App\Models;

use App\Models\Inbound;
use App\Models\BilledParty;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AccountPayable extends Model
{
    /** @use HasFactory<\Database\Factories\AccountPayableFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function inbound(){
        return $this->belongsTo(Inbound::class);
    }

    public function billedParty(){
        return $this->belongsTo(BilledParty::class);
    }
}
