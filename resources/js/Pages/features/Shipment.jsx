import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardInventoryLayout from "@/Layouts/DashboardInventoryLayout";
import DataTableShipmentOrder from "@/Components/DataTables/DataTableShipmentOrder";
import DataTableShipmentExecution from "@/Components/DataTables/DataTableShipmentExecution";
import ToasterComponent from "@/Components/ToasterComponent";

import { Head } from '@inertiajs/react';
import React from 'react';


export default function Shipment({auth, mustVerifyEmail, status, title, shipmentO, shipmentE, smallShip}) {
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
    const datas = shipmentO;
    const data = shipmentE;
    // console.log(shipment)
    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Shipment" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <DataTableShipmentOrder mustVerifyEmail={mustVerifyEmail} status={status} data={datas} smls={smallShip} userRole={role} />
                <hr className="my-5"/>
                <DataTableShipmentExecution mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={role} />
            </div>
        </Layout>
    );
}



