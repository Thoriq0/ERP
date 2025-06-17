import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardInventoryLayout from "@/Layouts/DashboardInventoryLayout"; 
import DataTableWarehouse from "@/Components/DataTables/DataTableWarehouse";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React from 'react';

export default function Warehouse({auth, wrhs, title}) {
    const getLayout = () => {
        return DashboardAdminLayout; 
    };

    const role = auth.user.role;
    const Layout = getLayout(role);

    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="warehouse" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTableWarehouse data={wrhs} userRole={role} />
            </div>

        </Layout>
    );
}



