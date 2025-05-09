import React, {useState} from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie } from "react-icons/hi";
import { FaFileAlt, FaTruck, FaClipboardList } from "react-icons/fa";
import { HiInbox } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";


export default function DashboardInventoryLayout({ children, auth, ...props }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/wrhs/dashboard", icon: <HiChartPie /> },
        { name: "Attendance", path: "/wrhs/attendance", icon: <FaClipboardList /> },
        { name: "Time of Request", path: "/wrhs/time", icon: <MdAccessTime /> },
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
                    isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
                }`}>
                {children}
            </div>
        </div>
    );
}
