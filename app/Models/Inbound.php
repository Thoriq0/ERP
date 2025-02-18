<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inbound extends Model
{
    /** @use HasFactory<\Database\Factories\InboundFactory> */

    protected $guarded = [
        'id'
    ];

    use HasFactory;
}
