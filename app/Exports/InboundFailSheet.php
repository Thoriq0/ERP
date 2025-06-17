<?php

namespace App\Exports;

use App\Models\AdjustPrestock;
use App\Models\Supplier;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class InboundFailSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return AdjustPrestock::all();
        dd(AdjustPrestock::all());
    }

    public function headings(): array
    {
        return AdjustPrestock::first() ? array_keys(AdjustPrestock::first()->toArray()) : [];
        // return ['id', 'inbound_id', 'adjust_qty', 'created_by', 'note', 'created_at', 'updated_at'];
    }
    public function title(): string
    {
        return 'InboundFail Data';
    }
}


