<?php

namespace App\Http\Controllers\admin;
use Carbon\Carbon;
use App\Models\Stock;
use App\Models\Expense;
use App\Models\Inbound;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Shipment;
use App\Models\Supplier;
use App\Models\BilledParty;
use Illuminate\Http\Request;
use App\Exports\InboundExport;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Log;
use App\Imports\InboundImport;
use App\Models\AccountPayable;
use App\Models\StagingInbound;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;

class InventoryController extends Controller
{

    // ==== MASTER DATA ====
        // ---- SUPPLIER ----
    public function supplierStore(Request $request){
        $request->validate([
            'name' => 'required|string',
            'contact' => 'required|integer',
            'address' => 'string',
            'accountNumber' => 'required|integer',
            'accountName' => 'required|string',
            'accountBankName' => 'required|string'
        ]);

        Supplier::create([
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address,
            'account_number' => $request->accountNumber,
            'account_name' => $request->accountName,
            'account_bank_name' => $request->accountBankName
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
            'accountNumber' => 'required|integer',
            'accountName' => 'required|string',
            'accountBankName' => 'required|string'
        ]);
    
        $supplier->update([
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address,
            'account_number' => $request->accountNumber,
            'account_name' => $request->accountName,
            'account_bank_name' => $request->accountBankName
        ]);
    
        session()->flash('success', 'Data Supplier berhasil diperbarui!');
        return redirect()->back();
    }

