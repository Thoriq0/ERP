<?php

namespace App\Models;

use App\Models\Inbound;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductsFactory> */
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relasi ke Supplier (One to Many)
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    // Relasi ke Inbound (One to Many)
    public function inbounds()
    {
        return $this->hasMany(Inbound::class);
    }
}
