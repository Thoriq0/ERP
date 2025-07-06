<?php

namespace App\Imports;

use App\Imports\InboundSheetImport;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class InboundImport implements WithMultipleSheets
{
    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function sheets(): array
    {
        return [
            'Inbound Template' => new InboundSheetImport($this->user),
        ];
    }
}


