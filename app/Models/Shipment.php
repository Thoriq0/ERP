<?php

namespace App\Models;

use App\Models\Outbound;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shipment extends Model
{
    /** @use HasFactory<\Database\Factories\ShipmentFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function outbound(){
        return $this->belongsTo(Outbound::class);
    }
}
