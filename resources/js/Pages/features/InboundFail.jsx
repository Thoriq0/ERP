import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardInventoryLayout from "@/Layouts/DashboardInventoryLayout";
import { DataTableInboundFail } from "@/Components/DataTables/DataTableInboundFail";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React from 'react';

export default function InboundFail({auth, mustVerifyEmail, status, title, inbndf}) {
    const getLayout = (role) => {
        switch (role) {
            case 'wrhs':
                return DashboardInventoryLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const Layout = getLayout(auth.user.role);
    const userRole = auth.user.role;
    const data = inbndf;
    
    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Payment" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTableInboundFail mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={userRole} />
            </div>
        </Layout>
    );
}



