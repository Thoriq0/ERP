import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import Datatable from "@/Components/DataTableInbound";
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
              <Datatable data={data} />
          </div>

        </DashboardAdminLayout>
    );
}


// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// // import SidebarAdmin from '@/Components/SidebarAdmin';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
//                     Dashboard 
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />
            

//             {/* <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
//                         <div className="p-6 text-gray-900 dark:text-gray-100">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//              */}

//         </AuthenticatedLayout>
    
//     );
// }



