<?php

namespace App\Exports;

use App\Exports\UserSheet;
use App\Exports\InboundSheet;
use App\Exports\InboundValue;
use App\Exports\ProductInboundSheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class DynamicInboundExport implements WithMultipleSheets
{
    protected $sheets;

    public function __construct(array $sheets)
    {
        $this->sheets = $sheets;
    }

    public function sheets(): array
    {
        $sheets = [];

        foreach ($this->sheets as $sheet) {
            switch ($sheet) {
                case 'template':
                    $sheets[] = new InboundSheet();
                    break;
                case 'inbound':
                    $sheets[] = new InboundValue();
                    break;
                case 'user':
                    $sheets[] = new UserSheet();
                    break;
                case 'product':
                    $sheets[] = new ProductInboundSheet();
                    break;
            }
        }

        return $sheets;
    }
}
