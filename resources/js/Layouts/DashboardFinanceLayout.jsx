import React, { useState }  from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie } from "react-icons/hi";
import { FaFileAlt, FaArrowCircleUp, FaArrowCircleDown, FaClipboardList, FaHandHoldingUsd, FaMoneyBillWave  } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";


export default function DashboardFinanceLayout({ children, auth, ...props}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const menuItems = [
        { name: "Dashboard", path: "/finance/dashboard", icon: <HiChartPie /> },
        { name: "Account Payable", path: "/finance/ap", icon: <FaHandHoldingUsd />},
        { name: "Payment", path: "/finance/payment", icon: <FaMoneyBillWave />},
        // { name: "Income", path: "/finance/income", icon: <FaArrowCircleUp  /> },
        { name: "Outcome", path: "/finance/outcome", icon: <FaArrowCircleDown  /> },
        { name: "Billed Party", path: "/finance/bp", icon: <FaArrowCircleDown  /> },
        { name: "Attendance", path: "/finance/attendance", icon: <FaClipboardList /> },
        { name: "Time of Request", path: "/finance/time", icon: <MdAccessTime /> },
        { name: "Reports Attendance", path: "/finance/reportattendance", icon: <FaFileAlt /> },
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
