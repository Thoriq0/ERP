<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ProductExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            new ProductSheet(),
            // new SupplierSheet(),
            // new CategorySheet(),
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
