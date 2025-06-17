<?php

namespace App\Imports;

use App\Models\Inbound;
use App\Models\StagingInbound;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class InboundImport implements ToModel, WithHeadingRow
{
    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function model(array $row)
    {
        $inbound = Inbound::create([
            'inbound_code' => $row['inbound_code'],
            'product_id'   => $row['product_id'],
            'qty'          => $row['qty'],
            'pic'          => $row['pic'],
            'created_by'   => $this->user->name ?? 'Unknown',
            'qc_status'    => 'Checking',
            'image'        => json_encode([]),
            'pdf'          => json_encode([]),
            'created_at'   => now(),
            'updated_at'   => now(),
        ]);

        StagingInbound::create([
            'inbound_id'   => $inbound->id,  
            'status'       => 'validating',  
            'stock_status' => 'On Hold',    
            'payment_status' => 'unpaid',    
        ]);

        return $inbound; 
    }
}

