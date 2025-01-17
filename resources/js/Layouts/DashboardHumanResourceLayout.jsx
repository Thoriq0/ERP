import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie} from "react-icons/hi";
import { FaClipboardList, FaUserTie, FaFileAlt } from "react-icons/fa";
import { MdAccessTime, MdPayment } from "react-icons/md";

export default function DashboardAdminLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <HiChartPie /> },
        { name: "Employee", path: "/inbound", icon: <FaUserTie /> },
        { name: "Work Time", path: "/outbound", icon: <MdAccessTime  /> },
        { name: "Salary", path: "/stock", icon: <MdPayment /> },
        { name: "Attendance", path: "/shipment", icon: <FaClipboardList  /> },
    ];

    const dropdownMenus = [
        {
            title: "Reports",
            icon: <FaFileAlt  />,
            items: [
                { name: "Stock List", path: "/inventory/stock" },
                { name: "Add Item", path: "/inventory/add" },
                { name: "Reports", path: "/inventory/reports" },
            ],
        },
    ];

    return (
        <div className="flex">
            <MainSidebar
                logo = "/images/Logo.svg"
                title="GETS"
                user={auth.user}
                menuItems={menuItems}
                dropdownMenus={dropdownMenus}
            />
            <div className="ml-0 lg:ml-64 w-full p-6">
                {children}
            </div>
        </div>
    );
}
