<?php

namespace App\Exports;

use App\Models\Inbound;
use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class InboundValue implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return Inbound::with(['product', 'user'])
            ->get()
            ->map(function ($inbound) {
                // dd($inbound->user);
                return [
                    'id'             => $inbound->id,
                    'inbound_code'   => $inbound->inbound_code,
                    'product_name'   => $inbound->product->name ?? '-',
                    'qty'            => $inbound->qty,
                    'created_by'     => $inbound->created_by,
                    'pic_name'       => $inbound->user->name ?? '-',
                ];
            });
    }

    public function headings(): array
    {
        return [
            'id',
            'inbound_code',
            'product_name',
            'qty',
            'created_by',
            'pic_name',
        ];
    }

    public function title(): string
    {
        return 'Inbound_Data';
    }
}
