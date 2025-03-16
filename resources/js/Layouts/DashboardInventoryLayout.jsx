import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie } from "react-icons/hi";
import { FaFileAlt, FaTruck } from "react-icons/fa";
import { HiInbox } from "react-icons/hi";


export default function DashboardInventoryLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/wrhs/dashboard", icon: <HiChartPie /> },
    ];

    const dropdownMenus = [
        {
            title: "Inventory",
            icon: <HiInbox />,
            items: [
                { name: "Product", path: "/wrhs/product" },
                { name: "Supplier", path: "/wrhs/supplier" },
                { name: "Category", path: "/wrhs/category"},
                { name: "Inbound", path: "/wrhs/inbound" },
                { name: "Outbound", path: "/wrhs/outbound" },
                { name: "Pre Stock", path: "/wrhs/prestock" },
                { name: "Stock", path: "/wrhs/stock" }
            ],
        },
        {
            title: "Logistic",
            icon: <FaTruck />,
            items: [
                { name: "Stock List", path: "/wrhs/stockList" },
                { name: "Add Item", path: "/wrhs/add" },
                { name: "Shipment ", path: "/wrhs/shipment" },
                { name: "Delivery", path: "/wrhs/delivery" },
                { name: "Reports", path: "/wrhs/reports" },
            ],
        },
        {
            title: "Reports",
            icon: <FaFileAlt  />,
            items: [
                { name: "Inbound Reports", path: "/wrhs/inboundReports" },
                { name: "Outbound Reports", path: "/wrhs/outboundreports" },
                { name: "Stock Reports", path: "/wrhs/stockreports" },
                { name: "Shipment Reports", path: "/wrhs/shipmentreports" },
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
