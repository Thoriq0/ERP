<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdjustStock extends Model
{
    /** @use HasFactory<\Database\Factories\AdjustStockFactory> */
    use HasFactory;

    protected $guarded = [
        'id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
