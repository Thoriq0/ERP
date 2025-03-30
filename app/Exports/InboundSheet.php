<?php

namespace App\Exports;

use App\Models\Inbound;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class InboundSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Inbound::latest()->take(7)->get();
        // return Inbound::all();
    }
    public function headings(): array
    {
        return Inbound::first() ? array_keys(Inbound::first()->toArray()) : [];
    }
    public function title(): string
    {
        return 'Inbound Data';
    }
}
