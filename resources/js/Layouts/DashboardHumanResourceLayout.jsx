import React, {useState} from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie, HiUser} from "react-icons/hi";
import { FaClipboardList, FaUserTie, FaFileAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

export default function DashboardHumanResourceLayout({ children, auth, ...props }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/hr/dashboard", icon: <HiChartPie /> },
        // { name: "User Warehouse", path: "/hr/user", icon: <HiUser /> },
        { name: "Employee", path: "/hr/employee", icon: <FaUserTie /> },
        { name: "Time Off Request", path: "/hr/time", icon: <MdAccessTime  /> },
        { name: "Attendance", path: "/hr/attendance", icon: <FaClipboardList  /> },
        { name: "Reports Attendance", path: "/hr/reportattendance", icon: <FaFileAlt  /> },
    ];

    const dropdownMenus = [

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
