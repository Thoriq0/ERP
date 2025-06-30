import { Head } from '@inertiajs/react';
import React from 'react';

import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import DashboardInventoryLayout from "@/Layouts/DashboardInventoryLayout"; 
import DashboardHumanResourceLayout from "@/Layouts/DashboardHumanResourceLayout";
import DashboardFinanceLayout from "@/Layouts/DashboardFinanceLayout";
import DashboardStaff from "@/Layouts/DashboardStaff";
import ReportsDataAttendance from "@/Components/DataTables/report/ReportsDataAttendance";
import ToasterComponent from "@/Components/ToasterComponent";

export default function AttendanceReport({auth, mustVerifyEmail, status, title, attendance, usr}) {
    const getLayout = (role) => {
        switch (role) {
            case 'wrhs':
                return DashboardInventoryLayout;
            case 'hr':
                return DashboardHumanResourceLayout;
            case 'fnc': 
                return DashboardFinanceLayout;
            case 'staff':
                return DashboardStaff;
            default:
                return DashboardAdminLayout;
        }
    };

    const role = auth.user.role;
    const roleName = auth.user.name;
    const Layout = getLayout(role);
    const data = attendance;

    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Report Attendance" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1>
            </div>
            <div className="p-6 mt-14">
                <ReportsDataAttendance mustVerifyEmail={mustVerifyEmail} status={status} data={data} userRole={role} roleName={roleName} user={usr}  />
            </div>

        </Layout>
    );
}



