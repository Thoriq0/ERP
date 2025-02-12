import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie } from "react-icons/hi";
import { FaFileAlt, FaTruck, FaArrowCircleDown, FaShippingFast, FaBoxes } from "react-icons/fa";


export default function DashboardInventoryLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/wrhs/dashboard", icon: <HiChartPie /> },
        { name: "Inbound", path: "/wrhs/inbound", icon: <FaArrowCircleDown  /> },
        { name: "Outbound", path: "/wrhs/outbound", icon: <FaTruck /> },
        { name: "Stock", path: "/wrhs/stock", icon: <FaBoxes  /> },
        { name: "Shipment", path: "/wrhs/shipment", icon: <FaShippingFast  /> },
    ];

    const dropdownMenus = [
        {
            title: "Reports",
            icon: <FaFileAlt  />,
            items: [
                { name: "Inbound Reports", path: "/wrhs/inboundreports" },
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
