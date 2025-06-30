import React, { useState } from 'react';
import NavbarUser from '@/Components/NavbarUser';

import { HiChartPie, HiUser, HiInbox } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { FaClipboardList, FaFileAlt } from "react-icons/fa";

export default function DashboardStaff({ children, auth, ...props }) {

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/staff/dashboard", icon: <HiChartPie /> },
        { name: "Attendance", path: "/staff/attandance", icon: <FaClipboardList /> },
        { name: "Time Of Request", path: "/staff/time", icon: <MdAccessTime /> },
        { name: "Reports Attendance", path: "/staff/reportattendance", icon: <FaFileAlt /> },
        { name: "Profil", path: "/staff/profile", icon: <HiUser /> },
    ];



    return (
        <div className="flex">
            <NavbarUser
                {...props}
                isSidebarCollapsed={isSidebarCollapsed}
                setIsSidebarCollapsed={setIsSidebarCollapsed}
                logo = "/images/user-alt.svg"
                title={auth.user.name}
                email={auth.user.email}
                user={auth.user}
                menuItems={menuItems}
            />
            <div className={`transition-all duration-300 w-full mt-0 ${
                    isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
                }`}>
                {children}
                
            </div>
            
        </div>
    );
}
