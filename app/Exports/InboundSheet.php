<?php

namespace App\Exports;

use App\Models\Inbound;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class InboundSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        // return new Collection([]);
        // return Inbound::latest()->take(7)->get();
        // return Inbound::all();
        return collect([
            [
                'inbound_code' => '',
                'product_id'   => '',
                'qty'          => '',
                'pic'          => '',
            ]
        ]);
    }
    public function headings(): array {
        return [
            'inbound_code',
            'product_id',
            'qty',
            'pic',
        ];
    }
    public function title(): string
    {
        return 'Inbound Template';
    }
}
