<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use App\Models\WarehouseManagement;
use PhpOffice\PhpSpreadsheet\Calculation\DateTimeExcel\Week;

class WarehouseManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('features/Warehouse', [
            'title' => "Warehouse",
            'wrhs' => WarehouseManagement::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'address' => 'required|string',
            'operator' => 'required|string',
            'contact' => 'required|integer'
        ]);

        WarehouseManagement::create([
            'name' => $request->name,
            'location' => $request->location,
            'address' => $request->address,
            'operator' => $request->operator,
            'contact' => $request->contact
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WarehouseManagement $warehouse)
    {
        $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'address' => 'required|string',
            'operator' => 'required|string',
            'contact' => 'required',
        ]);
    
        $warehouse->update([
            'name' => $request->name,
            'location' => $request->location,
            'address' => $request->address,
            'operator' => $request->operator,
            'contact' => $request->contact,
        ]);
    
        session()->flash('success', 'Data warehouse berhasil diperbarui!');
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WarehouseManagement $warehouse)
    {
        // dd($warehouse);
        $warehouse->delete();
        return redirect()->back();
    }
}
