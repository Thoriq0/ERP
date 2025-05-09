import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardStaff from "@/Layouts/DashboardStaff"; 
import DashboardInventoryLayout from "@/Layouts/DashboardInventoryLayout"; 
import DashboardFinanceLayout from "@/Layouts/DashboardFinanceLayout"; 
import DataTableTimeRequestUser from "@/Components/DataTables/DataTableTimeRequestUser";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React, { useState } from 'react';


export default function TimeRequestUser({auth, mustVerifyEmail, title}) {
    const getLayout = (role) => {
        switch (role) {
            case 'staff':
                return DashboardStaff; 
            case 'fnc':
                return DashboardFinanceLayout; 
            case 'wrhs':
                return DashboardInventoryLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const Layout = getLayout(auth.user.role);
    const role = auth.user.role;
    const data = []
    
    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Time Request" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTableTimeRequestUser mustVerifyEmail={mustVerifyEmail} data={data} userRole={role} />
            </div>
        </Layout>
    );
}



