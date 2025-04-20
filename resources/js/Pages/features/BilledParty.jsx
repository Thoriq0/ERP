import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardFinanceLayout from "@/Layouts/DashboardFinanceLayout"; 
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React from 'react';
import DataTableBilledParty from "@/Components/DataTables/DataTableBilledParty";

export default function BilledParty({auth, mustVerifyEmail, status, title, bp}) {
    const getLayout = (role) => {
        switch (role) {
            case 'fnc':
                return DashboardFinanceLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const role = auth.user.role;
    const Layout = getLayout(role);
    const data = bp;

    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
              <DataTableBilledParty mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={role} />
          </div>

        </Layout>
    );
}



