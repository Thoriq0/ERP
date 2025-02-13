<?php

namespace App\Http\Controllers\admin;
use App\Http\Controllers\Controller;
use App\Models\Inbound;
use Illuminate\Http\Request;

class InventoryController extends Controller
{

    // ==== INBOUND ====
    public function inboundStore(Request $request){
        // dd($request->all());
        $request->validate([
            'product' => 'required|string',
            'qty' => 'required|integer',
            'supplier' => 'required|string',
            'category' => 'required|string',
            'pic' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);
        
        $imageName = null;
        
        // Cek apakah ada file yang diunggah
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Ambil ekstensi file
            $extension = $image->extension();

            // Format nama file: product-pic-dd-mm-yyyy:hh:mm:ss.ext
            $imageName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                        strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                        date('d-m-Y:H:i:s') . '.' . $extension;

            // Pindahkan file ke folder public/images/inbounds
            $image->move(public_path('images/inbounds'), $imageName);
        }
        // dd($imageName);
        $save = [
            'product' => $request->product,
            'qty' => $request->qty,
            'supplier' => $request->supplier,
            'category' => $request->category,
            'pic' => $request->pic,
            'image' => $imageName ? $imageName : null
        ];
        // dd($save);
        Inbound::create($save);
        return redirect()->route('admin.inbound');
        
    }

    public function inboundDestroy(Inbound $inbound){
        $inbound->delete();
        return redirect()->back();
    }
}
