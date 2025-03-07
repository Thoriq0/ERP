import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashbordHumanResouceLayout from "@/Layouts/DashboardHumanResourceLayout"; 
import DataTablePayment from "@/Components/DataTables/DataTablePayment";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React from 'react';

export default function Employee({auth, mustVerifyEmail, status, title, payments}) {
    const getLayout = (role) => {
        switch (role) {
            case 'hr':
                return DashbordHumanResouceLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const Layout = getLayout(auth.user.role);
    const data = payments;

    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTablePayment mustVerifyEmail={mustVerifyEmail} status={status} data={data} />
            </div>
        </Layout>
    );
}



