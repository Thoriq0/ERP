import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import BarChart from '@/Components/BarChartAdmin';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({auth, title}) {
    return (
        <DashboardAdminLayout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold ml-5">{title}</h1> 
            </div>
            <div className="p-6 md:p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-8 mt-16 mb-10 pl-5 md:pl-0 lg:pl-5">
                    <div className='flex flex-col md:flex-row lg:flex-col gap-8 md:gap-5'>
                        {/* card warehouse */}
                        <div className='flex flex-col h-[140px] md:w-[250px] border border-borderCard shadow-2xl rounded-2xl p-4'>
                            <div className='flex flex-row gap-5 justify-start'>
                                <img src="/images/warehouse.svg" alt="warehouse logo" />
                                <h2 className='font-bold text-lg'>Warehouses</h2>
                            </div>
                            <h1 className='text-3xl font-bold text-center my-5'>15</h1>
                        </div>
                        {/* card income */}
                        <div className='flex flex-col h-[140px] md:w-[250px] border border-borderCard shadow-2xl rounded-2xl p-4'>
                            <div className='flex flex-row gap-5 justify-start'>
                                <img src="/images/income.svg" alt="income logo" />
                                <h2 className='font-bold text-lg'>Income</h2>
                            </div>
                            <h1 className='text-lg font-bold text-center my-5'>Rp. 1.0000.0000.0000</h1>
                        </div>
                    </div>
                    {/* shipment */}
                    <div className='md:h-[300px] lg:w-full border border-borderCard shadow-2xl rounded-2xl p-4'>
                        <div className='flex flex-row gap-5 justify-start ml-3'>
                            <img src="/images/shipment.svg" alt="shipment logo" />
                            <h2 className='font-bold text-lg'>Shipment</h2>
                        </div>
                        <div className='flex flex-col md:flex-row justify-center items-center md:gap-8'>
                            {/* schedule */}
                            <div className='flex flex-col h-[154px] w-[154px] rounded-2xl border border-borderCard mt-10'>
                                <div className='mx-auto bg-skyBlueSchedule rounded-lg py-2 px-7 mt-3'>
                                    <h1 className='text-center text-sm font-semibold'>Scheduled</h1>
                                </div>
                                <div className='mx-auto bg-skyBlueSchedule rounded-lg w-[125px] py-7 mt-2'>
                                    <h1 className='text-center text-xl font-semibold'>15</h1>
                                </div>  
                            </div>
                            {/* Shipped */}
                            <div className='flex flex-col h-[154px] w-[154px] rounded-2xl border border-borderCard mt-10'>
                                <div className='mx-auto bg-orangeShipped rounded-lg w-[125px] py-2 mt-3'>
                                    <h1 className='text-center text-sm font-semibold'>Shipped</h1>
                                </div>
                                <div className='mx-auto bg-orangeShipped rounded-lg w-[125px] py-7 mt-2'>
                                    <h1 className='text-center text-xl font-semibold'>15</h1>
                                </div>  
                            </div>
                            {/* Delivered */}
                            <div className='flex flex-col h-[154px] w-[154px] rounded-2xl border border-borderCard my-10 md:my-0 md:mt-10'>
                                <div className='mx-auto bg-mintGreenDelivered rounded-lg w-[125px] py-2 mt-3'>
                                    <h1 className='text-center text-sm font-semibold'>Delivered</h1>
                                </div>
                                <div className='mx-auto bg-mintGreenDelivered rounded-lg w-[125px] py-7 mt-2'>
                                    <h1 className='text-center text-xl font-semibold'>15</h1>
                                </div>  
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bar Char Expense */}
                <div className="border border-borderCard rounded-xl shadow-2xl p-8 w-full">
                    <h1 className='font-bold text-lg'>Expense</h1>
                    <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                    <BarChart />
                </div>
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



