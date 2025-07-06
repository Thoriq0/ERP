<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class UserSheet implements FromCollection, WithHeadings, WithTitle
{
    public function collection()
    {
        return User::select('id', 'name', 'email')->get();
    }

    public function headings(): array
    {
        // return User::first() ? array_keys(User::first()->toArray()) : [];
        return ['id', 'name', 'email'];
    }
    public function title(): string
    {
        return 'User_Data';
    }
}


