import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardFinanceLayout from "@/Layouts/DashboardFinanceLayout"; 
import DataTableOutcome from "@/Components/DataTableOutcome";
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Shipment({auth, mustVerifyEmail, status, title}) {
    const getLayout = (role) => {
        switch (role) {
            case 'fnc':
                return DashboardFinanceLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const Layout = getLayout(auth.user.role);
    const data = [];

    return (
        <Layout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
              <DataTableOutcome mustVerifyEmail={mustVerifyEmail} status={status} data={data} />
          </div>

        </Layout>
    );
}
