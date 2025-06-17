import DashboardFinanceLayout from '@/Layouts/DashboardFinanceLayout';
import BarChart from '@/Components/BarChartAdmin';
import PieChartTotalPayment from '@/Components/PieChartTotalPayment';
import { Head } from '@inertiajs/react';
import React from 'react';
import CountUp from 'react-countup';
import LineChartMonthlyPayments from '@/Components/LineChartMonthlyPayments';

export default function DashboardFinance({auth, title, total_payment, total_unpaid, py_schedule, total_bp, paymentData, selectedMonth, total_due, monthlyPayments}) {
    // console.log(total_due)
    
    return (
        <DashboardFinanceLayout auth={auth}>
            <Head title="Dashboard" />
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold ml-5">{title}</h1> 
            </div>
            <div className="p-6">
                <div className='flex flex-col lg:flex-row mt-16 mb-10'>
                    <div className='w-full border border-borderCard shadow-2xl rounded-2xl py-10'>
                        <div className='flex flex-col md:flex-row justify-around gap-10 md:gap-0'>
                            {/* Total Payment */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/overdue.png" alt="Total Payment" className='w-[25px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>OverDue</h1>
                                </div>
                                <h1 className='text-center text-xl font-semibold mt-10'>
                                    <CountUp 
                                        start={0}  
                                        end={total_due}
                                        duration={3}  
                                        separator=','
                                    />
                                </h1> 
                            </div>
                            {/* Payment Schedule */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/automatic-payment.png" alt="Paymenet Schedule" className='w-[25px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Payment Schedule</h1>
                                </div> 
                                <h1 className='text-center text-xl font-semibold mt-10'>
                                    <CountUp 
                                        start={0}  
                                        end={py_schedule}
                                        duration={3}  
                                        separator=','
                                    />
                                </h1>
                            </div>
                            {/* Unpaid */}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/rejection.png" alt="Unpaid" className='w-[25px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Unpaid</h1>
                                </div> 
                                <h1 className='text-center text-xl font-semibold mt-10'>
                                    <CountUp 
                                        start={0}  
                                        end={total_unpaid}
                                        duration={3}  
                                        separator=','
                                    />
                                </h1>
                            </div>
                            {/* total bp*/}
                            <div className='flex flex-col'>
                                <div className='ml-16 md:ml-0'>
                                    <img src="/images/bill.png" alt="Total BP" className='w-[25px]'/>
                                    <h1 className='mt-3 text-md font-extrabold'>Total Billed Party</h1>
                                </div> 
                                <h1 className='text-center text-xl font-semibold mt-10'>
                                    <CountUp 
                                        start={0}  
                                        end={total_bp}
                                        duration={3}  
                                        separator=','
                                    />
                                </h1>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Pie chart soon */}
                <div className='flex flex-col justify-center items-center md:flex-row gap-5 mb-10'>
                    <div className='md:h-[500px] w-full border border-borderCard rounded-xl shadow-2xl p-5 md:w-[400px]'>
                        <h1 className='font-bold text-lg'>Total Payment</h1>
                        <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                        <PieChartTotalPayment  data={paymentData} selectedMonth={selectedMonth}/>
                    </div>
                    <div className='h-[510px] md:h-[500px] w-full border border-borderCard rounded-xl shadow-2xl p-5 md:w-[620px]'>
                        <h1 className='font-bold text-lg'>Grafik Pembayaran</h1>
                        <div className='h-px bg-[#C8C6C6] mt-2 mb-5'></div>
                        <br />
                        <LineChartMonthlyPayments data={monthlyPayments}/>
                    </div>

                </div>
            </div>


        </DashboardFinanceLayout>
    );
}