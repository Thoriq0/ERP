import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import InboundReport  from "@/Pages/report/InboundReports";
import ToasterComponent from "@/Components/ToasterComponent";
import { FaBoxOpen, FaTruckLoading, FaTags, FaArrowDown,FaArrowUp, FaClipboardList, FaWarehouse } from "react-icons/fa";

import { Head } from '@inertiajs/react';
import React from 'react';

export default function InventoryReport({auth, title}) {
    const getLayout = (role) => {
        switch (role) { 
            default:
                return DashboardAdminLayout;
        }
    };

    const role = auth.user.role;
    const Layout = getLayout(role);
    

    return (
        <Layout auth={auth}>
            <ToasterComponent />
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <div className="p-6 mt-16">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row items-center">
                        <FaBoxOpen />
                        <h1 className="text-xl font-black ml-5">Report Product</h1>
                        {/* <p className="text-sm ml-5 pr-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum porro unde placeat, nam praesentium ab maxime alias libero sit. Alias ut vitae dicta, iure architecto reiciendis dignissimos labore facilis blanditiis.</p> */}
                    </div>
                    
                    <InboundReport userRole={role} />
                </div>
                <hr className="my-3"/>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black ml-5"><FaTruckLoading />Report Supplier</h1>
                        <p className="text-sm ml-5 pr-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est obcaecati quis, adipisci distinctio tempore sit beatae a officiis culpa autem saepe praesentium sapiente. Molestiae, omnis nisi! Consequatur asperiores fugiat magnam.</p>
                    </div>
                    <InboundReport userRole={role} />
                </div>
                <hr className="my-3"/>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black ml-5"><FaTags />Report Category</h1>
                        <p className="text-sm ml-5 pr-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis eveniet omnis, aspernatur commodi quibusdam ipsa. Sit, possimus in, laborum commodi molestias eius inventore repudiandae quisquam laboriosam voluptatibus exercitationem unde error.</p>
                    </div>
                    <InboundReport userRole={role} />
                </div>
                <hr className="my-3"/>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black ml-5"><FaArrowDown />Report Inbound</h1>
                        <p className="text-sm ml-5 pr-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, enim natus. Quidem libero doloribus rem doloremque itaque praesentium ut nostrum? Voluptates, eveniet. A, cumque deleniti velit ea voluptates incidunt rem?</p>
                    </div>
                    <InboundReport userRole={role} />
                </div>
                <hr className="my-3"/>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black ml-5"><FaClipboardList />Report Pre-Stock</h1>
                        <p className="text-sm ml-5 pr-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat itaque sunt perferendis blanditiis magnam aperiam natus totam laboriosam? Sapiente a nisi quae ab, impedit nam est illum mollitia nemo.</p>
                    </div>
                    <InboundReport userRole={role} />
                </div>
                <hr className="my-3"/>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black ml-5"><FaArrowUp />Report Outbound</h1>
                        <p className="ml-5 text-sm pr-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa obcaecati laboriosam molestias vero cum rerum delectus enim totam consequuntur, quam voluptatum vel accusamus nobis ducimus quibusdam unde porro, qui adipisci.</p>
                    </div>
                    <InboundReport userRole={role} />
                </div>
                <hr className="my-3"/>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black ml-5"><FaWarehouse/>Report Stock</h1>
                        <p className="ml-5 text-sm pr-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa obcaecati laboriosam molestias vero cum rerum delectus enim totam consequuntur, quam voluptatum vel accusamus nobis ducimus quibusdam unde porro, qui adipisci.</p>
                    </div>
                    <InboundReport userRole={role} className="mx-2" />
                </div>
                
            </div>
            
        </Layout>
    );
}