        // ---- PRODUCT ----
    public function productStore(Request $request){
        $request->validate([
            'name' => 'required|string',
            'category' => 'required|integer',
            'supplier' => 'required|integer',
            'sku' => 'required|string'
        ]);

        Product::create([
            'name' => $request->name,
            'category_id' => $request->category,
            'supplier_id' => $request->supplier,
            'sku' => $request->sku
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
            'sku' => 'required|string'
        ]);
    
        $product->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
            'sku' => $request->sku
        ]);
    
        session()->flash('success', 'Data Product berhasil diperbarui! 🎉');
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
    
        session()->flash('success', 'Data Category berhasil diperbarui! 🎉');
        return redirect()->back();
    }

    // ==== INBOUND ====
    public function inboundStore(Request $request){
        // dd($request->all());
        $request->validate([
            'product' => 'required|exists:products,id',
            'qty' => 'required|integer',
            'pic' => 'required|exists:users,id',
            'created' => 'required|string',
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'document.*' => 'nullable|mimes:pdf|max:5120'
        ]);
        
        $imageNames = [];
        $pdfNames = [];

        // Handle penyimpanan IMAGE
        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $image) {
                $extension = $image->extension();
                $imageName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                            strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                            date('d-m-Y-H-i-s') . '-' . uniqid() . '.' . $extension;

                $image->move(public_path('images/inbounds'), $imageName);
                $imageNames[] = $imageName;
            }
        }
        // dd($imageName);

        // Handle penyimpanan PDF
        if ($request->hasFile('document')) {
            foreach ($request->file('document') as $pdf) {
                $pdfName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                            strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                            date('d-m-Y-H-i-s') . '-' . uniqid() . '.' . $pdf->extension();
        
                $pdf->move(public_path('pdfs/inbounds'), $pdfName);
                $pdfNames[] = $pdfName; // Simpan nama file PDF dalam array
            }
        }
        
        $inbound = Inbound::create([
            'product_id' => $request->product,
            'qty' => $request->qty,
            'pic' => $request->pic,
            'created_by' => $request->created,
            'qc_status' => 'checking',
            'image' => json_encode($imageNames),
            'pdf' => json_encode($pdfNames)
        ]);

        StagingInbound::create([
            'inbound_id' => $inbound->id,
            'status' => 'validating',
            'stock_status' => 'On Hold',
            'payment_status' => 'unpaid',
        ]);

        return redirect()->back()->with('success', 'Inbound berhasil disimpan! 🎉');;
    }

    public function qcStock(Request $request){
        $request->merge([
            'selected_products' => array_map('intval', $request->selected_products)
        ]);
        // dd($request->selected_products);
    
        $request->validate([
            'selected_products' => 'required|array',
            'selected_products.*' => 'exists:staging_inbounds,id',
        ]);
        
        $inboundIds = StagingInbound::whereIn('id', $request->selected_products)
        ->pluck('inbound_id') // Ambil inbound_id dari setiap staging_inbounds
        ->toArray();
        
        // CHECKING STATUS STAGING

        $checking = StagingInbound::whereIn('id', $request->selected_products)->get();

        if ($checking->contains('status', 'validated')) {
            return redirect()->back()->with('error', 'Some products are already validated!');
        }

        // Update qc_status di tabel inbounds
        Inbound::whereIn('id', $inboundIds)
        ->update(['qc_status' => 'check']);
    
        // Update status langsung
        StagingInbound::whereIn('id', $request->selected_products)
            ->update(['status' => 'validated']);
        
        $today = Carbon::now()->format('dmy'); // Format: 030225 (03 Feb 2025)

        // Looping setiap produk yang dipilih untuk buat Account Payable
        foreach ($inboundIds as $index => $inbound_id) {
            
            // Hitung jumlah record yang sudah ada untuk hari ini + index agar tetap unik
            $recordCount = AccountPayable::whereDate('created_at', Carbon::today())->count() + $index + 1;
            
            // Generate Kode Unik untuk AP
            $ap_code = "INV-{$today}-{$recordCount}";

            // Cek apakah ap_code sudah ada
            while (AccountPayable::where('ap_code', $ap_code)->exists()) {
                $recordCount++;  // Tambah count untuk menghasilkan kode yang berbeda
                $ap_code = "INV-{$today}-{$recordCount}";  // Generate kode baru
            }
    
            // Buat record Account Payable
            AccountPayable::create([
                'ap_code' => $ap_code,
                'inbound_id' => $inbound_id,
                'unit_price' => 0,
                'tax' => 0,
                'total_amount' => 0,
                'status_payment' => 'unpaid',
                'due_date' => null, 
                'status_inbound' => true
            ]);
        }
            
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

    public function deleteFile(Request $request){   
        // dd($request->all());
        $fileName = $request->data['fileName'];
        $inboundId = $request->data['inboundId'];

        // GET EKSTENSI
        $extension = pathinfo($fileName, PATHINFO_EXTENSION);

        $inboundFind = Inbound::find($inboundId);

        if($extension === 'pdf'){
            // GET PDF JSON
            $getPdf = json_decode($inboundFind->pdf, true);
            // DELETE GET DATA
            $updatedPdf = array_filter($getPdf, function ($pdf) use ($fileName) {
                return $pdf !== $fileName; 
            });
            // TRANFORM JSON
            $updatedPdfJson = json_encode(array_values($updatedPdf));
            // UPDATE INBOUND
            $inboundFind->update(['pdf' => $updatedPdfJson]);
            
            // PATH FILE
            $filePath = public_path("pdfs/inbounds/{$fileName}");

            // CHECK AND DELETE
            if (file_exists($filePath)) {
                File::delete($filePath);
            } else {
                // dd("File tidak ditemukan!", $filePath);
            }
            return redirect()->back()->with('success', 'Document Berhasil Terhapus');
        }else{
            $getImg = json_decode($inboundFind->image, true);
            $updatedImg = array_filter($getImg, function ($img) use ($fileName) {
                return $img !== $fileName; 
            });
            $updatedImgJson = json_encode(array_values($updatedImg));
            $inboundFind->update(['image' => $updatedImgJson]);

            $filePath = public_path("images/inbounds/{$fileName}");
            if (file_exists($filePath)) {
                File::delete($filePath);
            } else {
                // dd("File tidak ditemukan!", $filePath);
            }
            return redirect()->back()->with('success', 'Image Berhasil Terhapus');
        }
    }

    public function inboundUpdate(Request $request, Inbound $inbound){
        // dd($request->all());

        // Input Validating
        $request->validate([
            'product_id' => 'required|integer',
            'qty' => 'required|integer',
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'document.*' => 'nullable|mimes:pdf|max:5120'
        ]);
        // dd($inbound, $request->product['value']);
        $imageNames = [];
        $pdfNames = [];

        // Handle penyimpanan IMAGE
        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $image) {
                $extension = $image->extension();
                $imageName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                            strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                            date('d-m-Y-H-i-s') . '-' . uniqid() . '.' . $extension;

                $image->move(public_path('images/inbounds'), $imageName);
                $imageNames[] = $imageName;
            }
        }
        // dd($imageName);

        // Handle penyimpanan PDF
        if ($request->hasFile('document')) {
            foreach ($request->file('document') as $pdf) {
                $pdfName = strtolower(str_replace(' ', '-', $request->product)) . '-' .
                            strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                            date('d-m-Y-H-i-s') . '-' . uniqid() . '.' . $pdf->extension();
        
                $pdf->move(public_path('pdfs/inbounds'), $pdfName);
                $pdfNames[] = $pdfName; // Simpan nama file PDF dalam array
            }
        }
        
        if($request->hasFile('document') || $request->hasFile('image')){
            $inboundImg = json_decode($inbound->image, true) ?? []; //Hasil nya array
            $inboundPdf = json_decode($inbound->pdf, true) ?? [];

            // Gabungkan array lama dengan yang baru
            $mergedImages = array_merge($inboundImg, $imageNames);
            $mergedPdfs = array_merge($inboundPdf, $pdfNames);

            // Simpan kembali ke database
            $inbound->image = json_encode($mergedImages);
            $inbound->pdf = json_encode($mergedPdfs);

        }

        $inbound->product_id = $request->product['value'] ?? $request->product_id;
        $inbound->qty = $request->qty;

        // Simpan semua perubahan ke database
        $inbound->save();

        return redirect()->back()->with('success', 'Data Inbound berhasil diperbarui! 🎉');
    }

    // ==== OUTBOUND ====
    public function outboundStore(Request $request) {
        // dd($request->all());
        $request->validate([
            'product' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'receiver' => 'required|string',
            'pic' => 'required|string',
            'image.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'document.*' => 'nullable|mimes:pdf|max:5120'
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
    
        $imageNames = [];
        $pdfNames = [];
    
        if ($request->hasFile('image')) {
            foreach ($request->file('image') as $image) {
                $extension = $image->extension();
                $imageName = strtolower(str_replace(' ', '-', $product->name)) . '-' .
                            strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                            date('d-m-Y-H-i-s') . '-' . uniqid() . '.' . $extension;
                
                $image->move(public_path('images/outbounds'), $imageName);
                $imageNames[] = $imageName;
            }
        }

        if ($request->hasFile('document')) {
            foreach ($request->file('document') as $pdf) {
                $pdfName = strtolower(str_replace(' ', '-', $product->name)) . '-' .
                            strtolower(str_replace(' ', '-', $request->pic)) . '-' .
                            date('d-m-Y-H-i-s') . '-' . uniqid() . '.' . $pdf->extension();
                
                $pdf->move(public_path('pdfs/outbounds'), $pdfName);
                $pdfNames[] = $pdfName; 
            }
        }
        
        $outbound = Outbound::create([
            'product_id' => $product->id,
            'qty' => $request->qty,
            'receiver' => $request->receiver,
            'pic' => $request->pic,
            'image' => json_encode($imageNames),
            'document' => json_encode($pdfNames)
        ]);
        
        $stockQuery->update([
            'qty' => $stock->qty - (int) $request->qty,
            'updated_at' => now(),
        ]);

        Shipment::create([
            'outbound_id' => $outbound->id,
            'status_shipment' => 'preparing'
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

    public function apStore(Request $request){
        // dd($request->all());
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
            'status_payment' => 'required|string|in:unpaid,paid,scheduled',
            'note' => 'nullable|string',
            'terms_condition' => 'nullable|string',
            'bp' => 'required|integer'
        ]);

        $today = Carbon::now()->format('dmy'); // Format: 030225 (03 Feb 2025)
        $recordCount = AccountPayable::whereDate('created_at', Carbon::today())->count() + 1;
        $ap_code = "INV-{$today}-{$recordCount}";

        AccountPayable::create([
            'ap_code' => $ap_code,
            'status_inbound' => false,
            'item_description' => json_encode($request->items),
            'discount' => $request->discount ?? 0,
            'tax' => $request->tax ?? 0,
            'total_amount' => $request->total_amount,
            'due_date' => $request->due_date,
            'status_payment' => $request->status_payment,
            'note' => $request->note,
            'terms_condition' => $request->terms_condition,
            'billed_party_id' => $request->bp,
        ]);

        return redirect()->back()->with('success', 'Account Payable berhasil dibuat! 🎉');
    }

    public function apUpdate(Request $request, AccountPayable $ap){
        // dd($request->all());
        if($request->selected_item === "single"){
            try {
                // Validasi input
                $request->validate([
                    'unit_price' => 'required|numeric|min:0',
                    'tax' => 'nullable|numeric|min:0',
                    'total_amount' => 'required|numeric|min:0',
                    'status_payment' => 'required|in:unpaid,scheduled,paid',
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
                $existingPayment = Payment::where('account_payable_id', $request->id)->first();
                
                if ($existingPayment) {
                    return redirect()->back()->with('error', 'Payment sudah terjadwal sebelumnya.');
                }

                $inboundId = $request->inbound_id;
                $status = $request->status_payment;

                StagingInbound::where('inbound_id', $inboundId)
                    ->update([
                        'payment_status' => $status
                    ]);
                Payment::create([
                    'account_payable_id' => $request->id,
                    'payment_code' => 'scheduled',
                    'status_payment' => $status
                ]);
            }else{
                $apId = $request->id;
                Payment::where('account_payable_id', $apId)->delete();
            }
        }else{
            try{
                $request->validate([
                    // 'unit_price' => 'required|numeric|min:0',
                    'tax' => 'nullable|numeric|min:0',
                    'total_amount' => 'required|numeric|min:0',
                    'status_payment' => 'required|in:unpaid,scheduled,paid,canceled',
                    'due_date' => 'required|date',
                    'discount' => 'nullable|numeric|min:0',
                    'note' => 'nullable|string',
                    'terms_condition' => 'nullable|string',
                    'bp' => 'nullable|integer',
                    'billed_party' => 'nullable|integer',
                    'item_description' => 'required|array|min:1',
                    'item_description.*.description' => 'required|string',
                    'item_description.*.qty' => 'required|integer|min:1',
                    'item_description.*.unit_price' => 'required|numeric|min:0'
                ]);
            }catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json(['error' => $e->errors()], 422);
            }
            $ap->update([
                'tax' => $request->tax,
                'total_amount' => $request->total_amount,
                'status_payment' => $request->status_payment,
                'due_date' => $request->due_date,
                'discount' => $request->discount,
                'note' => $request->note,
                'terms_condition' => $request->terms_condition,
                'billed_party' => $request->billed_party,
                'item_description' => json_encode($request->item_description),
            ]);

            if($request->status_payment === "scheduled"){
                $status = $request->status_payment;
    
                // Cek apakah sudah ada data Payment dengan account_payable_id yang sama
                $existingPayment = Payment::where('account_payable_id', $request->id)->first();
                
                if ($existingPayment) {
                    // Jika sudah ada, kirim session flash error
                    return redirect()->back()->with('error', 'Payment sudah terjadwal sebelumnya.');
                }
            
                // Jika belum ada, buat Payment baru
                Payment::create([
                    'account_payable_id' => $request->id,
                    'payment_code' => 'scheduled',
                    'status_payment' => $status
                ]);
            
                return redirect()->back()->with('success', 'Data Account Payable berhasil diperbarui!');
            }else{
                $apId = $request->id;
                Payment::where('account_payable_id', $apId)->delete();
            }
        }
        
        // Redirect dengan pesan sukses
        session()->flash('success', 'Data Account Payable berhasil diperbarui!');
        return redirect()->back();
    }

    public function apDestroy(AccountPayable $accountPayable ){
        // dd($accountPayable);
    }

    public function paymentGet(Request $request) {
        $payments = $request->input('payments'); 
        // dd($request->all());

        foreach ($payments as $payment) {
            Payment::where('id', $payment['payment_id'])
                ->update([
                    'payment_code' => str_replace('INV', 'PAID', $payment['ap_code']),
                    'status_payment' => 'paid'
                ]);
            AccountPayable::where('id', $payment['account_payable_id'])
                ->update([
                    'status_payment' => 'paid'
                ]);

            Expense::create([
                'payment_id' => $payment['payment_id'],
                'paid_code' => str_replace('INV', 'PAID', $payment['ap_code']),
                'references' => $payment['ap_code'],
                'total' => $payment['total_amount']
            ]);

            if($payment['inbound_id']){
                StagingInbound::where('inbound_id', $payment['inbound_id'])
                    ->update([
                        'payment_status' => 'paid'
                    ]);
            }
            // dd($payment);
        }
        session()->flash('success', 'Invoice berhasil dibayarkan!');
        return redirect()->back();
    }
    
    public function bpStore(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'bill_to' => 'required|string|max:255',
            'contact_bill' => 'required|string|max:20',
            'address_bill' => 'required|string',
            'email_bill' => 'required|email',
            'account_bill' => 'required|string',
            'account_bill_name' => 'required|string',
            'account_bank_name' => 'required|string',
        ]);

        BilledParty::create($request->all());

        return redirect()->back();
    }

    public function bpUpdate(Request $request, BilledParty $billedParty){
        $request->validate([
            'bill_to' => 'required|string|max:255',
            'contact_bill' => 'required|string|max:20',
            'address_bill' => 'required|string',
            'email_bill' => 'required|email',
            'account_bill' => 'required|integer',
            'account_bill_name' => 'required|string',
            'account_bank_name' => 'required|string',
        ]);
    
        $billedParty->update($request->all());
    
        session()->flash('success', 'Data Category berhasil diperbarui!');
        return redirect()->back();
    }

    public function bpDestroy(BilledParty $billedParty){
        // dd($billedParty);
        $billedParty->delete();
        return redirect()->back();
    }

    public function importInbound(Request $request){
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        Excel::import(new InboundImport, $request->file('file'));

        return redirect()->back();
    }
    public function exportInbound(Request $request){

        return Excel::download(new InboundExport, 'data_inbound.xlsx');

    }
    public function shipmentOrder(Request $request){
        $data = $request->validate([
            'shipments' => 'required|array',
            'shipments.*.shipment_id' => 'required|exists:shipments,id',
            'shipments.*.outbound_id' => 'required|exists:outbounds,id',
            'shipments.*.date' => 'required|date',
        ]);

        foreach ($data['shipments'] as $shipmentData) {
            // Update tabel shipment
            Shipment::where('id', $shipmentData['shipment_id'])
                ->update([
                    'delivery_estimate' => $shipmentData['date'],
                    'status_shipment' => 'shipping process',
                ]);

            // Update tabel outbound
            Outbound::where('id', $shipmentData['outbound_id'])
                ->update([
                    'out_status' => 'shipping process',
                ]);
        }
        // dd($request->all());
        return redirect()->back()->with('success', 'Produk Proses Pengiriman! 🚚');
    }
}
