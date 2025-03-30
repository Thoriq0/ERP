<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class InboundExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            new InboundSheet(),
            // new SupplierSheet(),
            // new CategorySheet(),
            new ProductSheet(),
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
