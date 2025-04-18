<?php

namespace App\Models;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LeaveQuota extends Model
{
    /** @use HasFactory<\Database\Factories\LeaveQuotaFactory> */
    use HasFactory;

    protected $guarded=["id"];
    
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
