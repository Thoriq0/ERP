import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUser, FaSignOutAlt, FaChevronRight, FaBell, FaCreditCard } from "react-icons/fa";
import { HiChevronUpDown, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function MainSidebar({ title, menuItems, logo, dropdownMenus, isSidebarCollapsed, setIsSidebarCollapsed }) {
    const { props } = usePage();
    const user = props.auth.user;

    const roleBasedRoute = (role) => {
        switch (role) {
            case 'admin':
            return route('admin.profile.edit');
            case 'staff':
            return route('staff.profile.edit');
            case 'hr':
            return route('hr.profile.edit');
            case 'wrhs':
            return route('wrhs.profile.edit');
            case 'fnc':
            return route('fnc.profile.edit');
            default:
            return route('profile.edit'); // fallback
        }
    };
    const { url } = usePage();
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); //mobile toggle 

    // Media query untuk mendeteksi ukuran layar tablet
    // keep dulu
    // useEffect(() => {
    //     const mediaQuery = window.matchMedia("(max-width: 1024px)"); 
    //     const handleMediaQueryChange = (e) => {
    //         setIsSidebarCollapsed(e.matches); 
    //     };
        
    //     handleMediaQueryChange(mediaQuery);
    //     mediaQuery.addEventListener("change", handleMediaQueryChange);
        
    //     return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    // }, [setIsSidebarCollapsed]);

    const toggleDropdown = (menuName) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [menuName]: !prev[menuName],
        }));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isDropdownActive = (dropdown) => {
        return dropdown.items.some((subItem) => url.startsWith(subItem.path));
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
                className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#42307D] to-[#6A4FCF] text-white transform transition-all duration-300 ease-in-out z-40
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    ${isSidebarCollapsed ? "md:w-20" : "md:w-64"} 
                    lg:translate-x-0`}
            >
                {/* Collapse button (Desktop only) */}
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="hidden lg:block absolute top-3 right-[-35px] text-white p-2 rounded-md z-50"
                >
                    {isSidebarCollapsed ? <HiChevronDoubleRight className="text-black text-xl" /> : <HiChevronDoubleLeft className="text-black text-xl" /> }
                </button>

                {/* logo and title */}
                <div className="flex flex-row mt-5 mb-2 ml-5">
                    {logo && (
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Logo" className="w-[50px] h-auto" />
                        </div>
                    )}
                    {!isSidebarCollapsed && (
                        <>
                            <h2 className="text-xl font-bold mt-2 ml-3 text-center">{title}</h2>
                        </>
                    )}
                </div>
                <div className='h-px w-[90%] mx-auto bg-[#C8C6C6] mt-3'></div>

                <nav className="flex flex-col p-4 space-y-2 overflow-y-auto h-[calc(100%-150px)] custom-scrollbar min-h-0">
                    {/* menu items */}
                    <div className="flex flex-col space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                title={isSidebarCollapsed ? item.name : ""}
                                className={`group flex items-center gap-3 p-2 rounded transition relative overflow-hidden ${
                                    url.startsWith(item.path)
                                        ? "bg-activeMenuSidebar font-semibold text-white"
                                        : "text-white hover:bg-[#D9D9D940]"
                                }`}
                            >
                                {/* Left Border Highlight */}
                                {url.startsWith(item.path) && (
                                    <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
                                )}
                                {/* Icon */}
                                <span
                                className={`text-md transition-transform duration-300 group-hover:scale-110 ${
                                    isSidebarCollapsed ? "mx-auto" : "ml-0"
                                } ${url.startsWith(item.path) ? "text-white" : "text-white/80"}`}
                                >
                                    {item.icon}
                                </span>


                                {!isSidebarCollapsed && <span>{item.name}</span>}

                                {isSidebarCollapsed && (
                                    <span
                                        className="absolute left-full ml-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50"
                                        style={{ visibility: isSidebarCollapsed ? 'hidden' : 'visible' }}
                                    >
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                    {/* Dropdown Menus */}
                    {dropdownMenus.map((dropdown) => {
                        const isActive = isDropdownActive(dropdown);
                        const isOpen = openDropdowns[dropdown.title] || isActive;

                        return (
                            <div key={dropdown.title} className="flex flex-col">
                                <button
                                    onClick={() => toggleDropdown(dropdown.title)}
                                    className={`flex items-center gap-2 p-2 rounded transition relative overflow-hidden justify-between
                                        ${isActive ? "bg-activeMenuSidebar font-semibold text-white border-l-4 border-white" : "text-white hover:bg-[#D9D9D940] border-l-4 border-transparent"}`}                                    
                                >
                                    <span className="flex items-center">
                                        {/* Icon */}
                                        <span
                                            className={`text-md transition-transform duration-300 group-hover:scale-110 ${
                                                isSidebarCollapsed ? "ml-1" : ""
                                            } ${isActive ? "text-white" : "text-white/80"}`}
                                        >
                                            {dropdown.icon}
                                        </span>

                                        {!isSidebarCollapsed && <span className="ml-3">{dropdown.title}</span>}
                                    </span>

                                    {!isSidebarCollapsed && (
                                        <FaChevronRight
                                            className={`w-2 h-3 transform transition-transform duration-300 ${
                                                isOpen ? "rotate-90" : ""
                                            }`}
                                        />
                                    )}

                                    {/* Tooltip untuk collapsed mode */}
                                    {isSidebarCollapsed && (
                                        <span className="absolute left-full ml-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                                            {dropdown.title}
                                        </span>
                                    )}
                                </button>

                                {/* Hide dropdown content ketika sidebar collapsed */}
                                {!isSidebarCollapsed && isOpen && (
                                    <div className="ml-4 pl-2 border-l border-gray-400 space-y-1 mt-1">
                                        {dropdown.items.map((subItem) => (
                                            <Link
                                                key={subItem.path}
                                                href={subItem.path}
                                                className={`flex text-sm items-center ml-2 p-2 transition rounded hover:bg-[#D9D9D940] ${
                                                    url.startsWith(subItem.path) ? "bg-activeMenuSidebar font-semibold" : ""
                                                }`}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                     
                </nav>

                {/* Account Menu */}
                <div className="absolute bottom-4 left-4 right-4">
                    <button
                        onClick={() => toggleDropdown("Account")}
                        className="flex w-full items-center justify-around rounded bg-[#D9D9D940] p-2 text-sm"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        {!isSidebarCollapsed && (
                            <span className="flex flex-col items-start ">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </span>
                        )}
                        <HiChevronUpDown size={20} />
                    </button>

                    {openDropdowns["Account"] && (
                        <div className="absolute left-full bottom-0 ml-5 w-56 rounded-md bg-white shadow-lg border border-gray-200 text-black">
                            <div className="px-4 py-3 border-b">
                                <div className="font-semibold text-sm">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            <div className="py-2">
                                <Link href={roleBasedRoute(user.role)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                                    <FaUser className="text-primaryPurple" /> Profile
                                </Link>
                            </div>
                            <div className="border-t">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <FaSignOutAlt className="text-red-800" /> Log Out
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
