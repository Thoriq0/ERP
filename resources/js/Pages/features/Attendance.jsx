import React, { useState, useEffect } from 'react';
import DashboardStaff from '@/Layouts/DashboardStaff';
import DashbordHumanResouceLayout from '@/Layouts/DashboardHumanResourceLayout';
import DashboardInventoryLayout from '@/Layouts/DashboardInventoryLayout';
import DashboardFinanceLayout from '@/Layouts/DashboardFinanceLayout';
import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Head } from '@inertiajs/react';
import { FiCalendar, FiClock } from "react-icons/fi";
import  { ButtonModalAttandance } from '@/Components/ButtonModalAttandance';
import  { ButtonModalAttandanceOut } from '@/Components/ButtonModalAttandanceOut';
import ToasterComponent from "@/Components/ToasterComponent";
import toast from "react-hot-toast"; 
import { usePage } from '@inertiajs/react';

export default function Attendance({auth, title, atdnc}) {
    const getLayout = (role) => {
          switch (role) {
              case 'hr':
                  return DashbordHumanResouceLayout;
              case 'fnc':
                  return DashboardFinanceLayout; 
              case 'wrhs':
                  return DashboardInventoryLayout; 
              case 'staff':
                  return DashboardStaff; 
              default:
                  return DashboardAdminLayout;
          }
    };
    const role = auth.user.role;
    const Layout = getLayout(role);
    const id = auth.user.id;

    const { flash } = usePage().props;

    useEffect(() => {
      if (flash?.success) {
        toast.success(flash.success, { duration: 5000 });
      }
      if (flash?.error) {
        toast.error(flash.error, { duration: 5000 });
      }
    }, [flash]);
    
    const today = new Date();
    // today.setDate(today.getDate() + 1);
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getFullYear()}`;

    const getAttendanceImageTodayIn = (atdnc, userId, todayFormatted) => {
      const attendanceToday = atdnc.find(item => {
        const createdAt = new Date(item.created_at);
        const fileTanggal = `${createdAt.getDate().toString().padStart(2, '0')}${(createdAt.getMonth() + 1).toString().padStart(2, '0')}${createdAt.getFullYear()}`;
    
        return item.user_id == userId && fileTanggal == todayFormatted;
      });
    
      return attendanceToday ? attendanceToday.image : null;
    };

    const getAttendanceImageTodayOut = (atdnc, userId, todayFormatted, status) => {
      const attendanceToday = atdnc.find(item => {
        const createdAt = new Date(item.created_at);
        const fileTanggal = `${createdAt.getDate().toString().padStart(2, '0')}${(createdAt.getMonth() + 1).toString().padStart(2, '0')}${createdAt.getFullYear()}`;
      
        return item.user_id == userId && fileTanggal == todayFormatted && item.status == status;
      });
    
      return attendanceToday ? attendanceToday.image : null;
    };
    const attandaceImageOut = getAttendanceImageTodayOut(atdnc, id, formattedDate, "out");
    const attendanceImage = getAttendanceImageTodayIn(atdnc, id, formattedDate);

    useEffect(() => {
      // console.log(formattedDate); 
      // console.log(atdnc);
      // console.log(attendanceImage); 
      // console.log(attandaceImageOut);
    }, []);

    function formatAttendanceTime(imageName) {
      // Hapus ekstensi .jpg
      const nameWithoutExt = imageName.replace('.jpg', '');
      const parts = nameWithoutExt.split('-');
    
      if (parts.length < 6) return "Invalid Attendance Data";
    
      // Ambil data dari belakang
      const minute = parts.pop();
      const hour = parts.pop();
      const dateStr = parts.pop();
      const id = parts.pop(); // Nomor ID absensi misalnya
      const direction = parts.shift(); // 'in' atau 'out'
      const name = parts.join(' '); // Gabung sisanya sebagai nama
    
      // Format tanggal
      const day = dateStr.substring(0, 2);
      const month = dateStr.substring(2, 4);
      const year = dateStr.substring(4, 8);
    
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = `${hour}:${minute}`;
    
      // Cek status hadir
      const jamMasuk = parseInt(hour);
      const menitMasuk = parseInt(minute);
      let status = '';
    
      if (jamMasuk < 8 || (jamMasuk === 8 && menitMasuk < 30)) {
        status = 'Early 🟢';
      } else if (jamMasuk === 8 && menitMasuk === 30) {
        status = 'On Time 🟡';
      } else {
        status = 'Late 🔴';
      }
    
      return `${name} has clocked ${direction} on ${formattedDate} at ${formattedTime} - ${status}`;
    }
    

    function formatAttendanceTimes(imageName) {
      // Hapus ekstensi .jpg
      const nameWithoutExt = imageName.replace('.jpg', '');
      const parts = nameWithoutExt.split('-');
    
      if (parts.length < 6) return "Invalid Attendance Data";
    
      // Ambil elemen dari belakang
      const minute = parts.pop();
      const hour = parts.pop();
      const dateStr = parts.pop();
      const id = parts.pop();
      const direction = parts.shift(); // 'out' di sini
      const name = parts.join(' '); // Gabung sisanya sebagai nama lengkap
    
      // Format tanggal
      const day = dateStr.substring(0, 2);
      const month = dateStr.substring(2, 4);
      const year = dateStr.substring(4, 8);
    
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = `${hour}:${minute}`;
    
      // Cek status clock-out
      const jamKeluar = parseInt(hour);
      const menitKeluar = parseInt(minute);
      let status = '';
    
      if (jamKeluar < 17 || (jamKeluar === 17 && menitKeluar < 30)) {
        status = 'Early 🟢';
      } else if (jamKeluar === 17 && menitKeluar === 30) {
        status = 'On Time 🟡';
      } else {
        status = 'Overtime 🔴';
      }
    
      return `${name} has clocked out on ${formattedDate} at ${formattedTime} - ${status}`;
    }
    
    

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    

    useEffect(() => {
      const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
      return () => clearInterval(interval);
    }, []);
  
    const formatDate = (date) => {
      return date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };
  
    const formatTime = (date) =>
      date.toLocaleTimeString("en-GB", { hour12: false });

    return (
        <Layout auth={auth}>
          <ToasterComponent />
            <Head title="Attandance" />
            
            <div className="fixed bg-[#f5f5f5] w-full h-18 md:h-14 px-6 py-4 border-b z-10">
                <h1 className="text-xl font-bold md:ml-5">{title}</h1> 
            </div>

            <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between md:flex-row gap-5 md:gap-10 lg:gap-5 p-6 mt-16 ">
                <div className="flex flex-col md:flex-row gap-5 md:gap-0 md:space-x-4">
                  {/* Card Tanggal */}
                  <div className="flex flex-row items-center px-16 py-5 md:pl-5 bg-[#f5f5f5] shadow-lg rounded-xl gap-4">
                      <FiCalendar className='text-primaryPurple text-xl font-extrabold'/>
                      <p className="text-md font-bold text-gray-900">
                      {formatDate(currentDateTime)}
                      </p>
                  </div>

                  {/* Card Jam */}
                  <div className="flex flex-row items-center justify-center bg-[#f5f5f5] shadow-lg rounded-xl gap-4 md:px-10 py-5">
                      <FiClock className='text-primaryPurple text-xl font-extrabold' />
                      <p className="text-md font-bold text-gray-900">
                      {formatTime(currentDateTime)}
                      </p>
                  </div>
                </div>
                {/* card attandace in & out*/}
                <div className='flex flex-col md:flex-row md:space-x-4 mt-5 md:mt-0 gap-5 md:gap-0'>
                  <div className='px-6 py-3 rounded-xl text-white font-semibold  bg-gradient-to-br from-[#6A4FCF] to-[#42307D]  shadow-md'>
                    <h1 className='font-bold'>Attendance In : 08:30</h1>
                  </div>
                  <div className='px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-br from-red-600 to-red-500 shadow-md'>
                    <h1 className='font-bold'>Attendance Out : 17:30</h1>
                  </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 p-6 md:py-2 md:mb-10 lg:mb-0 justify-center items-center">
                {/* attandance in */}
                <div className="flex flex-col items-center gap-3 p-5 shadow-lg rounded-2xl w-full md:w-1/2 lg:w-1/3 mr-3">
                {attendanceImage ? (
                  <>
                  <img src={`/images/attandance/${attendanceImage}`} alt="Attendance Today" className='rounded-2xl w-[240px] h-[200px]' />
                  <h1 className='text-xl font-bold'>Attendance In</h1>
                  {/* Format tanggal & jam di sini */}
                  <p className='capitalize text-center'>
                    {formatAttendanceTime(attendanceImage)}
                  </p>
                  </>
                ) : (
                  <>
                  <img src="/images/attandance.svg" alt="image attandance in" className='w-[240px] h-[200px]' />
                  <h1 className='text-xl font-bold'>Attandance In</h1>
                  <p className='capitalize'>no attendance has come In yet</p>
                  <ButtonModalAttandance role={role} />
                  </>
                )}
                </div>
                
                {/* attandance out */}
                {attandaceImageOut ? (
                  <div className="flex flex-col items-center gap-3 p-5 shadow-lg rounded-2xl w-full md:w-1/2 lg:w-1/3 mr-3">
                  <img src={`/images/attandance/${attandaceImageOut}`} alt="Attendance Today" className='rounded-2xl w-[240px] h-[200px]' />
                  <h1 className='text-xl font-bold'>Attendance Out</h1>
                  {/* Format tanggal & jam di sini */}
                  <p className='capitalize text-center'>
                    {formatAttendanceTimes(attandaceImageOut)}
                  </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-5 shadow-lg rounded-2xl w-full md:w-1/2 lg:w-1/3 mr-3">
                    <img src="/images/attandance.svg" alt="image attandance in" className='w-[240px] h-[200px]' />
                    <h1 className='text-xl font-bold'>Attandance Out</h1>
                    <p className='capitalize'>no attendance has come Out yet</p>
                    <ButtonModalAttandanceOut role={role}/>
                  </div>
                )}
            </div>

        </Layout>
    );
}