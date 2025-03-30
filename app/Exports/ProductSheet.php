<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        // return Product::all();
        return Product::select('id', 'name', 'sku')->get();
    }

    public function headings(): array
    {
        // return Product::first() ? array_keys(Product::first()->toArray()) : [];
        return ['id', 'name', 'sku'];
    }
    
    public function title(): string
    {
        return 'Product Data';
    }
}
