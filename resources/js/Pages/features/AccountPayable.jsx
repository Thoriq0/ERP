import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardFinanceLayout from "@/Layouts/DashboardFinanceLayout"; 
import DataTableAccountPayable from "@/Components/DataTables/DataTableAccountPayable";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React from 'react';

export default function AccountPayable({auth, mustVerifyEmail, status, title, inbound, products, ap, bp}) {
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
    const data = inbound;
    const productsData = products;
    const AccountPayableData = ap;

    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTableAccountPayable mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={role} productData={productsData} apData={AccountPayableData} bp={bp} />
            </div>

        </Layout>
    );
}



