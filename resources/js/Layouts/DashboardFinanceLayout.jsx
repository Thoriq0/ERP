import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie } from "react-icons/hi";
import { FaFileAlt, FaArrowCircleUp, FaArrowCircleDown, FaBalanceScale  } from "react-icons/fa";


export default function DashboardAdminLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/", icon: <HiChartPie /> },
        { name: "Income", path: "/income", icon: <FaArrowCircleUp  /> },
        { name: "Outcome", path: "/outcome", icon: <FaArrowCircleDown  /> },
        { name: "Budget Control", path: "/budget", icon: <FaBalanceScale   /> },
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
