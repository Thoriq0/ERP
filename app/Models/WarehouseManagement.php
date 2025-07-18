<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarehouseManagement extends Model
{
    /** @use HasFactory<\Database\Factories\WarehouseManagementFactory> */
    use HasFactory;

    protected $guarded=['id'];
}
