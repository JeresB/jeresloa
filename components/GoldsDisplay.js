'use client'

import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Loading from './Loading';
import { classes } from '@/utils';

export default function GoldsDisplay() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading, startDate, setStartDate, endDate, setEndDate } = useAuth();
    const [incomes, setIncomes] = useState(null);
    const [historiques, setHistoriques] = useState(null);
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchPerso, setSearchPerso] = useState("");

    //console.log("[Golds Diplays] userDataObj: ", userDataObj);
    //console.log("[Golds Diplays] startDate: ", startDate);
    //console.log("[Golds Diplays] endDate: ", endDate);

    useEffect(() => {
        if (currentUser && userDataObj.golds) {
            const filteredIncomes = userDataObj?.golds.incomes?.filter(income => {
                const incomeDate = new Date(income.date);

                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

                return incomeDate >= startDate && incomeDate < adjustedEndDate;
            });

            setIncomes(filteredIncomes);

            const filteredHistoriques = userDataObj?.golds.historiques?.filter(historique => {
                const historiqueDate = new Date(historique.date);

                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

                return historiqueDate >= startDate && historiqueDate < adjustedEndDate;
            });

            setHistoriques(filteredHistoriques);
        }
    }, [userDataObj, startDate, endDate]);

    const getGraphGoldLabel = () => {
        //console.log("[Golds Diplays] historiques: ", historiques);

        const sortedHistoriquesDates = historiques
            ?.map(historique => new Date(historique.date).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
            .sort((a, b) => new Date(a) - new Date(b));

        //console.log("[Golds Diplays] sortedHistoriquesDates: ", sortedHistoriquesDates);

        return sortedHistoriquesDates;
    }

    const getGraphGoldValues = () => {
        const sortedHistoriquesValues = historiques
            ?.sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(historique => historique.gold);

        return sortedHistoriquesValues;
    }

    const graphGoldData = {
        labels: getGraphGoldLabel(),
        datasets: [{
            label: 'Gold',
            data: getGraphGoldValues(),
            fill: true,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                gradient.addColorStop(0, "rgba(255,229,153,0.8)");
                gradient.addColorStop(1, "rgba(255,229,153,0.2)");
                return gradient;
            },
            borderColor: 'rgb(255, 229, 153)',
            tension: 0.5
        }]
    }

    const graphGoldOptions = {
        scales: {
            x: {
                display: false,
                stacked: true,
                color: '#FFFFFF',
                grid: {
                    display: false,
                    color: '#858585'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 5,
                    labelOffset: 80,
                    color: '#9CA3AF'
                },
            },
            y: {
                display: true,
                beginAtZero: true,
                color: '#FFFFFF',
                grid: {
                    display: true,
                    color: '#333333',
                    drawOnChartArea: true,
                    drawTicks: false
                },
                ticks: {
                    color: '#9CA3AF'
                }
            }
        },
        animation: {
            duration: 0
        },
        elements: {
            point: {
                radius: 0
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const setNewGoldsFromOldWebsite = () => {
        //console.log("[setNewGoldsFromOldWebsite] incomes: ", incomes);
        //console.log("[setNewGoldsFromOldWebsite] historiques: ", historiques);
    };

    const getPersoByName = (name) => {
        return userDataObj?.roster?.persos.find(p => p.name === name);
    };

    const getClasseByName = (classeName) => {
        return classes.find(classe => classe.name === classeName);
    };

    if (loading) return <Loading />;

    if (!currentUser) {
        return (
            <div className='flex flex-col justify-center items-center h-full gap-6'>
                <h1 className='text-4xl font-bold text-white'>Golds Tracking</h1>
            </div>
        )
    }

    const getGoldsAtStartOfWeek = () => {
        const startOfWeek = new Date(startDate);
        //startOfWeek.setDate(startOfWeek.getDate() - ((startOfWeek.getDay() + 4) % 7));
        const historiqueAtStartOfWeek = userDataObj?.golds?.historiques?.sort((a, b) => new Date(b.date) - new Date(a.date)).find(historique => new Date(historique.date) <= startOfWeek);
        
        return historiqueAtStartOfWeek ? historiqueAtStartOfWeek.gold : 0;
    };

    const goldsAtStartOfWeek = getGoldsAtStartOfWeek();
    const diff = userDataObj?.golds?.currentGolds - goldsAtStartOfWeek;
    const diffPercentage = goldsAtStartOfWeek !== 0 ? (diff / goldsAtStartOfWeek) * 100 : 0;

    const positiveIncomesSum = incomes?.filter(income => income.montant > 0).reduce((sum, income) => sum + income.montant, 0);
    const negativeIncomesSum = incomes?.filter(income => income.montant < 0).reduce((sum, income) => sum + income.montant, 0);
    const totalIncomesSum = positiveIncomesSum + negativeIncomesSum;

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            <div className="grid grid-cols-7 grid-rows-9 h-full min-w-[60vw] max-w-[1500px]">
                <div className='col-span-3 row-span-2 border-l border-r border-b border-[#2e3643]'>
                    <div className='flex flex-col h-full'>
                        <h1 className='text-4xl font-bold text-gray-300 border-b border-[#2e3643] py-4'>
                            <span className='p-2'>Golds Tracker</span>
                        </h1>

                        <div className='grow flex flex-row justify-between p-4 gap-6'>
                            <div className='grow flex flex-col justify-center'>
                                <span className='text-gray-300'>Début</span>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='w-full text-gray-400 rounded bg-[#27313d] p-1' dateFormat="dd/MM/yyyy" />
                            </div>
                            <div className='grow flex flex-col justify-center'>
                                <span className='text-gray-300'>Fin</span>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className='w-full text-gray-400 rounded bg-[#27313d] p-1' dateFormat="dd/MM/yyyy" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 row-span-2 flex flex-col justify-between border-r border-b border-[#2e3643]'>
                    <div className='grid grid-cols-3 items-center p-2'>
                        <div className='col-span-2'>
                            <div className='text-gray-300 text-3xl'>{userDataObj?.golds?.currentGolds.toLocaleString('fr-FR')} Golds</div>
                        </div>
                        <div className={`h-[72px] w-full text-md inline-flex items-center px-2.5 py-1 rounded-md ${diff >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                            <i className={`fa-solid ${diff >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} mr-3`}></i>
                            {diff.toLocaleString('fr-FR')} Golds
                            <br />
                            {diffPercentage.toFixed(2)}%
                        </div>
                    </div>

                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className='grow flex flex-row justify-center p-2 gap-6'>
                        <div className='text-green-600 text-2xl content-center'>
                            {positiveIncomesSum?.toLocaleString('fr-FR')}
                        </div>

                        <i className="fa-solid fa-minus content-center"></i>

                        <div className='text-red-600 text-2xl content-center'>
                            {Math.abs(negativeIncomesSum)?.toLocaleString('fr-FR')}
                        </div>

                        <i className="fa-solid fa-equals content-center"></i>

                        <div className={`text-${totalIncomesSum >= 0 ? 'green' : 'red'}-600 text-2xl content-center`}>
                            {totalIncomesSum?.toLocaleString('fr-FR')} Golds
                        </div>
                    </div>

                    {/* <button onClick={() => setNewGoldsFromOldWebsite()} type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Set Data From Old Website</button> */}


                </div>
                <div className={`col-span-3 row-span-5 border-l border-r border-b border-[#2e3643] overflow-y-scroll overflow-x-hidden`}>
                    <div className="sticky top-0 p-2 pt-3 bg-[#1e232d] border-b border-r border-[#2e3643]">
                        <div className="relative w-full my-2 group">
                            <input
                                type="text"
                                id="fatember_search_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <label htmlFor="fatember_search_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search:</label>
                        </div>
                    </div>
                    <div>
                        {incomes?.filter(income => income?.type?.toLowerCase().includes(search?.toLowerCase()) || income?.perso?.toLowerCase().includes(search?.toLowerCase()) || income?.description?.toLowerCase().includes(search?.toLowerCase()))?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((income, index) => {
                            return (
                                <div key={index} className='grid grid-cols-3 items-center border-b border-r border-[#2e3643] p-2'>
                                    <div className='col-span-2'>
                                        <div className='text-gray-300'>{income?.type}{income?.description ? ' - ' + income?.description : ''}</div>
                                        <div className='text-gray-400'>{income?.perso} le {new Date(income?.date).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                    <div className={`h-full w-full text-xs inline-flex items-center px-2.5 py-1 rounded-md ${income?.montant >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                        <i className={`fa-solid ${income?.montant >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} mr-3`}></i>
                                        {income?.montant.toLocaleString('fr-FR')} Golds
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='col-span-2 row-span-5 border-r border-b border-[#2e3643] overflow-y-scroll overflow-x-hidden'>
                    <div className="sticky top-0 p-2 pt-3 bg-[#1e232d] border-b border-r border-[#2e3643]">
                        <div className="relative w-full my-2 group">
                            <input
                                type="text"
                                id="fatember_searchtype_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={searchType}
                                onChange={e => setSearchType(e.target.value)}
                            />
                            <label htmlFor="fatember_searchtype_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search:</label>
                        </div>
                    </div>

                    <div>
                        {incomes && Object.entries(incomes?.filter(income => income?.type?.toLowerCase().includes(searchType?.toLowerCase()) || income?.perso?.toLowerCase().includes(searchType?.toLowerCase()) || income?.description?.toLowerCase().includes(searchType?.toLowerCase()))?.reduce((acc, income) => {
                            if (!acc[income.type]) {
                                acc[income.type] = 0;
                            }

                            acc[income.type] += income.montant;

                            return acc;
                        }, {})).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).map(([type, incomes]) => (
                            <div key={type} className='flex flex-row justify-between border-b border-r border-[#2e3643] p-2'>
                                <div className='content-center'>
                                    <div className={`text-${incomes >= 0 ? 'green' : 'red'}-600`}>{incomes.toLocaleString('fr-FR')}</div>
                                    <div className='text-gray-300'>{type}</div>
                                </div>
                                <div className=''>
                                    <img src={`/images/${type}.webp`} alt={type} className='max-w-[48px] h-auto' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-span-2 row-span-5 border-r border-b border-[#2e3643] overflow-y-scroll overflow-x-hidden'>
                    <div className="sticky top-0 p-2 pt-3 bg-[#1e232d] border-b border-r border-[#2e3643]">
                        <div className="relative w-full my-2 group">
                            <input
                                type="text"
                                id="fatember_searchperso_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={searchPerso}
                                onChange={e => setSearchPerso(e.target.value)}
                            />
                            <label htmlFor="fatember_searchperso_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search:</label>
                        </div>
                    </div>

                    <div>
                        {incomes && Object.entries(incomes?.filter(income => income?.type?.toLowerCase().includes(searchPerso?.toLowerCase()) || income?.perso?.toLowerCase().includes(searchPerso?.toLowerCase()) || income?.description?.toLowerCase().includes(searchPerso?.toLowerCase()))?.reduce((acc, income) => {
                            if (!acc[income.perso]) {
                                acc[income.perso] = 0;
                            }

                            acc[income.perso] += income.montant;

                            return acc;
                        }, {})).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).map(([perso, incomes]) => (
                            <div key={perso} className='flex flex-row justify-between border-b border-r border-[#2e3643] p-2'>
                                <div className='content-center'>
                                    <div className={`text-${incomes >= 0 ? 'green' : 'red'}-600`}>{incomes.toLocaleString('fr-FR')}</div>
                                    <div className='text-gray-300'>{perso}</div>
                                </div>
                                <div className=''>
                                    {getPersoByName(perso)?.classe && (
                                        <img src={getClasseByName(getPersoByName(perso).classe).logo} alt={perso} className='max-w-[48px] h-auto class_icon' />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-span-7 row-span-2 border-l border-r border-[#2e3643] p-2'>
                    <Line data={graphGoldData} options={graphGoldOptions} />
                </div>
            </div>
        </div>
    )
}
