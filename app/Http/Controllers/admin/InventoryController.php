<?php

namespace App\Http\Controllers\admin;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Stock;
use App\Models\Expense;
use App\Models\Inbound;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Category;
use App\Models\Employee;
use App\Models\Outbound;
use App\Models\Shipment;
use App\Models\Supplier;
use App\Models\Attendance;
use App\Models\LeaveQuota;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Log;
use App\Models\AdjustStock;
use App\Models\BilledParty;
use Illuminate\Support\Str;
use App\Exports\StockExport;
use Illuminate\Http\Request;
use App\Exports\InboundExport;
use App\Exports\ProductExport;
use App\Imports\InboundImport;
use App\Models\AccountPayable;
use App\Models\AdjustPrestock;
use App\Models\StagingInbound;
use App\Exports\CategoryExport;
use App\Exports\SupplierExport;
use App\Exports\InboundFailExport;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
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
    
        session()->flash('success', 'Data supplier saved successfully!');
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
    
        session()->flash('success', 'Data Product saved successfully! 🎉');
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
    
        session()->flash('success', 'Data Category saved successfully! 🎉');
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

        return redirect()->back()->with('success', 'Inbound saved successfully! 🎉');;
    }


    public function qcStock(Request $request)
    {
    $request->merge([
        'selected_products' => array_map('intval', $request->selected_products)
    ]);

    $request->validate([
        'selected_products' => 'required|array',
        'selected_products.*' => 'exists:staging_inbounds,id',
    ]);

    $selectedStaging = StagingInbound::whereIn('id', $request->selected_products)->get();

    // Cek apakah ada yang sudah tervalidasi
    if ($selectedStaging->contains('status', 'validated')) {
        return redirect()->back()->with('error', 'Some products are already validated!');
    }
    
    $inboundIds = $selectedStaging->pluck('inbound_id')->toArray();

    // Update status
    Inbound::whereIn('id', $inboundIds)->update(['qc_status' => 'check']);
    StagingInbound::whereIn('id', $request->selected_products)->update(['status' => 'validated']);

    $today = Carbon::now()->format('dmy');

    // Ambil data inbound lengkap dan kelompokkan berdasarkan inbound_code
    $inbounds = Inbound::whereIn('id', $inboundIds)->get();
    // $grouped = $inbounds->groupBy('inbound_code');

    $grouped = $inbounds->whereNotNull('inbound_code')->groupBy('inbound_code');
    $noCode = $inbounds->whereNull('inbound_code');
    
    $apCounter = AccountPayable::whereDate('created_at', Carbon::today())
    ->distinct('ap_code')
    ->count('ap_code');

    foreach ($noCode as $inbound) {
        $apCounter++;
        $ap_code = "INV-{$today}-{$apCounter}";
    
        while (AccountPayable::where('ap_code', $ap_code)->exists()) {
            $apCounter++;
            $ap_code = "INV-{$today}-{$apCounter}";
        }
    
        AccountPayable::create([
            'ap_code' => $ap_code,
            'inbound_id' => $inbound->id,
            'inbound_bundling' => false,
            'unit_price' => 0,
            'tax' => 0,
            'total_amount' => 0,
            'status_payment' => 'unpaid',
            'due_date' => null,
            'status_inbound' => true
        ]);
    }


    foreach ($grouped as $code => $group) {
        $apCounter++;
        $ap_code = "INV-{$today}-{$apCounter}";
        
        // Kalau ternyata ap_code sudah ada, cari yang belum dipakai
        while (AccountPayable::where('ap_code', $ap_code)->exists()) {
            $apCounter++;
            $ap_code = "INV-{$today}-{$apCounter}";
        }

        foreach ($group as $inbound) {
            AccountPayable::create([
                'ap_code' => $ap_code,
                'inbound_id' => $inbound->id,
                'inbound_bundling' => count($group) > 1 ? true : false,
                'unit_price' => 0,
                'tax' => 0,
                'total_amount' => 0,
                'status_payment' => 'unpaid',
                'due_date' => null,
                'status_inbound' => true
            ]);
        }
    }

    return redirect()->back()->with('success', 'Stock validated & invoice created successfully!');
    }


    public function adjustPrestock(Request $request){
        
        // dd($request->all());
        $adjustments = $request->input('adjustments');

        foreach($adjustments as $adjustment){

            $inbound = Inbound::find($adjustment['inboundId']);

            $adjustQty = (int) $adjustment['quantity'];

            if ($adjustQty > $inbound->qty) {
                return back()->withErrors([
                    'msg' => "Stok untuk '{$adjustment['name']}' insufficient. The maximum is only {$inbound->qty}."
                ])->withInput();
            }

            $newQty = $inbound->qty - $adjustQty;

            $inbound->update([
                'qty' => $newQty
            ]);

            AdjustPrestock::create([
                'inbound_id' => $inbound->id,
                'adjust_qty' => $adjustQty,
                'note' => $adjustment['note'],
            ]);
        }
        return back()->with('success', 'The stock was adjusted successfully');
    }

    public function adjustStock(Request $request)
    {
        $adjustments = $request->input('items');
        
        foreach ($adjustments as $item) {
            $productId = $item['productId'];
            $qty = (int) $item['qty'];
            $status = $item['status'];
            $note = $item['note'];

            // Ambil stok
            $stock = Stock::where('product_id', $productId);

            if ($status === 'extra') {
                $newQty = $stock->first()->qty + $qty;
            } else {
                if ($qty > $stock->first()->qty) {
                    return redirect()->back()->with('error', 'Qty exceeds available stock');
                }
                $newQty = $stock->first()->qty - $qty;
            }

            $stock->update([
                'qty' => $newQty
            ]);

            AdjustStock::create([
                'product_id' => $productId,
                'qty' => $qty,
                'status' => $status,
                'note' => $note,
            ]);
        }
        return redirect()->back()->with('success', 'Stock successfully adjusted');
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

        $outboundFind = Inbound::find($inboundId);

        if($extension === 'pdf'){
            // GET PDF JSON
            $getPdf = json_decode($outboundFind->pdf, true);
            // DELETE GET DATA
            $updatedPdf = array_filter($getPdf, function ($pdf) use ($fileName) {
                return $pdf !== $fileName; 
            });
            // TRANFORM JSON
            $updatedPdfJson = json_encode(array_values($updatedPdf));
            // UPDATE INBOUND
            $outboundFind->update(['pdf' => $updatedPdfJson]);
            
            // PATH FILE
            $filePath = public_path("pdfs/inbounds/{$fileName}");

            // CHECK AND DELETE
            if (file_exists($filePath)) {
                File::delete($filePath);
            } else {
                // dd("File tidak ditemukan!", $filePath);
            }
            return redirect()->back()->with('success', 'Document Deleted Successfully');
        }else{
            $getImg = json_decode($outboundFind->image, true);
            $updatedImg = array_filter($getImg, function ($img) use ($fileName) {
                return $img !== $fileName; 
            });
            $updatedImgJson = json_encode(array_values($updatedImg));
            $outboundFind->update(['image' => $updatedImgJson]);

            $filePath = public_path("images/inbounds/{$fileName}");
            if (file_exists($filePath)) {
                File::delete($filePath);
            } else {
                // dd("File tidak ditemukan!", $filePath);
            }
            return redirect()->back()->with('success', 'Image Deleted Successfully');
        }
    }

    public function deleteOutbound(Request $request){
        // dd($request->all());

        $fileName = $request->data['fileName'];
        $outboundId = $request->data['outboundId'];
        
        // GET EKSTENSI
        $extension = pathinfo($fileName, PATHINFO_EXTENSION);

        $outboundFind = Outbound::find($outboundId);

        if($extension === 'pdf'){
            // GET PDF JSON
            $getPdf = json_decode($outboundFind->document, true);
            // DELETE GET DATA
            $updatedPdf = array_filter($getPdf, function ($pdf) use ($fileName) {
                return $pdf !== $fileName; 
            });
            // TRANFORM JSON
            $updatedPdfJson = json_encode(array_values($updatedPdf));
            // UPDATE OUTBOUND
            $outboundFind->update(['document' => $updatedPdfJson]);
            
            // PATH FILE
            $filePath = public_path("pdfs/outbounds/{$fileName}");

            // CHECK AND DELETE
            if (file_exists($filePath)) {
                File::delete($filePath);
            } else {
                // dd("File tidak ditemukan!", $filePath);
            }
            return redirect()->back()->with('success', 'Document Deleted Successfully');
        }else{
            $getImg = json_decode($outboundFind->image, true);
            $updatedImg = array_filter($getImg, function ($img) use ($fileName) {
                return $img !== $fileName; 
            });
            $updatedImgJson = json_encode(array_values($updatedImg));
            $outboundFind->update(['image' => $updatedImgJson]);

            $filePath = public_path("images/outbounds/{$fileName}");
            if (file_exists($filePath)) {
                File::delete($filePath);
            } else {
                // dd("File tidak ditemukan!", $filePath);
            }
            return redirect()->back()->with('success', 'Image Deleted Successfully');
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

        return redirect()->back()->with('success', 'Inbound data updated successfully! 🎉');
    }

    // ==== OUTBOUND ====
    public function outboundStore(Request $request) {
        // dd($request->all());
        $request->validate([
            'product' => 'required|exists:products,id',
            'qty' => 'required|integer|min:1',
            'receiver' => 'required|string',
            'address' => 'required|string',
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
            return back()->withErrors(['message' => 'Not enough stock ❌']);
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
            'address' => $request->address,
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

    
        return redirect()->back()->with(['message' => 'Item successfully removed']);
    }

    public function outboundUpdate(Request $request, Outbound $outbound){

        $request->validate([
            "qty" => "required|integer|min:1",
            'receiver' => 'required|string',
            'address' => 'required|string',
        ]);

        $oldQty = $outbound->qty; // qty lama
        $newQty = $request->qty;  // qty baru dari input
        $selisih = 0;

        $stockQuery = Stock::where('product_id', $outbound->product_id);
        $stock = $stockQuery->first();
        
        if ($newQty > $oldQty) {
            $selisih = $newQty - $oldQty;

            if ($stock->qty < $selisih) {
                return redirect()->back()->with('error', 'Insufficient stock to increase the number of outbound');
            }

            // Kurangi stok
            $stockQuery->update([
                "qty" =>  $stock->qty -= $selisih
            ]) ;

        } elseif ($newQty < $oldQty) {
            $selisih = $oldQty - $newQty;
            
            // Tambah stok
            $stockQuery->update([
                "qty" =>  $stock->qty += $selisih
            ]) ;
        }


        $outbound->update([
            'qty' => $newQty,
            'receiver' => $request->receiver,
            'address' => $request->address,
        ]);

        return redirect()->back()->with('success', 'Outbound was successfully changed! 🎉');
    }
    

    public function outboundDestroy(Outbound $Outbound){

        // TRANSFER BACK QTY
        $getQty = $Outbound->qty;

        $stockQuery = Stock::where('product_id', $Outbound->product_id);

        if($stockQuery){
            $stock = $stockQuery->first();
            $stockQuery->update([
                'qty' => $stock->qty + $getQty,
            ]);
        }

        // DELETING FILE
        $documents = $Outbound->document;
        $images = $Outbound->image;

        if ($documents || $images) { 
            $dcmntjs = json_decode($documents);
            $imgjs = json_decode($images);
            
            // Document Path
            foreach($dcmntjs as $dcmnts){
                $documentPath = public_path("pdfs/outbounds/{$dcmnts}");
                if(File::exists($documentPath)){
                    File::delete($documentPath);
                }
            }

            foreach($imgjs as $imgs){
                $imgePath = public_path("images/outbounds/{$imgs}");

                if(File::exists($imgePath)){
                    File::delete($imgePath);
                }
            }

        }
        
        // DELETING DB
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

        $today = Carbon::now()->format('dmy'); // Misalnya: 300525
        $prefix = "INV-{$today}-";

        // Cari kode terakhir hari ini (yang paling besar)
        $lastAp = AccountPayable::where('ap_code', 'like', "{$prefix}%")
            ->orderByRaw("CAST(SUBSTR(ap_code, LENGTH('{$prefix}') + 1) AS UNSIGNED) DESC")
            ->first();

        // Ambil nomor terakhir dan tambahkan 1
        $lastNumber = $lastAp ? (int)substr($lastAp->ap_code, strlen($prefix)) : 0;
        $nextNumber = $lastNumber + 1;

        $ap_code = "{$prefix}{$nextNumber}";
        
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

        return redirect()->back()->with('success', 'Account Payable successfully created! 🎉');
    }

    public function apUpdate(Request $request, AccountPayable $ap){
        // dd($request->all());
        if($request->selected_item === "single"){
            if($request->isInboundBunlding === false){
                // dd("SINGLE");
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
    
                
                if($request->status_payment === "scheduled"){
                    $existingPayment = Payment::where('account_payable_id', $request->id)->first();
                    
                    if ($existingPayment) {
                        return redirect()->back()->with('error', 'Payment is pre-scheduled.');
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
                $inboundBundling = $request->inboundBundling;
                // dd("BUNDLING");
                $dudate = $request->due_date;
                $tax = $request->tax;
                $statusPayment = $request->status_payment;
                
                foreach($inboundBundling as $inbound){
                    $queryAp = AccountPayable::where('inbound_id', $inbound['inboundId'] );
                    $getAp = $queryAp->first();
                    
                    $unitPrice = $inbound['unit_price'];
                    $totalAmount = $inbound['total_item'];

                    $queryAp->update([
                        'due_date' => $dudate,
                        'unit_price' => $unitPrice,
                        'tax' => $tax,
                        'total_amount' =>  $totalAmount,
                        'status_payment' => $statusPayment
                    ]);
                }

                if($statusPayment === "scheduled"){

                    $existingPayment = Payment::where('account_payable_id', $request->id)->first();
                    // dd($existingPayment);
                    if ($existingPayment) {
                        return redirect()->back()->with('error', 'Payment is pre-scheduled.');
                    }
                    foreach($inboundBundling as $inbound){

                        StagingInbound::where('inbound_id', $inbound['inboundId'])
                        ->update([
                            'payment_status' => $statusPayment
                        ]);

                        Payment::create([
                            'account_payable_id' => $inbound['id'], 
                            'payment_code' => 'scheduled',
                            'status_payment' => $statusPayment
                        ]);
                    }

                }
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
                    return redirect()->back()->with('error', 'Payment is pre-scheduled.');
                }
            
                // Jika belum ada, buat Payment baru
                Payment::create([
                    'account_payable_id' => $request->id,
                    'payment_code' => 'scheduled',
                    'status_payment' => $status
                ]);
            
                return redirect()->back()->with('success', 'Account Payable data is updated successfully');
            }else{
                $apId = $request->id;
                Payment::where('account_payable_id', $apId)->delete();
            }
        }
        
        // Redirect dengan pesan sukses
        session()->flash('success', 'Account Payable data is updated successfully!');
        return redirect()->back();
    }

    public function apDestroy(AccountPayable $accountPayable ){
        // dd($accountPayable);
    }

    public function paymentGet(Request $request) {
        $payments = $request->input('payments'); 
        // dd($request->all());

        foreach ($payments as $payment) {
            // dd($payment);
            $queryAp = AccountPayable::where('ap_code', $payment['ap_code']);
            $apGet = $queryAp->get();
            
            // dd($apGet);

            if ($apGet->count() > 1) { //Bundling
                
                foreach ($apGet as $ap) {

                    $queryPayment = Payment::where('account_payable_id', $ap->id);
                    $getPayment = $queryPayment->first();

                    $paidCode = str_replace('INV', 'PAID', $ap->ap_code);

                    // Update Payment (pastikan relasi id-nya benar)
                    Payment::where('account_payable_id', $ap->id)
                        ->update([
                            'payment_code' => $paidCode,
                            'status_payment' => 'paid'
                        ]);
            
                    // Update AccountPayable
                    AccountPayable::where('id', $ap->id)
                        ->update([
                            'status_payment' => 'paid'
                        ]);
            
                    // Insert Expense
                    Expense::create([
                        'payment_id' => $getPayment->id,
                        'paid_code' => $paidCode,
                        'references' => $ap->ap_code,
                        'total' => $ap->total_amount
                    ]);

                    if($payment['inbound_id']){
                        StagingInbound::where('inbound_id', $ap->inbound_id)
                            ->update([
                                'payment_status' => 'paid'
                            ]);
                    }
                }

            }else{
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
            }
            
            // dd($payment);
        }
        session()->flash('success', 'Invoice successfully paid!');
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
    
        session()->flash('success', 'Billed Party data updated successfully!');
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

        $user = Auth::user();

        Excel::import(new InboundImport($user), $request->file('file'));

        return redirect()->back();
    }
    public function exportInbound(Request $request){

        return Excel::download(new InboundExport, 'data_inbound.xlsx');

    }
    public function exportProduct(Request $request){

        return Excel::download(new ProductExport, 'data_product.xlsx');

    }
    public function exportSupplier(Request $request){
        return Excel::download(new SupplierExport, 'data_supplier.xlsx');
    }
    public function exportCategory(Request $request){
        return Excel::download(new CategoryExport, 'data_category.xlsx');
    }
    public function exportInboundFail(Request $request){
        return Excel::download(new InboundFailExport, 'data_inboundFail.xlsx');
    }
    public function exportStock(Request $request){
        return Excel::download(new StockExport, 'data_Stock.xlsx');
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
        return redirect()->back()->with('success', 'Product is in the Shipping Process! 🚚');
    }

    // ---- EMPLOYEE ----
    public function employeeStore(Request $request){
        
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'departemen' => 'string',
            'dateOfBirth' => 'required|date',
            'gender' => 'string',
            'phone' => 'string',
            'address' => 'required|string',
        ]);

         // Tanggal hari ini
        $today = Carbon::now()->format('Y-m-d');
        // Hitung jumlah data yang dibuat hari ini
        $recordToday = Employee::whereDate('created_at', $today)->count() + 1;
        // Buat unique number: DDMMYYYY + 3-digit urutan
        $uniqueNumber = Carbon::now()->format('dmY') . str_pad($recordToday, 3, '0', STR_PAD_LEFT);
        
        Employee::create([
            'name' => $request->name,
            'email' => $request->email,
            'departemen' => $request->departemen,
            'dateOfBirth' => $request->dateOfBirth,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
            'uniqueNumber' => $uniqueNumber,
            'leave_quota' => 12
        ]);

        $birthDate = Carbon::parse($request->dateOfBirth);
        $passwordDefault = $birthDate->format('dm y'); // contoh: 160775
        $passwordDefault = str_replace(' ', '', $passwordDefault); // hilangkan spasi kalau ada
        // dd($uniqueNumber);
        // Simpan data user berdasarkan employee
        // dd($passwordDefault);
        User::create([
            'name' => $request->name,
            'role' => 'staff',
            'email' => $request->email,
            'password' => Hash::make($passwordDefault),
            'address' => $request->address,
            'status' => 'validating',
            'uniqueNumber' => $uniqueNumber
        ]);
        
    }
    public function employeeDestroy(Employee $employee){
        $employee->delete();
        return redirect()->back();
    }
    
    public function employeeUpdate(Request $request, Employee $employee){
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'departemen' => 'string',
            'dateOfBirth' => 'required|date',
            'gender' => 'string',
            'phone' => 'string',
            'address' => 'required|string',
        ]);
    
        $employee->update([
            'name' => $request->name,
            'email' => $request->email,
            'departemen' => $request->departemen,
            'dateOfBirth' => $request->dateOfBirth,
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        User::where('uniqueNumber', $request->uniqueNumber)->update([
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
        ]);
    
        session()->flash('success', 'Employee Data updated successfully! 🎉');
        return redirect()->back();
    }
    public function deliveryVal(Request $request){
        // dd($request->all());

        $selectedIds = $request->input('selected_products');

        foreach($selectedIds as $selected){
            $outboundId = Shipment::where('id', $selected)->value('outbound_id');
    
            // Update shipment
            Shipment::where('id', $selected)->update([
                'status_shipment' => 'Delivered'
            ]);
    
            // Update outbound
            Outbound::where('id', $outboundId)->update([
                'out_status' => 'Delivered'
            ]);
        }

        session()->flash('success', 'Delivery Data updated successfully! 🎉');
        return redirect()->back();
    }

    public function timeStore(Request $request){
        // dd($request->all());

        $request->validate([
            "name" => "required",
            "note" => "required",
            "leave_dates" => "required"
        ]);

        $dates = $request->leave_dates;
        $jsonDates = json_encode($dates);
        $employeeid = (int) $request->employee_id;

        $countDates = count($dates);
        $query = Employee::where('id', $employeeid);
        $getData = $query->first();
        
        LeaveQuota::create([
            "employee_id" => $employeeid,
            "createdBy" => $request->name,
            "note" => $request->note,
            "dueto" => $jsonDates,
            "status" => "validating"
        ]);

        // UPDATE EMPLOYEE
        // $currentLeave = $getData->leave_quota;
        // $query->update([
        //     'leave_quota' => $currentLeave - $countDates
        // ]);

        
    }
    public function timeDestroy(LeaveQuota $leavequota){
        $leavequota->delete();
        return redirect()->back();
    }
    public function timeUpdate(Request $request, LeaveQuota $leavequota){
        
        $validated = $request->validate([
            'note' => 'nullable|string',
            'dueto' => 'required|array',
            'dueto.*' => 'date', 
        ]);

        $leavequota->note = $validated['note'];
        $leavequota->dueto = json_encode($validated['dueto']); 
        $leavequota->save();

        
        return back()->with('success', 'Leave data is successfully updateds! 🎉');
    }

    public function timeValidate(Request $request){
        // dd($request->selected);

        $id = $request->selected;

        foreach($id as $selected){
            $query = LeaveQuota::where('id', $selected);
            $getData = $query->first();

            $dates = $getData->dueto;
            $jsonDates = json_decode($dates);
            $countDates = count($jsonDates);

            $employee = $getData->employee_id;
            $employeeQuery = Employee::where('id', $employee);
            $employeeGet = $employeeQuery->first();

            $leaveQuota = $employeeGet->leave_quota;

            $employeeQuery->update([
                'leave_quota' => $leaveQuota - $countDates
            ]);
            $query->update([
                'status' => 'validated'
            ]);
        }
        return back()->with('success', 'Leave data is successfully validated! 🎉');
    }
    
    public function attendanceTake(Request $request){

        $request->validate([
            'image' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'status' => 'required|in:in,out',
        ]);
    
        $imageData = $request->image;
        $userId = $request->user_id;
        $userName = Str::slug($request->name); // biar aman buat nama file
        $status = $request->status;
        $timestamp = Carbon::now()->format('dmY-H-i');
    
        $fileName = "{$status}-{$userName}-{$userId}-{$timestamp}.jpg";
    
        $image = str_replace('data:image/jpeg;base64,', '', $imageData);
        $image = str_replace(' ', '+', $image);
        $imagePath = public_path("images/attandance");
    
        // pastiin folder-nya ada
        if (!File::exists($imagePath)) {
            File::makeDirectory($imagePath, 0755, true);
        }
    
        File::put("{$imagePath}/{$fileName}", base64_decode($image));
    
        // Simpan ke database
        Attendance::create([
            'user_id' => $userId,
            'status' => $status,
            'image' => "{$fileName}",
        ]);
    
        // return response()->json(['message' => 'Absensi berhasil disimpan.']);
        return redirect()->back()->with('success', 'Attendance is saved successfully 🎉');
    }
}
