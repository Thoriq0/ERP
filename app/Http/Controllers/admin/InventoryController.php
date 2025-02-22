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
            'product' => 'required|exists:products,id',
            'qty' => 'required|integer',
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
            'product_id' => $request->product,
            'qty' => $request->qty,
            'pic' => $request->pic,
            'image' => $imageName
        ]);

        $product = Product::findOrFail($request->product);

        $stockQuery = Stock::whereHas('product', function ($query) use ($product) {
            $query->where('id', $product->id)
                    ->where('supplier_id', $product->supplier_id);});
        
        // dd($stockQuery);
        $stock = $stockQuery->first();

        if ($stock) {
            $stockQuery->update([
                'qty' => $stock->qty + $request->qty,
                'updated_at' => now(),
            ]);
        } else {
            Stock::create([
                'product_id' => $request->product,
                'qty' => $request->qty,
                // 'supplier_id' => $request->supplier,
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
    public function outboundStore(Request $request) {
        $request->validate([
            'product' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'receiver' => 'required|string',
            'pic' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);
        
        // Ambil data produk
        $product = Product::findOrFail($request->product);

        // Cek stok berdasarkan product_id dan supplier_id lewat relasi
        $stockQuery = Stock::whereHas('product', function ($query) use ($product) {
            $query->where('id', $product->id)
                    ->where('supplier_id', $product->supplier_id);});
        
        $stock = $stockQuery->first();
        
    
        // dd($stock->qty, (int) $request->qty);
        
        // Jika stok tidak cukup
        if (!$stock || $stock->qty < $request->qty) {
            return back()->withErrors(['message' => 'Stok tidak mencukupi ❌']);
        }
    
        $imageName = null;
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $extension = $image->extension();
    
            $imageName = strtolower(str_replace(' ', '-', $product->name)) . '-' .
                        strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                        date('d-m-Y-H:i:s') . '.' . $extension;
    
            $image->move(public_path('images/outbounds'), $imageName);
        }
    
        Outbound::create([
            'product_id' => $product->id,
            'qty' => $request->qty,
            'receiver' => $request->receiver,
            'pic' => $request->pic,
            'image' => $imageName
        ]);
        
        $stockQuery->update([
            'qty' => $stock->qty - (int) $request->qty,
            'updated_at' => now(),
        ]);
    
        return redirect()->back()->with(['message' => 'Barang berhasil dikeluarkan.']);
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
