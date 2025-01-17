// FlexibleSidebar.jsx
import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HiMenuAlt3, HiX } from "react-icons/hi"; 

export default function FlexibleSidebar({ title, menuItems, logo, dropdownMenus, user }) {
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

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primaryPurple text-white rounded shadow-lg"
            >
                {isSidebarOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />} 
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-primaryPurple text-white transform transition-transform duration-300 z-40 ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex flex-row my-5 ml-5">
                    {logo && (
                        <div className="flex items-center justify-center">
                            <img src={logo} alt="Logo" className="w-[50px] h-auto" />
                        </div>
                    )}
                    <h2 className="text-2xl font-bold mt-2 ml-3">{title}</h2>
                </div>
                <div className='h-px w-[90%] mx-auto mb-2 bg-[#C8C6C6] mt-2'></div>

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

                    {dropdownMenus.map((dropdown) => (
                        <div key={dropdown.title} className="flex flex-col">
                            <button
                                onClick={() => toggleDropdown(dropdown.title)}
                                className="flex items-center justify-between p-2 rounded hover:bg-[#D9D9D940]"
                            >
                                <span className="flex items-center">
                                    {dropdown.icon}
                                    <span className="ml-2">{dropdown.title}</span>
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`w-4 h-4 transform transition-transform ${
                                        openDropdowns[dropdown.title] ? "rotate-180" : ""
                                    }`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {openDropdowns[dropdown.title] && (
                                <div className="pl-6 space-y-2">
                                    {dropdown.items.map((subItem) => (
                                        <Link
                                            key={subItem.path}
                                            href={subItem.path}
                                            className="block text-sm rounded p-2 hover:bg-[#D9D9D940]"
                                        >
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className='h-px w-full mx-auto bg-[#C8C6C6]'></div>    
                </nav>

                                      
                <div className="absolute bottom-6 left-4 right-4">
                    <button
                        onClick={() => toggleDropdown("Account")}
                        className="flex w-full items-center justify-between rounded bg-[#D9D9D940] p-2 text-sm"
                    >
                        <span>{user.name}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                        </svg>
                    </button>
                    {openDropdowns["Account"] && (
                        <div className="mt-2 rounded bg-[#D9D9D940] shadow-lg">
                            <Link
                                href={route("profile.edit")}
                                className="block px-4 py-2 text-sm hover:bg-[#D9D9D940]"
                            >
                                Profile
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-[#D9D9D940]"
                            >
                                Log Out
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
