import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUser, FaSignOutAlt, FaChevronRight, FaBell, FaCreditCard } from "react-icons/fa";
import { HiChevronUpDown } from "react-icons/hi2";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function MainSidebar({ title, menuItems, logo, dropdownMenus, user }) {
    const { url, component } = usePage();
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                className={`fixed top-0 left-0 h-full w-64 bg-primaryPurple text-white transform transition-transform duration-300 z-40 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex flex-row mt-5 mb-2 ml-5">
                    {logo && (
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Logo" className="w-[50px] h-auto" />
                        </div>
                    )}
                    <h2 className="text-2xl font-bold mt-2 ml-3">{title}</h2>
                </div>
                <div className='h-px w-[90%] mx-auto bg-[#C8C6C6] mt-3'></div>

                <nav className="flex flex-col p-4 space-y-2 overflow-y-auto h-[calc(100%-150px)] custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center p-2 rounded hover:bg-[#D9D9D940] ${
                                url.startsWith(item.path) ? "bg-activeMenuSidebar font-semibold" : ""
                            }`}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                    

                    {dropdownMenus.map((dropdown) => {
                        const isActive = isDropdownActive(dropdown);
                        return (
                            <div key={dropdown.title} className="flex flex-col">
                                <button
                                    onClick={() => toggleDropdown(dropdown.title)}
                                    className="flex items-center justify-between p-2 rounded hover:bg-[#D9D9D940]"
                                >
                                    <span className="flex items-center">
                                        {dropdown.icon}
                                        <span className="ml-2">{dropdown.title}</span>
                                    </span>
                                    <FaChevronRight
                                        className={`w-2 h-3 transform transition-transform duration-300 ${
                                            openDropdowns[dropdown.title] || isActive ? "rotate-90" : ""
                                        }`}
                                    />
                                </button>
                                {(openDropdowns[dropdown.title] || isActive) && (
                                    <div className="ml-4 border-l border-gray-400 pl-4 ">
                                        {dropdown.items.map((subItem) => (
                                            <Link
                                                key={subItem.path}
                                                href={subItem.path}
                                                className={`flex text-sm items-center p-2 rounded hover:bg-[#D9D9D940] ${
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
                        <span className="flex flex-col items-start">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs">{user.email}</span>
                        </span>

                        <HiChevronUpDown size={20} />
                    </button>

                    {openDropdowns["Account"] && (
                        <div className="absolute left-full bottom-0 ml-5 w-56 rounded-md bg-white shadow-lg border border-gray-200 text-black">
                            <div className="px-4 py-3 border-b">
                                <div className="font-semibold text-sm">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            <div className="py-2">
                                <Link href={route("profile.edit")} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                                    <FaUser className="text-primaryPurple"/> Profile
                                </Link>
                            </div>
                            <div className="border-t">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <FaSignOutAlt className="text-red-800"/> Log Out
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
