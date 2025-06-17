<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class SupplierExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            // new InboundSheet(),
            // new CategorySheet(),
            new SupplierSheet(),
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
