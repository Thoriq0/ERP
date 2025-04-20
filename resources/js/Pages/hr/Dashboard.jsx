import DashboardHumanResource from '@/Layouts/DashboardHumanResourceLayout';
import BarChart from '@/Components/BarChartAdmin';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function DashboardInventory({auth, title}) {
    return (
        <DashboardHumanResource auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold ml-5">{title}</h1>
            </div>
            <div className="p-6 md:p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-8 mt-16 mb-10">
                    {/* employee */}
                    <div className='w-full border border-borderCard shadow-2xl rounded-2xl py-10'>
                        <div className='flex flex-col md:flex-row items-center justify-around gap-10 md:gap-0'>
                            {/* Total Employee */}
                            <div className='flex flex-col'>
                                <div className=''>
                                    <img src="/images/people.svg" alt="Total Employee" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Total Employee</h1>
                                    <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                                </div> 
                            </div>
                            {/* Attendance */}
                            <div className='flex flex-col'>
                                <div className=''>
                                    <img src="/images/schedule.svg" alt="Attendance Rate" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Attendance Rate</h1>
                                    <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                                </div> 
                            </div>
                            {/* pending approval */}
                            <div className='flex flex-col'>
                                <div className=''>
                                    <img src="/images/progress.svg" alt="Pending Approval" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Pending Approval</h1>
                                    <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                                </div> 
                            </div>
                            {/* approval request */}
                            <div className='flex flex-col'>
                                <div className=''>
                                    <img src="/images/complete.svg" alt="Approval Request" className='w-[20px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Approval Request</h1>
                                    <h1 className='text-center text-xl font-semibold mt-10'>15</h1>
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bar Char Expense */}
                <div className=' border border-borderCard rounded-xl shadow-2xl p-5 md:w-[1040px]'>
                    <h1 className='font-bold text-lg'>Attendance In & Out</h1>
                    <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                    <BarChart/>
                </div>
            </div>
        </DashboardHumanResource>
    );
}