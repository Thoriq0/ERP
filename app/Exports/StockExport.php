<?php

namespace App\Exports;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class StockExport implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            // new InboundSheet(),
            new StockSheet(),
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
