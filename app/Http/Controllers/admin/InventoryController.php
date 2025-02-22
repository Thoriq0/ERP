<?php

namespace App\Http\Controllers\admin;
use App\Models\Stock;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class InventoryController extends Controller
{

    // ==== MASTER DATA ====
        // ---- SUPPLIER ----
    public function supplierStore(Request $request){
        $request->validate([
            'name' => 'required|string',
            'contact' => 'required|integer',
            'address' => 'string'
        ]);

        Supplier::create([
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address
        ]);

    }
    public function supplierDestroy(Supplier $supplier){
        
        $supplier->delete();
        return redirect()->back();
    }

        // ---- PRODUCT ----
    public function productStore(Request $request){
        $request->validate([
            'name' => 'required|string',
            'category' => 'required|integer',
            'supplier' => 'required|integer'
        ]);

        Product::create([
            'name' => $request->name,
            'category_id' => $request->category,
            'supplier_id' => $request->supplier
        ]);

    }
    public function productDestroy(Product $product){
        
        $product->delete();
        return redirect()->back();
    }

        // ---- CATEGORY ----
    public function categoryStore(Request $request){
        $request->validate([
            'name' => 'required|string',
        ]);

        Category::create([
            'name' => $request->name,
        ]);

    }
    public function categoryDestroy(Category $category){
        
        $category->delete();
        return redirect()->back();
    }


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

        return redirect()->back();
        
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
