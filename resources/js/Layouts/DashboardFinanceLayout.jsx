import React from 'react';
import MainSidebar from '@/Components/MainSidebar';
import { HiChartPie } from "react-icons/hi";
import { FaFileAlt, FaArrowCircleUp, FaArrowCircleDown, FaBalanceScale, FaHandHoldingUsd  } from "react-icons/fa";


export default function DashboardAdminLayout({ children, auth }) {
    const menuItems = [
        { name: "Dashboard", path: "/finance/dashboard", icon: <HiChartPie /> },
        { name: "Account Payable", path: "/finance/ap", icon: <FaHandHoldingUsd />},
        { name: "Income", path: "/finance/income", icon: <FaArrowCircleUp  /> },
        { name: "Outcome", path: "/finance/outcome", icon: <FaArrowCircleDown  /> },
        { name: "Budget Control", path: "/finance/budget", icon: <FaBalanceScale   /> },
    ];

    const dropdownMenus = [
        {
            title: "Reports",
            icon: <FaFileAlt  />,
            items: [
                { name: "Income Reports", path: "/finance/Income Reports" },
                { name: "Outcome Reports", path: "/finance/Outcome Reports" },
                { name: "Budget Reports", path: "/finance/Budget Reports" },
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
