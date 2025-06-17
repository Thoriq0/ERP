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
        return new Collection([]);
        // return Inbound::latest()->take(7)->get();
        // return Inbound::all();
    }
    public function headings(): array {
        return [
            'id',
            'inbound_code',
            'product_id',
            'created_at',
            'updated_at',
            'qty',
            'pic',
            'created_by',
            'qc_status',
            'image',
            'pdf',
        ];
    }
    public function title(): string
    {
        return 'Inbound Data';
    }
}
