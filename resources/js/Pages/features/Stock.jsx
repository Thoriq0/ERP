import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import DashboardInventoryLayout from '@/Layouts/DashboardInventoryLayout';
import DataTableStock from "@/Components/DataTables/DataTableStock";
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Stock({auth, mustVerifyEmail, status, title, stock}) {
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
    const stockData = stock;
    // console.log(stockData);
    return (
        <Layout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
              <DataTableStock mustVerifyEmail={mustVerifyEmail} status={status} data={stockData} userRole={role} />
          </div>

        </Layout>
    );
}



