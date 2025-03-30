<?php

namespace App\Exports;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class CategorySheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Category::all();
    }

    public function headings(): array
    {
        return Category::first() ? array_keys(Category::first()->toArray()) : [];
    }
    public function title(): string
    {
        return 'Category Data';
    }
}

