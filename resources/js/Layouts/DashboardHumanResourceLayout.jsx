import React, {useState} from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie} from "react-icons/hi";
import { FaClipboardList, FaUserTie, FaFileAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

export default function DashboardHumanResourceLayout({ children, auth, ...props }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/hr/dashboard", icon: <HiChartPie /> },
        { name: "Employee", path: "/hr/employee", icon: <FaUserTie /> },
        { name: "Time Off Request", path: "/hr/time", icon: <MdAccessTime  /> },
        { name: "Attendance", path: "/hr/attendance", icon: <FaClipboardList  /> },
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
