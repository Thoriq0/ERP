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
                <div className='w-full border border-borderCard shadow-2xl rounded-2xl p-10 mt-16 mb-10'>
                    <h1 className='text-center text-2xl font-bold'>Selamat Datang di Dashboard</h1>
                    <p className='mt-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut impedit odio excepturi sapiente fugiat aliquid, ut nam eum. Assumenda dolor ea exercitationem natus. Porro consequuntur distinctio fuga, numquam, repudiandae fugit vitae ad velit earum at quibusdam adipisci ipsam, quasi rem ratione totam vero pariatur molestiae beatae nulla odit sunt recusandae.</p>
                </div>
                <div className='w-full border border-borderCard shadow-2xl rounded-2xl p-10 mt-10 mb-10'>
                    <h1 className='text-center text-2xl font-bold'>Example</h1>
                    <p className='mt-5 text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam reiciendis sapiente voluptate odio tempora eum ducimus ratione quod consequuntur numquam dolores doloremque ea harum expedita nemo eaque aperiam obcaecati hic rerum corporis omnis perspiciatis modi, itaque nisi? Suscipit aliquam amet sapiente rem doloribus quo, recusandae deserunt. Veniam facere libero beatae quod quia facilis? Ipsam at laboriosam fugit velit hic deleniti quo sunt minus odit beatae expedita ab enim id repudiandae iste quia, distinctio facere labore doloremque tempora animi illum itaque voluptatibus! Eum, facere. Facere voluptates, dolore magnam reiciendis, ullam ipsa asperiores possimus hic sit dolorem cum eos sed, maiores inventore.</p>
                </div>
                
            </div>

        </DashboardStaff>
    );
}