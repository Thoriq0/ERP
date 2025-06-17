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
        return Product::with(['category', 'supplier'])
            ->get()
            ->map(function ($product) {
                return [
                    'id'             => $product->id,
                    'name'           => $product->name,
                    'sku'            => $product->sku,
                    'category_id'    => $product->category_id,
                    'category_name'  => $product->category->name ?? '-',
                    'supplier_id'    => $product->supplier_id,
                    'supplier_name'  => $product->supplier->name ?? '-',
                    'created_at'     => $product->created_at,
                    'updated_at'     => $product->updated_at,
                ];
            });
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'sku',
            'category_id',
            'category_name',
            'supplier_id',
            'supplier_name',
            'created_at',
            'updated_at'
        ];
    }

    public function title(): string
    {
        return 'Product Data';
    }
}
