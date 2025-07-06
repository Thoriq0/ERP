<?php

namespace App\Exports;

use App\Exports\UserSheet;
use App\Exports\InboundValue;
use App\Exports\ProductInboundSheet;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class InboundExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            new InboundSheet(),
            new UserSheet(),
            // new SupplierSheet(),
            // new CategorySheet(),
            new ProductInboundSheet(),
            new InboundValue(),
        ];
    }
}

// class InboundExport implements FromCollection
// {
//     /**
//     * @return \Illuminate\Support\Collection
//     */
//     public function collection()
//     {
//         //
//     }
// }
