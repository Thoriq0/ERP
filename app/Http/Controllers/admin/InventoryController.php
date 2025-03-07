<?php

namespace App\Http\Controllers\admin;
use App\Models\Stock;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Models\AccountPayable;
use App\Models\StagingInbound;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class InventoryController extends Controller
{

    // ==== MASTER DATA ====
        // ---- SUPPLIER ----
    public function supplierStore(Request $request){
        $request->validate([
            'name' => 'required|string',
            'contact' => 'required|integer',
            'address' => 'string',
            'accountN' => 'required|integer' 
        ]);

        Supplier::create([
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address,
            'account_number' => $request->accountN
        ]);

    }
    public function supplierDestroy(Supplier $supplier){
        
        $supplier->delete();
        return redirect()->back();
    }

    public function supplierUpdate(Request $request, Supplier $supplier){
        $request->validate([
            'name' => 'required|string',
            'contact' => 'required|string',
            'address' => 'required|string',
        ]);
    
        $supplier->update([
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address,
        ]);
    
        session()->flash('success', 'Data Supplier berhasil diperbarui!');
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

    public function productUpdate(Request $request, Product $product){
        $request->validate([
            'name' => 'required|string',
            'category_id' => 'required|integer',
            'supplier_id' => 'required|integer',
        ]);
    
        $product->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
        ]);
    
        session()->flash('success', 'Data Product berhasil diperbarui!');
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

    public function categoryUpdate(Request $request, Category $category){
        $request->validate([
            'name' => 'required|string',
        ]);
    
        $category->update([
            'name' => $request->name,
        ]);
    
        session()->flash('success', 'Data Category berhasil diperbarui!');
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
        
        $inbound = Inbound::create([
            'product_id' => $request->product,
            'qty' => $request->qty,
            'pic' => $request->pic,
            'image' => $imageName
        ]);

        StagingInbound::create([
            'inbound_id' => $inbound->id,
            'status' => 'validating',
            'stock_status' => 'On Hold',
            'payment_status' => 'unpaid',
        ]);

        $today = Carbon::now()->format('dmy'); // Format: 030225 (03 Feb 2025)

        // Hitung jumlah record untuk hari ini (biar unik)
        $recordCount = AccountPayable::whereDate('created_at', Carbon::today())->count() + 1;

        $ap_code = "INV-{$today}-{$recordCount}";

        AccountPayable::create([
            'ap_code' =>$ap_code,
            'inbound_id' => $inbound->id,
            'unit_price' => 0,
            'tax' => 0,
            'total_amount' => 0,
            'status_payment' => 'unpaid',
            'due_date' => '',
            'status_inbound' => true
        ]);

        // $product = Product::findOrFail($request->product);

        // $stockQuery = Stock::whereHas('product', function ($query) use ($product) {
        //     $query->where('id', $product->id)
        //             ->where('supplier_id', $product->supplier_id);});
        
        // // dd($stockQuery);
        // $stock = $stockQuery->first();

        // if ($stock) {
        //     $stockQuery->update([
        //         'qty' => $stock->qty + $request->qty,
        //         'updated_at' => now(),
        //     ]);
        // } else {
        //     Stock::create([
        //         'product_id' => $request->product,
        //         'qty' => $request->qty,
        //         // 'supplier_id' => $request->supplier,
        //         'warehouse' => null,
        //     ]);
        // }
        return redirect()->back();
    }

    public function qcStock(Request $request){
        $request->merge([
            'selected_products' => array_map('intval', $request->selected_products)
        ]);
    
        $request->validate([
            'selected_products' => 'required|array',
            'selected_products.*' => 'exists:staging_inbounds,id',
        ]);
    
        // Update status langsung
        StagingInbound::whereIn('id', $request->selected_products)
            ->update(['status' => 'validated']);
    
        return redirect()->back()->with('success', 'Stock validated successfully!');
    }

    public function validateStock(Request $request){
        $request->validate([
            'selected_products' => 'required|array',
            'selected_products.*' => 'exists:staging_inbounds,id',
        ]);
        
        $queryValidate = StagingInbound::whereIn('id', $request->selected_products);

        $queryValidate->update([
            'stock_status' => 'In Stock'
        ]);

        $validatedProducts = $queryValidate->get();
        // dd($validatedProducts);
    
        foreach ($validatedProducts as $product) {
            $inbound = $product->inbound;
            
            // Cek apakah stok dengan produk yang sama sudah ada
            $stockQuery = Stock::where('product_id', $inbound->product_id);
            $stock = $stockQuery->first();
            
            if ($stock) {
                $stockQuery->update([
                    'qty' => $stock->qty + $inbound->qty,
                    'updated_at' => now(),
                ]);
            } else {
                // Jika belum ada, buat record baru
                Stock::create([
                    'product_id' => $inbound->product_id,
                    'qty' => $inbound->qty,
                    // 'fnc_status' => 'need payment',
                    // 'stk_status' => 'restrict stock',
                    'warehouse' => null, 
                ]);
            }
    
            // Update status di staging_inbounds menjadi "validated"
            $product->update(['status' => 'validated']);
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

    public function inboundUpdate(Request $request, Inbound $inbound){
        // dd($request->all());
        // Validasi input
        $request->validate([
            'qty' => 'required|integer',
            'pic' => 'required|string',
        ]);
    
        // Update data inbound
        $inbound->update([
            // 'product_id' => $validated['product'],
            'qty' => $request->qty,
            'pic' => $request->pic,
        ]);

        session()->flash('success', 'Data Category berhasil diperbarui!');
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

    public function apUpdate(Request $request, AccountPayable $ap){
        // dd($request->status_payment);
        try {
            // Validasi input
            $request->validate([
                'unit_price' => 'required|numeric|min:0',
                'tax' => 'nullable|numeric|min:0',
                'total_amount' => 'required|numeric|min:0',
                'status_payment' => 'required|in:unpaid,scheduled,paid,overdue',
                'due_date' => 'required|date',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
        
        // Update data jika validasi lolos
        $ap->update([
            'unit_price' => $request->unit_price,
            'tax' => $request->tax,
            'total_amount' => $request->total_amount,
            'status_payment' => $request->status_payment,
            'due_date' => $request->due_date,
        ]);
        
        // dd($request->all(), $ap);
        if($request->status_payment === "scheduled"){
            $inboundId = $request->inbound_id;
            $status = $request->status_payment;
            // dd($status);
            StagingInbound::where('inbound_id', $inboundId)
                ->update([
                    'payment_status' => $status
                ]);
            Payment::create([
                'account_payable_id' => $inboundId,
                'payment_code' => 'scheduled',
                'status_payment' => $status
            ]);
        }
        

        // Redirect dengan pesan sukses
        session()->flash('success', 'Data Category berhasil diperbarui!');
        return redirect()->back();
    }

    public function paymentGet(Request $request) {
        $payments = $request->input('payments'); 
        // dd($payments);

        foreach ($payments as $payment) {
            Payment::where('id', $payment['payment_id'])
                ->update([
                    'payment_code' => str_replace('INV', 'PAY', $payment['ap_code']),
                    'status_payment' => 'paid'
                ]);
            AccountPayable::where('id', $payment['account_payable_id'])
                ->update([
                    'status_payment' => 'paid'
                ]);
            StagingInbound::where('inbound_id', $payment['inbound_id'])
                ->update([
                    'payment_status' => 'paid'
                ]);
            // dd($payment);
        }
        session()->flash('success', 'Data Category berhasil diperbarui!');
        return redirect()->back();
    }
    

}
