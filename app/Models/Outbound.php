<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outbound extends Model
{
    /** @use HasFactory<\Database\Factories\OutboundFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    
}
