import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie, HiUser, HiInbox } from "react-icons/hi";
import { FaWarehouse, FaUsersCog, FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function DashboardAdminLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/", icon: <HiChartPie /> },
        { name: "User Warehouse", path: "/user", icon: <HiUser /> },
        { name: "Warehouse", path: "/warehouse", icon: <FaWarehouse /> },
    ];

    const dropdownMenus = [
        {
            title: "Inventory",
            icon: <HiInbox />,
            items: [
                { name: "Stock List", path: "/inventory/stock" },
                { name: "Add Item", path: "/inventory/add" },
                { name: "Reports", path: "/inventory/reports" },
            ],
        },
        {
            title: "Logistic",
            icon: <FaTruck />,
            items: [
                { name: "Stock List", path: "/inventory/stock" },
                { name: "Add Item", path: "/inventory/add" },
                { name: "Reports", path: "/inventory/reports" },
            ],
        },
        {
            title: "Finance",
            icon: <FaMoneyBillWave />,
            items: [
                { name: "Stock List", path: "/inventory/stock" },
                { name: "Add Item", path: "/inventory/add" },
                { name: "Reports", path: "/inventory/reports" },
            ],
        },
        {
            title: "Human Resouce",
            icon: <FaUsersCog />,
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
