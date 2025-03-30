<?php

namespace App\Exports;

use App\Models\Supplier;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class SupplierSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Supplier::all();
    }

    public function headings(): array
    {
        return Supplier::first() ? array_keys(Supplier::first()->toArray()) : [];
    }
    public function title(): string
    {
        return 'Supplier Data';
    }
}


