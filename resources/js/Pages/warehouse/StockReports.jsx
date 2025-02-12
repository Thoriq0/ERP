import DashboardInventoryLayout from '@/Layouts/DashboardInventoryLayout';
import DataTableStockReports from "@/Components/DataTableStockReports";
import { Head } from '@inertiajs/react';
import React from 'react';

export default function StockReports({auth, title}) {
    const data = [];
    return (
        <DashboardInventoryLayout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
              <DataTableStockReports data={data} />
            </div>
        </DashboardInventoryLayout>
    );
}
