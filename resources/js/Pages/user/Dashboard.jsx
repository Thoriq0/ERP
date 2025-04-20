import DashboardStaff from '@/Layouts/DashboardStaff';
import BarChart from '@/Components/BarChartAdmin';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({auth, title}) {
    return (
        <DashboardStaff auth={auth}>
            <Head title="Dashboard" />

            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold ml-5">{title}</h1> 
            </div>

            <div className="p-6">
                <div className='flex flex-col lg:flex-row mt-16 mb-10'>
                    {/* shipment */}
                    <div className='w-full border border-borderCard shadow-2xl rounded-2xl py-10'>
                        <div className='flex flex-col md:flex-row justify-around gap-10 md:gap-0'>
                            {/* Total Shipment */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/totalShipment.svg" alt="Total Shipment" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Total Shipment</h1>
                                </div>
                                <h1 className='text-center text-xl font-semibold mt-10'>15</h1> 
                            </div>
                            {/* Schedule */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/schedule.svg" alt="Schedule" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Schedule</h1>
                                </div> 
                                <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                            </div>
                            {/* In Process */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/progress.svg" alt="In Process" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>In Process</h1>
                                </div> 
                                <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                            </div>
                            {/* Completed */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/complete.svg" alt="Completed" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Completed</h1>
                                </div> 
                                <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bar Char Expense */}
                <div className=' border border-borderCard rounded-xl shadow-2xl p-5 md:w-[1040px]'>
                    <h1 className='font-bold text-lg'>Inbound & Outbound</h1>
                    <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                    <BarChart/>
                </div>
            </div>

        </DashboardStaff>
    );
}