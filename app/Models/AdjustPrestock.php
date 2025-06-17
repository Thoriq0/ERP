<?php

namespace App\Models;

use App\Models\Inbound;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdjustPrestock extends Model
{
    /** @use HasFactory<\Database\Factories\AdjustPrestockFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    
    public function inbound()
    {
        return $this->belongsTo(Inbound::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

}
