import DashboardInventoryLayout from '@/Layouts/DashboardInventoryLayout';
import CountUp from 'react-countup';
import { useForm } from '@inertiajs/react';
import LineChartWarehouse from '@/Components/LineChartWarehouse';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function DashboardInventory({auth, title, in_hold, total_shipment, total_schedule, total_shipped, total_delivered, chartData}) {

    return (
        <DashboardInventoryLayout auth={auth}>
            <Head title="Dashboard" />

            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold ml-5">{title}</h1> 
            </div>

            <div className="p-6">
                <div className='flex flex-col lg:flex-row mt-16 mb-10 gap-6 pl-5 md:pl-0 lg:pl-1'>
                    {/* card validating & on hold */}
                    <div className='flex flex-col md:flex-row lg:flex-col gap-8 md:gap-5'>
                        {/* card validating pre stock */}
                        <div className='flex flex-col h-[140px] md:w-[250px] border border-borderCard shadow-xl rounded-2xl p-4'>
                            <div className='flex flex-row gap-5 justify-start'>
                                <img src="/images/verification.png" alt="validating logo" className='w-[30px]'/>
                                <h2 className='font-bold text-md'>Validating Pre Stock</h2>
                            </div>
                            <h1 className='text-2xl font-bold text-center my-5'>15</h1>
                        </div>
                        {/* card On Hold */}
                        <div className='flex flex-col h-[140px] md:w-[250px] border border-borderCard shadow-xl rounded-2xl p-4 mt-10 lg:mt-0'>
                            <div className='flex flex-row gap-5 justify-start'>
                                <img src="/images/pause.png" alt="on hold logo" className='w-[30px]'/>
                                <h2 className='font-bold text-lg'>On Hold</h2>
                            </div>
                            <h1 className='text-2xl font-bold text-center my-5'>
                                <CountUp
                                    start={0}  // angka awal
                                    end={in_hold}
                                    duration={3}  
                                    separator=','  
                                />
                            </h1>
                        </div>
                    </div>
                    {/* card status logistic */}
                    <div className='w-full border border-borderCard shadow-2xl rounded-2xl py-10'>
                            <div className='flex flex-col md:flex-row justify-around items-center gap-10 mt-8 md:gap-0'>
                                {/* Total Shipment */}
                                <div className='flex flex-col'>
                                    <div className='ml-16 md:ml-0'>
                                        <img src="/images/totalShipment.svg" alt="Total Shipment" className='w-[20px]'/>
                                        <h1 className='mt-3 text-md font-extrabold'>Total Shipment</h1>
                                    </div>
                                    <h1 className='text-center text-xl font-semibold mt-10'>
                                        <CountUp 
                                            start={0}
                                            end={total_shipment}
                                            duration={3}
                                        />    
                                    </h1> 
                                </div>
                                {/* Schedule */}
                                <div className='flex flex-col'>
                                    <div className='ml-16 md:ml-0'>
                                        <img src="/images/schedule.svg" alt="Schedule" className='w-[20px]'/>
                                        <h1 className='mt-3 text-md font-extrabold'>Schedule</h1>
                                    </div> 
                                    <h1 className='text-center text-xl font-semibold mt-10'>
                                        <CountUp 
                                            start={0}  
                                            end={total_schedule}
                                            duration={3}  
                                            separator=','
                                        />
                                    </h1>
                                </div>
                                {/* In Process */}
                                <div className='flex flex-col'>
                                    <div className='ml-16 md:ml-0'>
                                        <img src="/images/progress.svg" alt="In Process" className='w-[20px]'/>
                                        <h1 className='mt-3 text-md font-extrabold'>In Process</h1>
                                    </div> 
                                    <h1 className='text-center text-xl font-semibold mt-10'>
                                        <CountUp 
                                            start={0}  
                                            end={total_shipped}
                                            duration={3}  
                                            separator=','
                                        />
                                    </h1>
                                </div>
                                {/* Completed */}
                                <div className='flex flex-col'>
                                    <div className='ml-16 md:ml-0'>
                                        <img src="/images/complete.svg" alt="Completed" className='w-[20px]'/>
                                        <h1 className='mt-3 text-md font-extrabold'>Completed</h1>
                                    </div> 
                                    <h1 className='text-center text-xl font-semibold mt-10'>
                                        <CountUp 
                                            start={0}  
                                            end={total_delivered}
                                            duration={3}  
                                            separator=','
                                        />
                                    </h1>
                                </div>

                            </div>
                    </div>
                    
                </div>

                {/* Bar Char Expense */}
                <div className=' border border-borderCard rounded-xl shadow-2xl p-5 md:w-full'>
                    <h1 className='font-bold text-lg'>Inbound & Outbound</h1>
                    <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                    <LineChartWarehouse data={chartData} /> 
                </div>     
            </div>



        </DashboardInventoryLayout>
    );
}