<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ProductInboundSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Product::with(['category', 'supplier'])
            ->get()
            ->map(function ($product) {
                return [
                    'id'             => $product->id,
                    'name'           => $product->name,
                    'sku'            => $product->sku,
                    'category_name'  => $product->category->name ?? '-',
                    'supplier_name'  => $product->supplier->name ?? '-',
                ];
            });
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'sku',
            'category_name',
            'supplier_name',
        ];
    }

    public function title(): string
    {
        return 'Product_Data';
    }
}
