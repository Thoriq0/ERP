import DashboardStaff from '@/Layouts/DashboardStaff';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({auth, title}) {
    return (
        <DashboardStaff auth={auth}>
            <Head title="Dashboard" />

            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold ml-5">{title}</h1> 
            </div>

            <div className="p-6 mb-10">
                <div className='w-full border border-borderCard shadow-2xl rounded-2xl p-10 mt-16 mb-10'>
                    <h1 className='text-center text-2xl font-bold'>About GETS</h1>
                    <p className='mt-5 text-justify'>GETS Merupakan Perusahaan Teknologi yang dimulai sejak Tahun 2010  dari sebuah Komunitas Coding/ Programmer (Mahasiswa Teknik Informatika) di Kota Tangerang Selatan.Tentunya sebagai Perusahaan Rintisan yang terus berkembang, maka pada tahun 2015 GETS mulai berbadan hukum dengan legal PT Global Edutek Solusindo yang berlokasi di Pamulang, Tangerang Selatan.
                    GETS merupakan Perusahaan Software Development yang berfokus pada Pelayanan Customer centric untuk membuat Jasa Pembuatan Aplikasi  dengan pendekatan pelanggan sebagai prioritas utama dalam setiap keputusan dan tindakan, dengan fokus pada pemahaman mendalam tentang kebutuhan, harapan, dan pengalaman Anda untuk meningkatkan kepuasan dan loyalitas sistem yang sesuai dengan kebutuhan Anda.</p>
                </div>
                <div className="flex flex-col md:flex-row align-center justify-center gap-10">
                    <div className='w-full border border-borderCard shadow-2xl rounded-2xl p-10'>
                        <span className='flex justify-center items-center mb-5'>
                            <img src="/images/cyber-security-illustrated-icons-07.png" alt="" />       
                        </span>
                        <h1 className='text-center text-2xl font-bold'>Visi</h1>
                        <p className='mt-5 text-center'>Perusahaan Kreatif yang memaksimalkan sumber daya Anak Muda terdepan di Negeri Sendiri serta Berdaya Saing Global</p>
                    </div>
                    <div className='w-full border border-borderCard shadow-2xl rounded-2xl p-10'>
                        <span className='flex justify-center items-center mb-5'>
                            <img src="/images/cyber-security-illustrated-icons-03.png" alt="" />       
                        </span>
                        <h1 className='text-center text-2xl font-bold'>Misi</h1>
                        <p className='mt-5 text-center'>Memberikan Pelayanan Terbaik bagi Pelanggan Secara Konsisten dan Solutif.</p>
                    </div>
                </div>

                
            </div>

        </DashboardStaff>
    );
}