import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HiMenuAlt3, HiX, HiChevronRight } from "react-icons/hi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export default function NavbarUser({ title, menuItems, logo, dropdownMenus, user, email, isSidebarCollapsed, setIsSidebarCollapsed, }) {
    const { url } = usePage();
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = (menuName) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-2 right-4 z-50 p-2 bg-primaryPurple text-white rounded shadow-lg"
            >
                {isSidebarOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#42307D] to-[#6A4FCF] text-white transform transition-[width,transform] duration-300 ease-in-out z-40
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                ${isSidebarCollapsed ? "lg:w-16" : "lg:w-64"} 
                lg:translate-x-0`}
                style={{ willChange: 'transform, width' }}
            >
                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="hidden lg:block absolute top-3 right-[-40px] z-50 text-black p-2"
                >
                    {isSidebarCollapsed ? <HiChevronDoubleRight className="text-black text-xl" /> : <HiChevronDoubleLeft className="text-black text-xl" />}
                </button>

                {/* Logo and Title */}
                <div className="flex flex-col items-center justify-center mt-5 mb-2">
                    {logo && (
                        <div className="flex items-center justify-center">
                            <img
                                src={logo}
                                alt="Logo"
                                className={`transition-all duration-300 ${
                                    isSidebarCollapsed ? "w-[20px]" : "w-[40px]"
                                } h-auto`}
                            />
                        </div>
                    )}
                    {!isSidebarCollapsed && (
                        <>
                            <h2 className="text-xl font-bold mt-2">{title}</h2>
                            <h2 className="text-sm font-semibold">{email}</h2>
                        </>
                    )}
                </div>

                <div className="h-px w-[90%] mx-auto bg-[#C8C6C6] mt-3"></div>

                {/* Menu Items */}
                <nav className="flex flex-col p-4 space-y-2 overflow-y-auto h-[calc(100%-150px)] custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            title={isSidebarCollapsed ? item.name : ""}
                            className={`group flex items-center gap-2 p-2 rounded transition relative overflow-hidden ${
                                url.startsWith(item.path)
                                    ? "bg-activeMenuSidebar font-semibold text-white"
                                    : "text-white hover:bg-[#D9D9D940]"
                            }`}
                        >
                            {/* Left Border Highlight */}
                            {url.startsWith(item.path) && (
                                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
                            )}

                            {/* Icon dengan animasi */}
                            <span
                                className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                                    url.startsWith(item.path) ? "text-white" : "text-white/80"
                                }`}
                            >
                                {item.icon}
                            </span>

                            {!isSidebarCollapsed && <span>{item.name}</span>}

                            {/* Optional tooltip ketika collapse */}
                            {isSidebarCollapsed && (
                                <span
                                    className="absolute left-full ml-2 px-2 py-1 text-xs bg-gray-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap z-50"
                                >
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className={`absolute bottom-8 left-4 right-4 transition-all`}>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded bg-[#D9D9D940] text-white p-2 text-sm font-bold"
                    >
                        <FaSignOutAlt />
                        {!isSidebarCollapsed && <span>Log Out</span>}
                    </Link>
                </div>
            </div>
        </>
    );
}
