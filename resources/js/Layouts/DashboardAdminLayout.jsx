import React, { useState } from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie, HiUser, HiInbox } from "react-icons/hi";
import { FaWarehouse, FaUsersCog, FaTruck, FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

export default function DashboardAdminLayout({ children, auth, ...props}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <HiChartPie /> },
        { name: "User Warehouse", path: "/admin/user", icon: <HiUser /> },
        { name: "Warehouse", path: "/admin/warehouse", icon: <FaWarehouse /> },
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
                { name: "Inbound Fail", path:"/admin/inboundFail"},
                { name: "Outbound", path: "/admin/outbound" },
                { name: "Stock", path: "/admin/stock" },
                // { name: "Reports", path: "/admin/reports" },
            ],
        },
        {
            title: "Logistic",
            icon: <FaTruck />,
            items: [
                // { name: "Stock List", path: "/admin/stockList" },
                // { name: "Add Item", path: "/admin/add" },
                { name: "Shipment ", path: "/admin/shipment" },
                { name: "Delivery", path: "/admin/delivery" },
                // { name: "Reports", path: "/admin/logisticReports" },
            ],
        },
        {
            title: "Finance",
            icon: <FaMoneyBillWave />,
            items: [
                { name: "Account Payable", path: "/admin/ap" },
                { name: "Payment", path: "/admin/payment" },
                // { name: "Income", path: "/admin/income" },
                { name: "Outcome", path: "/admin/outcome" },
                // { name: "Budget Control", path: "/admin/budget" },
                { name: "Billed Party", path: "/admin/bp" },
                // { name: "Reports", path: "/admin/financeReports" },
            ],
        },
        {
            title: "Human Resouce",
            icon: <FaUsersCog />,
            items: [
                { name: "Employee", path: "/admin/employee" },
                { name: "Time Off Request", path: "/admin/time" },
                { name: "Attendance", path: "/admin/attendance" },
                { name: "Reports Attendance", path: "/admin/reportattendance" },
            ],
        },
    ];

    return (
        <div className="flex">
            <MainSidebar
                {...props}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
                logo = "/images/Logo.svg"
                title="GETS"
                user={auth.user}
                menuItems={menuItems}
                dropdownMenus={dropdownMenus}
            />
            <div className={`transition-all duration-300 w-full mt-0 ${
                    isSidebarCollapsed ? "lg:ml-20" : "max-w-[1095px] lg:ml-64"
                }`}>
                {children}
            </div>
        </div>
    );
}
