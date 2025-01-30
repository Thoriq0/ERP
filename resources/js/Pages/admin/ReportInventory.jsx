import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import Datatable from "@/Components/DataTableInbound";
import { ButtonModalInbound } from '@/Components/ButtonModalInbound';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({auth, title}) {
    const data = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
        { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 4, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 5, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 6, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 7, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 8, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 9, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 10, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 11, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
        { id: 12, name: "Alice Johnson", email: "alice.johnson@example.com", role: "Editor" },
    ];
    return (
        <DashboardAdminLayout auth={auth}>
            <Head title="Dashboard" />
            <div className="ml-14 md:ml-0">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className='h-px bg-[#C8C6C6] mt-2'></div>
            </div>
            <div className="p-6">
              {/* <button className='bg-primaryPurple text-white px-4 py-2 rounded-md mb-5 text-sm'>
                CREATE
              </button> */}
              <ButtonModalInbound />
              <Datatable data={data} />
          </div>

        </DashboardAdminLayout>
    );
}