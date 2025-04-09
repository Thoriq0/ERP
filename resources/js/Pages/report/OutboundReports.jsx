import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import DashboardInventoryLayout from '@/Layouts/DashboardInventoryLayout';
import ReportsDataTableOutbound from "@/Components/DataTables/report/ReportsDataTableOutbound";
import { Head } from '@inertiajs/react';
import React from 'react';

export default function OutboundReports({auth, mustVerifyEmail, status, title, outbound, products, suppliers, stocks, usr}) {
    const getLayout = (role) => {
        switch (role) {
            case 'wrhs':
                return DashboardInventoryLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const role = auth.user.role;
    const Layout = getLayout(role);
    const data = outbound;
    const productsData = products;
    const suppliersData = suppliers;

    return (
        <Layout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <ReportsDataTableOutbound mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={role} supplierData={suppliersData} productData={productsData} dataStocks={stocks} usr={usr} />
            </div>

        </Layout>
    );
}



