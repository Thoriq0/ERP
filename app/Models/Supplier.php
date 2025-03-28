<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    /** @use HasFactory<\Database\Factories\SupplierFactory> */
    use HasFactory;
    protected $guarded = ['id'];

    public function products()
    {
        return $this->hasMany(Product::class, 'supplier_id', 'id');
    }
}
