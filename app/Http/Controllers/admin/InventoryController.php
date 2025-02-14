<?php

namespace App\Http\Controllers\admin;
use App\Models\Stock;
use App\Models\Inbound;
use App\Models\Outbound;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

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
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $extension = $image->extension();

            // Format nama file: product-pic-dd-mm-yyyy:hh:mm:ss.ext
            $imageName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                        strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                        date('d-m-Y:H:i:s') . '.' . $extension;

            $image->move(public_path('images/inbounds'), $imageName);
        }
        // dd($imageName);
        
        Inbound::create([
            'product' => $request->product,
            'qty' => $request->qty,
            'supplier' => $request->supplier,
            'category' => $request->category,
            'pic' => $request->pic,
            'image' => $imageName
        ]);

        $stockQuery = Stock::where('product', $request->product)
                        ->where('supplier', $request->supplier);

        $stock = $stockQuery->first();

        if ($stock) {
            $stockQuery->update([
                'qty' => $stock->qty + $request->qty,
                'updated_at' => now(),
            ]);
        } else {
            Stock::create([
                'product' => $request->product,
                'qty' => $request->qty,
                'supplier' => $request->supplier,
                'category' => $request->category,
                'warehouse' => null,
            ]);
        }
        return redirect()->back();
    }

    public function inboundDestroy(Inbound $inbound){
        
        if ($inbound->image) { 
            $imagePath = public_path('images/inbounds/' . $inbound->image); 
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $inbound->delete();
        return redirect()->back();
    }



    // ==== OUTBOUND ====
    public function outboundStore(Request $request){
        $request->validate([
            'product' => 'required|string',
            'qty' => 'required|integer',
            'receiver' => 'required|string',
            'category' => 'required|string',
            'pic' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);
        
        $imageName = null;
        
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $extension = $image->extension();

            $imageName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                        strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                        date('d-m-Y:H:i:s') . '.' . $extension;

            $image->move(public_path('images/outbounds'), $imageName);
        }

        $save = [
            'product' => $request->product,
            'qty' => $request->qty,
            'receiver' => $request->receiver,
            'category' => $request->category,
            'pic' => $request->pic,
            'image' => $imageName ? $imageName : null
        ];
        // dd($save);
        Outbound::create($save);

        // $stockQuery = Stock::where('product', $request->product)
        //             ->where('supplier', $request->supplier);

        // $stock = $stockQuery->first();
        // dd($stock);

        // if ($stock) {
        //     // Update query builder
        //     $stockQuery->update([
        //         'qty' => $stock->qty - $request->qty,
        //         'updated_at' => now(),
        //     ]);
        // }

        return redirect()->route('admin.outbound');
        
    }

    public function outboundDestroy(Outbound $Outbound){
        
        if ($Outbound->image) { 
            $imagePath = public_path('images/outbounds/' . $Outbound->image); 
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }
        }

        $Outbound->delete();
        return redirect()->back();
    }

}
