'use client'

import { useAuth } from '@/context/AuthContext'
import React, { use, useEffect } from 'react'
import Loading from './Loading'
import Chart from 'chart.js/auto'
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { demo_fate_embers } from '@/utils'

export default function FatemberDisplay(props) {
    const { demo } = props
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading, startDate, setStartDate, endDate, setEndDate } = useAuth()
    const [fate_embers, setFateEmbers] = useState(demo ? demo_fate_embers.filter(t => new Date(t.date) >= new Date(startDate) && new Date(t.date) <= new Date(new Date(endDate).setDate(endDate.getDate() + 1))) : userDataObj?.fate_embers.filter(t => new Date(t.date) >= new Date(startDate) && new Date(t.date) <= new Date(new Date(endDate).setDate(endDate.getDate() + 1))));

    const updateFateEmbers = (type, date) => {
        if (type == 'start') {
            setStartDate(date);
            setFateEmbers(demo ? demo_fate_embers.filter(t => new Date(t.date) >= new Date(date) && new Date(t.date) <= new Date(new Date(endDate).setDate(endDate.getDate() + 1))) : userDataObj.fate_embers.filter(t => new Date(t.date) >= new Date(date) && new Date(t.date) <= new Date(new Date(endDate).setDate(endDate.getDate() + 1))));
        } else if (type == 'end') {
            setEndDate(date);
            setFateEmbers(demo ? demo_fate_embers.filter(t => new Date(t.date) >= new Date(startDate) && new Date(t.date) <= new Date(new Date(date).setDate(date.getDate() + 1))) : userDataObj.fate_embers.filter(t => new Date(t.date) >= new Date(startDate) && new Date(t.date) <= new Date(new Date(date).setDate(date.getDate() + 1))));
        } else {
            setFateEmbers(demo ? demo_fate_embers.filter(t => new Date(t.date) >= new Date(startDate) && new Date(t.date) <= new Date(new Date(endDate).setDate(endDate.getDate() + 1))) : userDataObj?.fate_embers.filter(t => new Date(t.date) >= new Date(startDate) && new Date(t.date) <= new Date(new Date(endDate).setDate(endDate.getDate() + 1))));
        }
    }
    
    useEffect(() => {
        updateFateEmbers('refresh', null);
    }, [userDataObj]);
    
    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        return (
            <div className='flex flex-col justify-center items-center h-full gap-6'>
                <h1 className='text-4xl font-bold text-white'>Fate Embers</h1>
            </div>
        )
    }

    const getNbFateEmber = (type) => {
        //return userDataObj.fate_embers.filter(t => t.type == type && new Date(t.date) >= new Date(fate_ember_start_date) && new Date(t.date) <= new Date(fate_ember_end_date)).length
        return fate_embers?.filter(t => t.type == type).length
    }

    console.log("userDataObj.fate_embers : ", userDataObj.fate_embers);
    console.log("commonDataObj : ", commonDataObj);
    console.log("fate_embers : ", fate_embers);
    console.log("startDate : ", startDate);
    console.log("endDate : ", endDate);

    const dataBarChart = {
        labels: [
            'Silver',
            'Golds',
            'Card XP',
            'Honing',
            'Card Pack'
        ],
        datasets: [
            {
                label: '500K Silver',
                data: [
                    getNbFateEmber('500ksilver'), 0, 0, 0, 0
                ],
                backgroundColor: 'rgba(217, 217, 217, 0.2)',
                borderColor: 'rgb(217, 217, 217)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '1M Silver',
                data: [
                    getNbFateEmber('1msilver'), 0, 0, 0, 0
                ],
                backgroundColor: 'rgba(217, 217, 217, 0.5)',
                borderColor: 'rgb(217, 217, 217)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '2M Silver',
                data: [
                    getNbFateEmber('2msilver'), 0, 0, 0, 0
                ],
                backgroundColor: 'rgba(217, 217, 217, 0.8)',
                borderColor: 'rgb(217, 217, 217)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '5M Silver',
                data: [
                    getNbFateEmber('5msilver'), 0, 0, 0, 0
                ],
                backgroundColor: 'rgba(217, 217, 217, 0.9)',
                borderColor: 'rgb(217, 217, 217)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '1500 Golds',
                data: [
                    0, getNbFateEmber('1500golds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.3)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '3K Golds',
                data: [
                    0, getNbFateEmber('3000golds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.4)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '10K Golds',
                data: [
                    0, getNbFateEmber('10kgolds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.5)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '20K Golds',
                data: [
                    0, getNbFateEmber('20kgolds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.6)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '50K Golds',
                data: [
                    0, getNbFateEmber('50kgolds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.7)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '100K Golds',
                data: [
                    0, getNbFateEmber('100kgolds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.8)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: '200K Golds',
                data: [
                    0, getNbFateEmber('200kgolds'), 0, 0, 0
                ],
                backgroundColor: 'rgba(255, 229, 153, 0.9)',
                borderColor: 'rgb(255, 229, 153)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Normal Xp Card Pack',
                data: [
                    0, 0, getNbFateEmber('normal_xpcardpack'), 0, 0
                ],
                backgroundColor: 'rgba(246, 178, 107, 0.5)',
                borderColor: 'rgb(246, 178, 107)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Lucky Xp Card Pack',
                data: [
                    0, 0, getNbFateEmber('lucky_xpcardpack'), 0, 0
                ],
                backgroundColor: 'rgba(246, 178, 107, 0.6)',
                borderColor: 'rgb(246, 178, 107)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Special Xp Card Pack',
                data: [
                    0, 0, getNbFateEmber('special_xpcardpack'), 0, 0
                ],
                backgroundColor: 'rgba(246, 178, 107, 0.7)',
                borderColor: 'rgb(246, 178, 107)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Premium Xp Card Pack',
                data: [
                    0, 0, getNbFateEmber('premium_xpcardpack'), 0, 0
                ],
                backgroundColor: 'rgba(246, 178, 107, 0.8)',
                borderColor: 'rgb(246, 178, 107)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'S Honing Chest',
                data: [
                    0, 0, 0, getNbFateEmber('s_honing_chest'), 0
                ],
                backgroundColor: 'rgba(164, 194, 244, 0.5)',
                borderColor: 'rgb(164, 194, 244)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'M Honing Chest',
                data: [
                    0, 0, 0, getNbFateEmber('m_honing_chest'), 0
                ],
                backgroundColor: 'rgba(164, 194, 244, 0.6)',
                borderColor: 'rgb(164, 194, 244)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'L Honing Chest',
                data: [
                    0, 0, 0, getNbFateEmber('l_honing_chest'), 0
                ],
                backgroundColor: 'rgba(164, 194, 244, 0.7)',
                borderColor: 'rgb(164, 194, 244)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Epic Card Pack',
                data: [
                    0, 0, 0, 0, getNbFateEmber('epic_card_pack')
                ],
                backgroundColor: 'rgba(213, 166, 189, 0.5)',
                borderColor: 'rgb(213, 166, 189)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Random Legendary Card Pack',
                data: [
                    0, 0, 0, 0, getNbFateEmber('random_leg_card_pack')
                ],
                backgroundColor: 'rgba(213, 166, 189, 0.7)',
                borderColor: 'rgb(213, 166, 189)',
                borderWidth: 0,
                borderRadius: 6,
            },
            {
                label: 'Selection Legendary Card Pack',
                data: [
                    0, 0, 0, 0, getNbFateEmber('select_leg_card_pack')
                ],
                backgroundColor: 'rgba(213, 166, 189, 0.8)',
                borderColor: 'rgb(213, 166, 189)',
                borderWidth: 0,
                borderRadius: 6,
            },
        ]
    };

    const optionsBarChart = {
        animation: {
            duration: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                stacked: true,
                color: '#FFFFFF',
                grid: {
                    display: false,
                    color: '#858585'
                }
            },
            y: {
                display: true,
                stacked: true,
                beginAtZero: true,
                color: '#FFFFFF',
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    const fateEmberCountPerPerso = fate_embers?.reduce((acc, fe) => {
        if (!acc[fe.perso]) {
            acc[fe.perso] = 0;
        }
        acc[fe.perso]++;
        return acc;
    }, {});

    const dataPieChart = {
        labels: fateEmberCountPerPerso ? Object.keys(fateEmberCountPerPerso) : [],
        datasets: [{
            label: 'Fate Ember Collectés',
            data: fateEmberCountPerPerso ? Object.values(fateEmberCountPerPerso) : [],
            backgroundColor: [
                'rgba(173, 216, 230, 0.2)',
                'rgba(173, 216, 230, 0.3)',
                'rgba(173, 216, 230, 0.4)',
                'rgba(173, 216, 230, 0.5)',
                'rgba(173, 216, 230, 0.6)',
                'rgba(173, 216, 230, 0.7)',
                'rgba(173, 216, 230, 0.8)',
                'rgba(173, 216, 230, 0.7)',
                'rgba(173, 216, 230, 1.0)'
            ],
            hoverOffset: 4
        }]
    };

    const optionsPieChart = {
        borderAlign: 'center',
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        borderColor: 'rgba(0, 0, 0, 0.1)',
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            <div className="grid grid-cols-3 grid-rows-3 h-full min-w-[60vw]">
                <div className='border-l border-r border-b border-[#2e3643] p-2'>
                    <div className='flex flex-row justify-center items-center h-full w-full' style={{ margin: "0 auto" }}>
                        <Pie data={dataPieChart} options={optionsPieChart} />
                    </div>
                </div>
                <div className='col-span-2 border-r border-b border-[#2e3643]'>
                    <div className='flex flex-col h-full w-full'>
                        <h1 className='text-4xl font-bold text-gray-300 border-b border-[#2e3643] py-4'>
                            <span className='p-2'>Fate Embers</span>
                        </h1>
                        <div className='grow flex flex-row items-center justify-between border-b border-[#2e3643] p-2'>
                            <div className='flex flex-col'>
                                <span className='text-gray-300'>Total Fate Embers</span>
                                <span className='text-gray-400'>{userDataObj.fate_embers.length}</span>
                                <span className='text-gray-400'>({fate_embers?.length})</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-gray-300'>Total Golds</span>
                                <span className='text-gray-400'>
                                    {userDataObj.fate_embers.filter(fe => fe.type.includes('golds')).reduce((total, fe) => {
                                        const option = commonDataObj.fate_ember_options.find(option => option.idfateember === fe.type);
                                        return total + (option?.value || 0);
                                    }, 0).toLocaleString('fr-FR')}
                                </span>
                                <span className='text-gray-400'>
                                    (
                                        {fate_embers?.filter(fe => fe.type.includes('golds')).reduce((total, fe) => {
                                            const option = commonDataObj.fate_ember_options.find(option => option.idfateember === fe.type);
                                            return total + (option?.value || 0);
                                        }, 0).toLocaleString('fr-FR')}
                                    )
                                </span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-gray-300'>Total Silvers</span>
                                <span className='text-gray-400'>
                                    {userDataObj.fate_embers.filter(fe => fe.type.includes('silver')).reduce((total, fe) => {
                                        const option = commonDataObj.fate_ember_options.find(option => option.idfateember === fe.type);
                                        return total + (option?.value || 0);
                                    }, 0).toLocaleString('fr-FR')}
                                </span>
                                <span className='text-gray-400'>
                                    (
                                        {fate_embers?.filter(fe => fe.type.includes('silver')).reduce((total, fe) => {
                                            const option = commonDataObj.fate_ember_options.find(option => option.idfateember === fe.type);
                                            return total + (option?.value || 0);
                                        }, 0).toLocaleString('fr-FR')}
                                    )
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between p-4 gap-6'>
                            <div className='grow flex flex-col'>
                                <span className='text-gray-300'>Début</span>
                                <DatePicker selected={startDate} onChange={(date) => updateFateEmbers('start', date)} className='w-full text-gray-400 rounded bg-[#27313d] p-1' dateFormat="dd/MM/yyyy" />
                            </div>
                            <div className='grow flex flex-col'>
                                <span className='text-gray-300'>Fin</span>
                                <DatePicker selected={endDate} onChange={(date) => updateFateEmbers('end', date)} className='w-full text-gray-400 rounded bg-[#27313d] p-1' dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row-span-2 border-l border-r border-[#2e3643] overflow-y-scroll overflow-x-hidden'>
                    {fate_embers?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((fe, feIndex) => {
                        //console.log(fe.type);
                        //console.log(commonDataObj.fate_ember_options.find(option => option.idfateember === fe.type)?.logo);

                        const option = commonDataObj.fate_ember_options.find(option => option.idfateember === fe.type);

                        return (
                            <div key={feIndex} className='flex flex-row items-center justify-between border-b border-[#2e3643] my-2'>
                                <div className='flex flex-col gap-2 p-2'>
                                    <div className='text-gray-300'>{option?.name}</div>
                                    <div className='text-gray-400'>{fe.perso} le {new Date(fe.date).toLocaleDateString('fr-FR')}</div>
                                </div>
                                <img src={option?.logo} alt={fe.type} className='w-[48px] h-[48px] mr-2' />
                            </div>
                        )
                    })}
                </div>
                <div className='row-span-2 col-span-2 border-r border-[#2e3643] p-2'>
                    <div className='h-full w-full' style={{ margin: "0 auto" }}>
                        <Bar data={dataBarChart} options={optionsBarChart} />
                    </div>
                </div>
            </div>
        </div>
    )
}
