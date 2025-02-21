'use client';

import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { categories, classes } from '@/utils';

export default function RaidsTracker() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading } = useAuth();
    const [tasks, setTasks] = useState(null);
    const [incomes, setIncomes] = useState(null);
    const [historiques, setHistoriques] = useState(null);
    let displayRaidPicture = false;

    useEffect(() => {
        if (currentUser && userDataObj) {
            setTasks(userDataObj.tasks);
        }
    }, [userDataObj, currentUser]);

    // return dbgolds.get("golds.income").value().filter(g => { return new Date(g.date) >= getDateLastReset() }).sort(function (a, b) {
    //     return new Date(b.date) - new Date(a.date)
    // })

    // useEffect(() => {
    //     if (currentUser && userDataObj.golds) {
    //         const filteredIncomes = userDataObj.golds.incomes.filter(income => {
    //             const incomeDate = new Date(income.date);

    //             const adjustedEndDate = new Date(endDate);
    //             adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    //             return incomeDate >= startDate && incomeDate < adjustedEndDate;
    //         });

    //         setIncomes(filteredIncomes);

    //         const filteredHistoriques = userDataObj.golds.historiques.filter(historique => {
    //             const historiqueDate = new Date(historique.date);

    //             const adjustedEndDate = new Date(endDate);
    //             adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    //             return historiqueDate >= startDate && historiqueDate < adjustedEndDate;
    //         });

    //         setHistoriques(filteredHistoriques);
    //     }
    // }, [userDataObj]);


    // const weeklyIncome = getWeeklyGoldIncome();
    // const weeklyBiMensuelOffsetIncome = getBiMensuelOffsetWeeklyGoldIncome();

    // const persosList = userDataObj.persos.map(p => (
    //     <li className="" style={{ width: '13vw' }} key={p.name}>
    //         <div className="inline-flex items-center justify-between w-full p-2 border rounded-lg hover:text-gray-300 border-gray-700 text-gray-400 bg-gray-800 hover:bg-gray-700">
    //             <div className="block">
    //                 <div className="w-full text-md font-semibold">{p.name}</div>
    //                 <div className="w-full text-xs">Gain</div>
    //             </div>
    //         </div>
    //     </li>
    // ));

    // const raidsList = userDataObj.actifRaids.map(r => (
    //     <ul className="flex flex-row flex-nowrap gap-6 m-2 p-2 rounded-lg" style={{ backgroundColor: '#1e232d' }} key={r.name}>
    //         <li className="grow">
    //             <div className="inline-flex items-center justify-between w-full h-full p-2 border rounded-lg hover:text-gray-300 border-gray-700 text-gray-400 bg-gray-800 hover:bg-gray-700">
    //                 <div className="block">
    //                     <div className="w-full text-md font-semibold">{r.name}</div>
    //                     <div className="w-full text-xs">{r.repet} Gates</div>
    //                 </div>
    //             </div>
    //         </li>
    //         {userDataObj.persos.map(p => {
    //             const t = getTaskPC(p.idperso, r.idcategorie);
    //             return (
    //                 <li className="" style={{ width: '13vw' }} key={p.name}>
    //                     <ul className="flex flex-col flex-wrap gap-2 rounded-lg">
    //                         {Array.from({ length: r.repet }, (_, index) => {
    //                             const gateIndex = index + 1;
    //                             const gate = t.done >= gateIndex ? 'green' : 'gray';
    //                             const income = r.idcategorie === 'c_theamine_1_4' && gateIndex === 4 ? weeklyBiMensuelOffsetIncome : weeklyIncome;

    //                             const gold = income.find(g => g.type === 'Raids' && g.perso === p.name && g.description.includes(r.name) && g.description.includes('G' + gateIndex)) ? 'green' : 'gray';
    //                             const chest = income.find(g => g.type === 'Coffre de raids' && g.perso === p.name && g.description.includes(r.name) && g.description.includes('G' + gateIndex)) ? 'green' : 'gray';

    //                             return (
    //                                 <ul className="flex flex-row flex-nowrap gap-2" key={gateIndex}>
    //                                     <li className="grow">
    //                                         <div className={`inline-flex items-center justify-between w-full h-full p-2 border rounded-lg hover:text-${gate}-300 border-${gate}-700 text-${gate}-400 bg-${gate}-800 hover:bg-${gate}-700`}>
    //                                             <div className="block">
    //                                                 <div className="w-full text-md font-semibold">Gate {gateIndex}</div>
    //                                             </div>
    //                                         </div>
    //                                     </li>
    //                                     <li className="shrink js-gestiongoldraid-gold" data-idperso={p.idperso} data-idcategorie={r.idcategorie} data-gate={gateIndex}>
    //                                         <div className={`inline-flex items-center justify-between w-full p-2 border rounded-lg hover:text-${gold}-300 border-${gold}-700 text-${gold}-400 bg-${gold}-800 hover:bg-${gold}-700`}>
    //                                             <img style={{ width: '32px' }} src="images/money_4.webp" />
    //                                         </div>
    //                                     </li>
    //                                     <li className="shrink js-gestiongoldraid-chest" data-idperso={p.idperso} data-idcategorie={r.idcategorie} data-gate={gateIndex}>
    //                                         <div className={`inline-flex items-center justify-between w-full p-2 border rounded-lg hover:text-${chest}-300 border-${chest}-700 text-${chest}-400 bg-${chest}-800 hover:bg-${chest}-700`}>
    //                                             <img style={{ width: '32px' }} src="images/Coffre de raids.webp" />
    //                                         </div>
    //                                     </li>
    //                                 </ul>
    //                             );
    //                         })}
    //                     </ul>
    //                 </li>
    //             );
    //         })}
    //     </ul>
    // ));

    const getPersoByName = (name) => {
        return userDataObj.roster.persos.find(p => p.name === name);
    };

    const getClasseByName = (classeName) => {
        return classes.find(classe => classe.name === classeName);
    };

    if (loading) return <Loading />;
    if (!currentUser) return null;

    return (
        <div className='max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-y-scroll overflow-x-hidden py-6'>
            <div className='grid grid-cols-1 gap-6'>
                {
                    categories.filter(categorie => categorie.groupe === 'raids').map((raid, indexr) => {
                        displayRaidPicture = !displayRaidPicture;

                        return (
                            <div key={indexr} className='grid grid-cols-3 text-gray-400 border border-[#2e3643]'>
                                {displayRaidPicture && (
                                    <div className="min-w-[6vw] min-h-[18vh] bg-cover bg-center" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                )}

                                <div className="col-span-2">
                                    <div className="">
                                        {
                                            tasks?.filter(task => task.idcategorie === raid.name && task.actif).map((task, indext) => {

                                                const p = getPersoByName(task.idperso);
                                                const classe = getClasseByName(p.classe);

                                                return (
                                                    <div key={indext} className="grid grid-cols-6 border-b border-[#2e3643] p-2">
                                                        <div className="text-gray-300 content-center">
                                                            <div>{task.idperso}</div>
                                                        </div>
                                                        <div className="content-center">
                                                            <div>{p.ilevel}</div>
                                                        </div>
                                                        <div className="content-center col-span-4">
                                                            <div className='flex flex-row justify-around gap-2'>
                                                                {Array.from({ length: raid.repet }).map((_, gateIdx) => {
                                                                    const gate = task.done >= (gateIdx + 1) ? 'green' : 'gray';
                                                                    
                                                                    return (
                                                                        <div key={gateIdx} className={`text-${gate}-400`}>
                                                                            Gate {gateIdx + 1}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                {!displayRaidPicture && (
                                    <div className="min-w-[6vw] min-h-[18vh] bg-cover bg-center" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                )}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
