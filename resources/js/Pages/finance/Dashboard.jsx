import DashboardFinanceLayout from '@/Layouts/DashboardFinanceLayout';
import BarChart from '@/Components/BarChartAdmin';
import LineChart from '@/Components/LineChartFinance';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function DashboardFinance({auth, title}) {
    return (
        <DashboardFinanceLayout auth={auth}>
            <Head title="Dashboard" />
            <div className="ml-14 md:ml-0">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className='h-px bg-[#C8C6C6] mt-2'></div>
            </div>

            <div className='my-10'>
                {/* Bar Char Expense */}
                <div className='md:h-[600px] border border-borderCard rounded-xl shadow-2xl p-5 md:w-[1040px] mb-6'>
                    <h1 className='font-bold text-lg'>Profit & Loss</h1>
                    <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                    <BarChart/>
                </div>
                <div className='md:h-[600px] border border-borderCard rounded-xl shadow-2xl p-5 md:w-[1040px]'>
                    <h1 className='font-bold text-lg'>Income & Outcome</h1>
                    <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                    <LineChart/>
                </div>
            </div>


        </DashboardFinanceLayout>
    );
}