'use client'

import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Loading from './Loading';

export default function GoldsDisplay() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading, startDate, setStartDate, endDate, setEndDate } = useAuth();
    const [incomes, setIncomes] = useState(null);
    const [historiques, setHistoriques] = useState(null);

    console.log("[Golds Diplays] userDataObj: ", userDataObj);
    console.log("[Golds Diplays] startDate: ", startDate);
    console.log("[Golds Diplays] endDate: ", endDate);

    useEffect(() => {
        if (currentUser && userDataObj.golds) {
            const filteredIncomes = userDataObj.golds.incomes.filter(income => {
                const incomeDate = new Date(income.date);

                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

                return incomeDate >= startDate && incomeDate < adjustedEndDate;
            });

            setIncomes(filteredIncomes);

            const filteredHistoriques = userDataObj.golds.historiques.filter(historique => {
                const historiqueDate = new Date(historique.date);

                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

                return historiqueDate >= startDate && historiqueDate < adjustedEndDate;
            });

            setHistoriques(filteredHistoriques);
        }
    }, [userDataObj, startDate, endDate]);

    const getGraphGoldLabel = () => {
        console.log("[Golds Diplays] historiques: ", historiques);

        const sortedHistoriquesDates = historiques
            ?.map(historique => new Date(historique.date).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }))
            .sort((a, b) => new Date(a) - new Date(b));

        console.log("[Golds Diplays] sortedHistoriquesDates: ", sortedHistoriquesDates);

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

    if (loading) return <Loading />;
    if (!currentUser) return null;

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            <div className="grid grid-cols-7 grid-rows-9 h-full min-w-[60vw] max-w-[1500px]">
                <div className='col-span-3 row-span-2 border-l border-r border-b border-[#2e3643] p-2'>Titre + Gold Actuel + % gain ou perte</div>
                <div className='col-span-4 row-span-3 border-r border-b border-[#2e3643] p-2'>
                    <p>Stats gain + depense = compte --- double date picker</p>

                    <div className='flex flex-row justify-between p-4 gap-6'>
                        <div className='grow flex flex-col'>
                            <span className='text-gray-300'>Début</span>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='w-full text-gray-400 rounded bg-[#27313d] p-1' dateFormat="dd/MM/yyyy" />
                        </div>
                        <div className='grow flex flex-col'>
                            <span className='text-gray-300'>Fin</span>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className='w-full text-gray-400 rounded bg-[#27313d] p-1' dateFormat="dd/MM/yyyy" />
                        </div>
                    </div>
                </div>
                <div className={`col-span-3 row-span-5 border-l border-r border-b border-[#2e3643] ${incomes.lenght > 10 ? 'overflow-y-scroll overflow-x-hidden' : ''}`}>
                    {incomes?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((income, index) => {
                        return (
                            <div key={index} className='grid grid-cols-3 items-center border-b border-[#2e3643] p-2'>
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
                <div className='col-span-2 row-span-4 border-r border-b border-[#2e3643] p-2'>Classement par type</div>
                <div className='col-span-2 row-span-4 border-r border-b border-[#2e3643] p-2'>Classement par perso</div>
                <div className='col-span-7 row-span-2 border-l border-r border-[#2e3643] p-2'>
                    <Line data={graphGoldData} options={graphGoldOptions} />
                </div>
            </div>
        </div>
    )
}
