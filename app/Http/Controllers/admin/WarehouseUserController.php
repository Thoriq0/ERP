<?php

namespace App\Http\Controllers\admin;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class WarehouseUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/UserWarehouse', [
            'title' => 'User Warehouse',
            'user' => User::all()
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
            'role' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => 'required|string|min:8',
            'address' => 'required|string',
            'status' => 'required|string',
        ]);
        // dd($request);
        $save = [
            'name' => $request->name,
            'role' => $request->role,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'address' => $request->address,
            'status' => $request->status,
        ];
        
        User::create($save);
        return back();
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
    public function update(Request $request, string $id)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'role' => 'required|string',
            'status' => 'required|string',
        ]);

        $user = User::findOrFail($id);

        $user->update($validated);
        session()->flash('success', 'User Warehouse Data updated successfully! 🎉');
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        // dd($user);
        $user->delete();
        return redirect()->back();
    }
}
