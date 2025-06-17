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
        return Stock::with(['product'])
        ->get()
        ->map(function ($stock) {
            return [
                'id'             => $stock->id,
                'product_id'     => $stock->product_id,
                'product_name'   => $stock->product->name ?? '-',
                'Product_SKU'    => $stock->product->sku ?? '-',
                'qty'            => $stock->qty,
            ];
        });
    }

    public function headings(): array
    {
        // return Stock::first() ? array_keys(Stock::first()->toArray()) : [];
        return [
            'id',
            'product_id',
            'product_name',
            'Product_SKU',
            'qty',
        ];
    }
    public function title(): string
    {
        return 'Supplier Data';
    }
}


