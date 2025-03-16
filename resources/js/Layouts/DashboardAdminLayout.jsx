import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie, HiUser, HiInbox } from "react-icons/hi";
import { FaWarehouse, FaUsersCog, FaTruck, FaMoneyBillWave } from "react-icons/fa";

export default function DashboardAdminLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <HiChartPie /> },
        { name: "User Warehouse", path: "/admin/user", icon: <HiUser /> },
        { name: "Warehouse", path: "/warehouse", icon: <FaWarehouse /> },
    ];

    const dropdownMenus = [
        {
            title: "Inventory",
            icon: <HiInbox />,
            items: [
                { name: "Product", path: "/admin/product" },
                { name: "Supplier", path: "/admin/supplier" },
                { name: "Category", path: "/admin/category"},
                { name: "Inbound", path: "/admin/inbound" },
                { name: "Pre-Stock", path: "/admin/prestock" },
                { name: "Outbound", path: "/admin/outbound" },
                { name: "Stock", path: "/admin/stock" },
                { name: "Reports", path: "/admin/reports" },
            ],
        },
        {
            title: "Logistic",
            icon: <FaTruck />,
            items: [
                { name: "Stock List", path: "/admin/stockList" },
                { name: "Add Item", path: "/admin/add" },
                { name: "Shipment ", path: "/admin/shipment" },
                { name: "Delivery", path: "/admin/delivery" },
                { name: "Reports", path: "/admin/reports" },
            ],
        },
        {
            title: "Finance",
            icon: <FaMoneyBillWave />,
            items: [
                { name: "Account Payable", path: "/admin/ap" },
                { name: "Payment", path: "/admin/payment" },
                { name: "Income", path: "/admin/income" },
                { name: "Outcome", path: "/admin/outcome" },
                { name: "Budget Control", path: "/admin/budget" },
                { name: "Reports", path: "/admin/reports" },
            ],
        },
        {
            title: "Human Resouce",
            icon: <FaUsersCog />,
            items: [
                { name: "Employee", path: "/admin/employee" },
                { name: "Time Off Request", path: "/admin/time" },
                { name: "Attendence", path: "/admin/attendance" },
                { name: "Reports", path: "/admin/reports" },
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
            <div className="ml-0 lg:ml-64 w-full">
                {children}
            </div>
        </div>
    );
}
