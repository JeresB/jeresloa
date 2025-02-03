'use client'

import { useAuth } from '@/context/AuthContext'
import React from 'react'
import Loading from './Loading'
import { demo_perso } from '@/utils'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';

export default function Roster() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        return (
            <div className='flex flex-col justify-center items-center h-full gap-6'>
                <h1 className='text-4xl font-bold text-white'>Roster</h1>
            </div>
        )
    }

    console.log(demo_perso)

    const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
    const expenses = [0, -19, -3, 0];
    const gains = [2, 0, 0, 5];

    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Expenses',
                data: [0, -19, -3, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Gains',
                data: [2, 0, 0, 5],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            <div className="grid grid-cols-3 grid-rows-3 h-full min-w-[60vw]">
                <div className='border-l border-r border-b border-[#2e3643] p-2'>

                </div>
                <div className='col-span-2 border-r border-b border-[#2e3643]'>

                </div>
                <div className='row-span-2 border-l border-r border-[#2e3643] overflow-y-scroll overflow-x-hidden'>

                </div>
                <div className='row-span-2 col-span-2 border-r border-[#2e3643] p-2'>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    )
}
