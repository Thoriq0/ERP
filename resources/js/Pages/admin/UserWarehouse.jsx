import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import DataUserWarehouse from "@/Components/DataTables/DataUserWarehouse";
import { Head } from '@inertiajs/react';
import React from 'react';
import ToasterComponent from "@/Components/ToasterComponent";

export default function UserWarehouse({auth, title, user}) {
    const data = user;
    return (
        <DashboardAdminLayout auth={auth}>
            <ToasterComponent />
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
              <DataUserWarehouse data={data} />
            </div>
        </DashboardAdminLayout>
    );
}
