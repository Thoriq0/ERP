<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inbound extends Model
{
    /** @use HasFactory<\Database\Factories\InboundFactory> */

    protected $guarded = [
        'id'
    ];

    // Relasi ke Product (Many to One)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    // Relasi ke AccountPayable (One to One)
    public function accountPayable()
    {
        return $this->hasOne(AccountPayable::class, 'inbound_id', 'id')
            ->where('status_payment', 'scheduled');
    }

    use HasFactory;
}
