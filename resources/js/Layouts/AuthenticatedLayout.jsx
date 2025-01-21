import React from "react";

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="flex">
            <div className="ml-64 w-full">
                {header && (
                    <header className="bg-white shadow dark:bg-gray-800">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main>{children}</main>
            </div>
        </div>
    );
}
