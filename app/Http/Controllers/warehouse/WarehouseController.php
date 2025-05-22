<?php

namespace App\Http\Controllers\warehouse;

use Inertia\Inertia;
use App\Models\Stock;
use App\Models\User;
use App\Models\Inbound;
use App\Models\Product;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Shipment;
use App\Models\Supplier;
use App\Models\Employee;
use App\Models\Attendance;
use App\Models\LeaveQuota;
use App\Models\StagingInbound;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB; 

class WarehouseController extends Controller
{
    // view
    public function view(Request $request){
        $inHold = StagingInbound::where('stock_status', 'On Hold')->count();
        $inStock = StagingInbound::where('stock_status', 'In Stock')->count();
        $totalShipment = Shipment::count();
        $totalSchedule = Shipment::where('status_shipment', 'preparing')->count();
        $totalShipped = Shipment::where('status_shipment', 'shipping process')->count();
        $totalDelivered = Shipment::where('status_shipment', 'Delivered')->count();

        // query untuk chart
        $selectedMonth = $request->get('month');

        $months = collect(range(1, 12))->map(function ($month) {
            return str_pad($month, 2, '0', STR_PAD_LEFT);
        });

        $inbound = DB::table('inbounds')
            ->selectRaw("strftime('%m', created_at) as month, COUNT(*) as total")
            ->groupByRaw("strftime('%m', created_at)")
            ->pluck('total', 'month');
        
        $outbound = DB::table('outbounds')
            ->selectRaw("strftime('%m', created_at) as month, COUNT(*) as total")
            ->groupByRaw("strftime('%m', created_at)")
            ->pluck('total', 'month');
            // Gabungkan data ke dalam 1 array dengan default 0 jika tidak ada data

        $chartData = $months->map(function ($month) use ($inbound, $outbound) {
            return [
                'month' => $month,
                'inbound' => $inbound[$month] ?? 0,
                'outbound' => $outbound[$month] ?? 0,
            ];
        });
        
        return Inertia::render('warehouse/Dashboard', [
            'title' => 'Dashboard WareHouse',
            'in_hold' => $inHold,
            'in_stock' => $inStock,
            'total_shipment' => $totalShipment,
            'total_schedule' => $totalSchedule,
            'total_shipped' => $totalShipped,
            'total_delivered' => $totalDelivered,
            // 'inboundData' => $inboundData,
            // 'selectedMonth' => $selectedMonth,
            'chartData' => $chartData,
        ]);
    }

    public function inboundView(){
        // dd();
        return inertia::render('features/Inbound', [
            'title' => 'Inventory Inbound',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name,contact,address'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'usr' => User::all(),
            
        ]);
        // dd(Inbound::all());
    }

    public function outboundView(){
        // dd();
        return inertia::render('features/Outbound', [
            'title' => 'Inventory Outbound',
            'outbound' => Outbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                        ->select('id', 'name', 'category_id', 'supplier_id')
                        ->get(),
            'stocks' => Stock::with(['product:id,name,category_id,supplier_id', 'product.category:id,name', 'product.supplier:id,name'])
            ->select('id', 'qty', 'warehouse', 'product_id')
            ->get(),
            'usr' => User::select('id', 'name')->get()
        ]);
        // dd(Inbound::all());
    }

    public function stockView(){
        // dd();
        return inertia::render('features/Stock', [
            'title' => 'Inventory Stock',
            'stock' => Stock::with(['product.category', 'product.supplier'])->get(),
        ]);
        // dd(Inbound::all());
    }

