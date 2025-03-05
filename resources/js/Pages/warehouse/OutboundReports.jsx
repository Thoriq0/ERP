import DashboardInventoryLayout from '@/Layouts/DashboardInventoryLayout';
import DataTableOutboundReports from "@/Components/DataTables/DataTableOutboundReports";
import { Head } from '@inertiajs/react';
import React from 'react';

export default function OutboundReports({auth, title}) {
    const data = [];
    return (
        <DashboardInventoryLayout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
              <DataTableOutboundReports data={data} />
            </div>
        </DashboardInventoryLayout>
    );
}
