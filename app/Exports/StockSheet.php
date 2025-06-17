<?php

namespace App\Exports;

use App\Models\Stock;
use App\Models\Supplier;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class StockSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Stock::all();
    }

    public function headings(): array
    {
        return Stock::first() ? array_keys(Stock::first()->toArray()) : [];
        // return ['id', 'name', 'contact', 'address', 'account_number', 'account_name', 'account_bank_name', 'created_at', 'updated_at'];
    }
    public function title(): string
    {
        return 'Supplier Data';
    }
}