    public function shipmentView(){
        // dd();
        return inertia::render('features/Shipment', [
            'title' => 'Logistic Shipment',
            'shipmentO' => Shipment::with([
                'outbound:id,qty,out_status,product_id,receiver,created_at', 
                'outbound.product:id,name,category_id,supplier_id',
                'outbound.product.category:id,name',
                'outbound.product.supplier:id,name'
            ])
            ->where('status_shipment', 'preparing')
            ->select('id', 'outbound_id', 'delivery_estimate', 'status_shipment')
            ->get(),

            'shipmentE' => Shipment::with([
                'outbound:id,qty,out_status,product_id,receiver,created_at', 
                'outbound.product:id,name,category_id,supplier_id',
                'outbound.product.category:id,name',
                'outbound.product.supplier:id,name'
            ])
            ->where('status_shipment', 'shipping process')
            ->select('id', 'outbound_id', 'delivery_estimate', 'status_shipment')
            ->get(),

            'smallShip' => Shipment::with(['outbound.product:id,name'])->select('id', 'outbound_id')->get(),
        ]);
        // dd(Inbound::all());
    }

    public function productView(){
        // dd();
        return inertia::render('features/Product', [
            'title' => 'Inventory Product',
            'product' => Product::all(),
            'categories' => Category::select('id', 'name')->get(),
            'suppliers' => Supplier::select('id', 'name')->get(),
        ]);
        // dd(Inbound::all());
    }

    public function categoryView(){
        // dd();
        return inertia::render('features/Category', [
            'title' => 'Inventory Category',
            'category' => Category::all(),
        ]);
    }

    public function supplierView(){
        // dd();
        return inertia::render('features/Supplier', [
            'title' => 'Inventory Supplier',
            'supplier' => Supplier::all()
        ]);
        // dd(Inbound::all());
    }

    public function inboundReportsView(){
        // dd();
        return inertia::render('warehouse/InboundReports', [
            'title' => 'Inventory Inbound Reports',
            'inbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }

    public function outboundreportsView(){
        // dd();
        return inertia::render('warehouse/OutboundReports', [
            'title' => 'Inventory Outbound Reports',
            'outbound' => Inbound::all()
        ]);
        // dd(Inbound::all());
    }
    public function stockreportsView(){
        // dd();
        return inertia::render('warehouse/StockReports', [
            'title' => 'Inventory Stock Reports',
            
        ]);
        // dd(Inbound::all());
    }
    public function shipmentreportsView(){
        // dd();
        return inertia::render('warehouse/ShipmentReports', [
            'title' => 'Logistic Shipment Reports',
            
        ]);
        // dd(Inbound::all());
    }

    public function prestockView(){
        return inertia::render('features/PreStockValidation', [
            'title' => 'Inventory Validating Stock',
            'inbound' => Inbound::all(),
            'products' => Product::with(['category:id,name', 'supplier:id,name'])
                            ->select('id', 'name', 'category_id', 'supplier_id')
                            ->get(),
            'staging' => StagingInbound::with([
                'inbound.product.category',
                'inbound.product.supplier'
            ])->get()
            // ->where('status', 'validating')->get()
        ]);
        
    }

    public function deliveryView(){
        // dd();
        return inertia::render('features/Delivery', [
            'title' => 'Logistic Delivery',
            'shipmentE' => Shipment::with([
                'outbound:id,qty,out_status,product_id,receiver,created_at', 
                'outbound.product:id,name,category_id,supplier_id',
                'outbound.product.category:id,name',
                'outbound.product.supplier:id,name'
            ])
            ->whereIn('status_shipment', ['shipping process', 'Delivered'])
            ->select('id', 'outbound_id', 'delivery_estimate', 'status_shipment')
            ->get(),
        ]);
    }

    public function timeView(){
        // dd();
        return inertia::render('features/TimeRequestUser', [
            'title' => 'Warehouse Time Off Request',
            'emplys' => Employee::all(),
            'lq' => LeaveQuota::all(),
            'lqa' => LeaveQuota::where('status', 'validating')->get()
        ]);
        // dd(Employee::all());
    }

    public function attendanceView(){
        // dd();
        return inertia::render('features/Attendance', [
            'title' => 'Warehouse Attendance',
            'atdnc' => Attendance::all()
        ]);
        // dd(Inbound::all());
    }



}
