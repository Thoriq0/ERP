import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashbordHumanResouceLayout from "@/Layouts/DashboardHumanResourceLayout"; 
import DataTableTimeRequest from "@/Components/DataTables/DataTableTimeRequest";
import DataTableValidasiTimeRequest from "@/Components/DataTables/DataTableValidasiTImeRequest";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React, { useState } from 'react';


export default function TimeRequest({auth, mustVerifyEmail, status, title, emplys, lq, lqa}) {
    const getLayout = (role) => {
        switch (role) {
            case 'hr':
                return DashbordHumanResouceLayout; 
            default:
                return DashboardAdminLayout;
        }
    };

    const Layout = getLayout(auth.user.role);
    const role = auth.user.role;
    const data = lq;
    const datas = lqa;
    const [selectedIds, setSelectedIds] = React.useState([]);
    
    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Time Request" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTableTimeRequest mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={role} employee={emplys} selectedIds={selectedIds} />
                <hr className="my-5"/>
                <DataTableValidasiTimeRequest mustVerifyEmail={mustVerifyEmail} status={status} data={datas} userRole={role} employee={emplys} selectedIds={selectedIds} setSelectedIds={setSelectedIds}/>
            </div>
        </Layout>
    );
}



