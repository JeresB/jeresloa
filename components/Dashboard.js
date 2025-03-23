'use client'

import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { format, getDay, subDays } from 'date-fns'
import { db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast';
import Loading from './Loading'
import { categories, classes, daysRestants, getCategorieByName, MAX_BLOODSTONES } from '@/utils'

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading, resetDaily } = useAuth();
    const [commonData, setCommonData] = useState({});
    const [tasks, setTasks] = useState(null);
    const [persos, setPersos] = useState(null);
    let displayRaidPicture = false;

    useEffect(() => {
        if (currentUser && userDataObj) {
            setTasks(userDataObj.tasks);
            //console.log("[Dashboard][useEffect on userDataObj] userDataObj : ", userDataObj);
            setPersos([...userDataObj?.roster?.persos, { name: 'Roster', ilevel: userDataObj?.roster?.ilevel }]);
        }
    }, [userDataObj, currentUser]);

    const handleTaskClick = (task, perso, difficulty = null) => {
        const c = getCategorieByName(task.idcategorie);
        let updatedUserDataObj = { ...userDataObj };

        if (task?.artisanatLifeEnergy) {
            const remainingLifeEnergy = prompt(`Enter remaining life energy:`);

            if (!remainingLifeEnergy) return;

            task.artisanatLifeEnergy = parseInt(remainingLifeEnergy);
            task.dateMaj = new Date().toISOString();
        }

        if (c?.bloodstonesGain && perso.trackBloodstones) {
            if (c.groupe === 'raids') {
                perso.raidgatedone = (perso.raidgatedone || 0) + 1;

                if (perso.raidgatedone === 2) {
                    perso.raidgatedone = 0;

                    perso.bloodstones = (perso.bloodstones + c.bloodstonesGain) > 6000 ? 6000 : (perso.bloodstones + c.bloodstonesGain);
                }
            } else {
                perso.bloodstones = (perso.bloodstones + c.bloodstonesGain) > 6000 ? 6000 : (perso.bloodstones + c.bloodstonesGain);
            }

            const updatedPersos = persos?.filter(p => p.name !== 'Roster').map(p => {
                if (p.name === perso.name) {
                    return { ...perso };
                }

                return p;
            });

            updatedUserDataObj = {
                ...updatedUserDataObj,
                roster: {
                    ...updatedUserDataObj.roster,
                    persos: updatedPersos
                }
            };
        }

        if (c.completAllAtOnce) {
            task.done = c.repet
            task.count = task.count + c.repet

            if (task?.rest) {
                const rest = c.maxRest / 5;

                for (let index = 0; index < c.repet; index++) {
                    if (task.rest >= rest) task.rest -= rest
                }
            }
        } else {
            task.done++;
            task.count++;

            if (task?.rest) {
                const rest = c.maxRest / 5;

                if (task.rest >= rest) task.rest -= rest;
            }
        }

        const updatedTasks = tasks.map(t => {
            if (t.idtask === task.idtask) {
                return { ...task };
            }

            return t;
        });

        // setTasks(updatedTasks);

        updatedUserDataObj = {
            ...updatedUserDataObj,
            tasks: updatedTasks
        };

        if (!c.completAllAtOnce && c.groupe === 'raids' && difficulty && perso.goldEarner) {
            let histoGold = null;
            let incomeGold = null;
            let newGolds = null;
            let descGold = null;
            let montantGold = null;
            const date = new Date().toISOString();

            if (task.gold) {
                if (task.done === 1) {
                    newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].G1;
                    descGold = 'G1 ' + c.name + ' ' + difficulty;
                    montantGold = c[difficulty].G1;

                } else if (task.done === 2) {
                    newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].G2;
                    descGold = 'G2 ' + c.name + ' ' + difficulty;
                    montantGold = c[difficulty].G2;

                } else if (task.done === 3) {
                    newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].G3;
                    descGold = 'G3 ' + c.name + ' ' + difficulty;
                    montantGold = c[difficulty].G3;

                } else if (task.done === 4) {
                    newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].G4;
                    descGold = 'G4 ' + c.name + ' ' + difficulty;
                    montantGold = c[difficulty].G4;

                }

                if (newGolds && descGold && montantGold) {
                    histoGold = {
                        date: date,
                        gold: newGolds
                    }

                    incomeGold = {
                        type: 'Raids',
                        description: descGold,
                        categorie: 'positif',
                        perso: task.idperso,
                        montant: montantGold,
                        date: date
                    }
                }

                if (newGolds && histoGold && incomeGold) {
                    updatedUserDataObj = {
                        ...updatedUserDataObj,
                        golds: {
                            ...updatedUserDataObj.golds,
                            currentGolds: newGolds,
                            historiques: [
                                ...updatedUserDataObj.golds.historiques,
                                histoGold
                            ],
                            incomes: [
                                ...updatedUserDataObj.golds.incomes,
                                incomeGold
                            ]
                        }
                    };
                }
            }

            histoGold = null;
            incomeGold = null;
            newGolds = null;
            descGold = null;
            montantGold = null;

            if (task.done === 1 && task?.coffreG1) {
                newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].coffreG1;
                descGold = 'G1 ' + c.name + ' ' + difficulty;
                montantGold = c[difficulty].coffreG1;

            } else if (task.done === 2 && task?.coffreG2) {
                newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].coffreG2;
                descGold = 'G2 ' + c.name + ' ' + difficulty;
                montantGold = c[difficulty].coffreG2;

            } else if (task.done === 3 && task?.coffreG3) {
                newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].coffreG3;
                descGold = 'G3 ' + c.name + ' ' + difficulty;
                montantGold = c[difficulty].coffreG3;

            } else if (task.done === 4 && task?.coffreG4) {
                newGolds = (updatedUserDataObj.golds.currentGolds || 0) + c[difficulty].coffreG4;
                descGold = 'G4 ' + c.name + ' ' + difficulty;
                montantGold = c[difficulty].coffreG4;
            }

            if (newGolds && descGold && montantGold) {
                histoGold = {
                    date: date,
                    gold: newGolds
                }

                incomeGold = {
                    type: 'Coffre de raids',
                    description: descGold,
                    categorie: 'negatif',
                    perso: task.idperso,
                    montant: montantGold,
                    date: date
                }
            }

            if (newGolds && histoGold && incomeGold) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    golds: {
                        ...updatedUserDataObj.golds,
                        currentGolds: newGolds,
                        historiques: [
                            ...updatedUserDataObj.golds.historiques,
                            histoGold
                        ],
                        incomes: [
                            ...updatedUserDataObj.golds.incomes,
                            incomeGold
                        ]
                    }
                };
            }
        }

        setUserDataObj(updatedUserDataObj);

        const docRef = doc(db, 'users', currentUser.uid);
        setDoc(docRef, updatedUserDataObj, { merge: true })
            .then(() => {
                toast.success(`Task ${c.name} checked successfully for ${perso.name}`, {
                    position: 'top-right',
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            })
            .catch(err => {
                console.error('Error updating task: ', err);
            });
    };

    const handleBloodstoneClick = (perso) => {
        if (!perso?.trackBloodstones) {
            return;
        }

        const newBloodstones = (perso.bloodstones || 0) + 220;
        const updatedPerso = { ...perso, bloodstones: newBloodstones > 6000 ? 6000 : newBloodstones };

        const updatedPersos = persos.map(p => {
            if (p.name === perso.name) {
                return updatedPerso;
            }
            return p;
        });

        setPersos(updatedPersos);

        const updatedUserDataObj = {
            ...userDataObj,
            roster: {
                ...userDataObj.roster,
                persos: updatedPersos?.filter(p => p.name !== 'Roster')
            }
        };

        setUserDataObj(updatedUserDataObj);

        const docRef = doc(db, 'users', currentUser.uid);
        setDoc(docRef, updatedUserDataObj, { merge: true })
            .then(() => {
                toast.success(`220 Bloodstones added successfully for ${perso.name}`, {
                    position: 'top-right',
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            })
            .catch(err => {
                console.error('Error updating bloodstones: ', err);
            });
    };

    const missingBloodstones = (perso) => {
        if (!perso?.trackBloodstones) {
            return;
        }

        const daysLeft = daysRestants();

        const dailyBloodstones = tasks
            ?.filter(task => task.idperso === perso.name && getCategorieByName(task.idcategorie).groupe === 'daily')
            ?.reduce((total, task) => {
                const category = getCategorieByName(task.idcategorie);
                return total + ((category.bloodstonesGain || 0) * (category.repet - task.done));
            }, 0);

        const weeklyBloodstones = tasks
            ?.filter(task => task.idperso === perso.name && getCategorieByName(task.idcategorie).groupe === 'weekly')
            ?.reduce((total, task) => {
                const category = getCategorieByName(task.idcategorie);
                return total + ((category.bloodstonesGain || 0) * (category.repet - task.done));
            }, 0);

        //console.log(perso.name, perso.bloodstones, (perso.bloodstones + (440 * daysLeft) + dailyBloodstones + weeklyBloodstones), daysLeft, dailyBloodstones, weeklyBloodstones);

        const missing_bloodstones = MAX_BLOODSTONES - (perso.bloodstones + (440 * daysLeft) + dailyBloodstones + weeklyBloodstones);
        return missing_bloodstones <= 0 ? '' : 'Missing ' + missing_bloodstones + ' bloodstones';
    };

    const getPersoByName = (name) => {
        return userDataObj.roster.persos.find(p => p.name === name);
    };

    const getClasseByName = (classeName) => {
        return classes.find(classe => classe.name === classeName);
    };

    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        //redirect('/')

        return (
            <div className='flex flex-col justify-center items-center h-full gap-6'>
                <h1 className='text-4xl font-bold text-white'>Dashboard</h1>
            </div>
        )
    }

    return (
        <div className='max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-full overflow-y-scroll overflow-x-hidden'>
            <div className='grid grid-cols-8 text-gray-300 p-2 border-l border-r border-b border-[#2e3643] sticky top-0 bg-[#1e232d] box-shadow-loa z-10'>
                <div>Perso</div>
                <div>ILevel</div>
                <div className='col-span-2'>Daily</div>
                <div className='col-span-2'>Weekly</div>
                <div>Bloodstones</div>
                <div>Logo</div>
            </div>
            <div className='grid grid-cols-1'>
                {persos?.sort((a, b) => a.order - b.order).map((perso, index) => {
                    const currentHour = parseInt(format(new Date(), 'HH'));
                    const currentDay = getDay(new Date());
                    const previousDay = currentDay === 1 ? 7 : currentDay - 1;

                    const filteredTasks = tasks?.filter(task =>
                        (task.idperso === perso.name || (task.idperso === "" && perso.name === "Roster"))
                        && task.actif
                        && (task.done < getCategorieByName(task.idcategorie).repet && (task.rest == undefined || task.done == 0 && task.rest >= task.restNeeded || task.done > 0))
                        && ((getCategorieByName(task.idcategorie).horaire !== undefined && getCategorieByName(task.idcategorie).horaire.includes(currentHour < userDataObj.reset.resetHour ? previousDay : currentDay)) || getCategorieByName(task.idcategorie).horaire === undefined)
                    );

                    const daily = filteredTasks?.filter(task => getCategorieByName(task.idcategorie).groupe === 'daily').sort((a, b) => a.idcategorie.localeCompare(b.idcategorie));
                    const weekly = filteredTasks?.filter(task => getCategorieByName(task.idcategorie).groupe === 'weekly').sort((a, b) => a.idcategorie.localeCompare(b.idcategorie));

                    return (daily?.length > 0 || weekly?.length > 0 || (missingBloodstones(perso) !== '' && perso.trackBloodstones)) && (
                        <div key={index} className='grid grid-cols-8 text-gray-400 px-2 py-4 border-l border-r border-b border-[#2e3643]'>
                            <h2 className='content-center text-lg'><span dangerouslySetInnerHTML={{ __html: getClasseByName(perso.classe)?.icon }} /> {perso.name}</h2>
                            <p className='content-center'>{perso.ilevel}</p>
                            <div className='col-span-2'>
                                <ul className="flex flex-row flex-wrap gap-2">
                                    {daily.map((task, idx) => (
                                        <div key={idx} className='flex flex-row gap-2'>
                                            {Array.from({ length: getCategorieByName(task.idcategorie).completAllAtOnce ? 1 : (getCategorieByName(task.idcategorie).repet - task.done) }).map((_, imgIdx) => (
                                                <li key={imgIdx} className="flex flex-row items-center gap-2 p-1 rounded-lg cursor-pointer border hover:text-gray-200 border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700" onClick={() => handleTaskClick(task, perso)}>
                                                    {task?.artisanatLifeEnergy} {task?.rest >= (getCategorieByName(task.idcategorie).maxRest / 5) ? task.rest : null} <img className="w-[40px]" src={getCategorieByName(task.idcategorie).logo} />
                                                </li>
                                            ))}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <div className='col-span-2'>
                                <ul className="flex flex-row flex-wrap gap-2">
                                    {weekly.map((task, idx) => (
                                        <div key={idx} className='flex flex-row gap-2'>
                                            {Array.from({ length: getCategorieByName(task.idcategorie).completAllAtOnce ? 1 : (getCategorieByName(task.idcategorie).repet - task.done) }).map((_, imgIdx) => (
                                                <li key={imgIdx} className="flex flex-row items-center gap-2 p-1 rounded-lg cursor-pointer border hover:text-gray-200 border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700" onClick={() => handleTaskClick(task, perso)}>
                                                    <img className="w-[40px]" src={getCategorieByName(task.idcategorie).logo} />
                                                </li>
                                            ))}
                                        </div>
                                    ))}
                                </ul>
                            </div>

                            <div className={perso?.trackBloodstones ? 'content-center p-1 mr-8 rounded-lg cursor-pointer border hover:text-gray-200 border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700' : ''} onClick={() => handleBloodstoneClick(perso)}>
                                <p className='text-sm'>{perso?.trackBloodstones ? perso?.bloodstones : ''}</p>
                                <p className='text-xs'>{missingBloodstones(perso)}</p>
                            </div>

                            {classes.find(classe => classe.name === perso?.classe)?.logo && (
                                <img src={classes.find(classe => classe.name === perso?.classe)?.logo} alt={`${perso.name} class logo`} className='class_icon w-12 h-12' />
                            )}
                        </div>
                    )
                })}
            </div>

            <div className='h-4'></div>
            <div className={`w-full grid text-gray-300 p-2 border border-[#2e3643] sticky top-0 bg-[#1e232d] box-shadow-loa z-10 whitespace-nowrap`} style={{ gridTemplateColumns: `repeat(${2 + persos?.filter(p => p.name !== 'Roster' && tasks?.some(task => task.idperso === p.name && getCategorieByName(task.idcategorie).groupe === 'raids')).length}, minmax(0, 1fr))` }}>
                <div>Raid left todo</div>
                <div>{tasks?.filter(task => getCategorieByName(task.idcategorie).groupe === 'raids' && task.actif && task.done < getCategorieByName(task.idcategorie).repet).length}</div>
                {persos?.filter(perso => perso.name !== 'Roster' && tasks?.some(task => task.idperso === perso.name && getCategorieByName(task.idcategorie).groupe === 'raids')).map((perso, index) => (
                    <div key={index}>{perso.name}</div>
                ))}
            </div>
            {categories?.filter(categorie => categorie.groupe === 'raids').map((raid, indexr) => (
                <div key={indexr} className={`grid text-gray-400 px-2 py-4 border-l border-r border-b border-[#2e3643] whitespace-nowrap`} style={{ gridTemplateColumns: `repeat(${2 + persos?.filter(p => p.name !== 'Roster' && tasks?.some(task => task.idperso === p.name && getCategorieByName(task.idcategorie).groupe === 'raids')).length}, minmax(0, 1fr))` }}>
                    <div>{raid.name}</div>
                    <div>{tasks?.filter(task => task.idcategorie === raid.name && task.actif && task.done < raid.repet).length}</div>
                    {persos?.filter(perso => perso.name !== 'Roster' && tasks?.some(task => task.idperso === perso.name && getCategorieByName(task.idcategorie).groupe === 'raids')).map((perso, index) => {
                        const task = tasks?.find(task => task.idcategorie === raid.name && task.idperso === perso.name);
                        return (
                            <div key={index} className={task && task.done >= raid.repet ? 'text-gray-600' : ''}>
                                {task ? `${task.done}/${raid.repet}` : 'N/A'}
                            </div>
                        );
                    })}
                </div>
            ))}

            <div className='h-4'></div>

            <div className='grid grid-cols-1'>
                {
                    categories?.filter(categorie => categorie.groupe === 'raids').map((raid, indexr) => {
                        displayRaidPicture = !displayRaidPicture;

                        if (tasks?.filter(task => task.idcategorie === raid.name && task.actif && task.done < raid.repet).length > 0) {
                            return (
                                <div key={indexr} className='grid grid-cols-3 text-gray-400 border border-[#2e3643]'>
                                    {displayRaidPicture && (
                                        <div className="min-w-[6vw] min-h-[18vh] bg-cover bg-center" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                    )}
                                    <div className="col-span-2 flex flex-col">
                                        {
                                            tasks?.filter(task => task.idcategorie === raid.name && task.actif && task.done < raid.repet).map((task, indext) => {

                                                const p = getPersoByName(task.idperso);
                                                const classe = getClasseByName(p.classe);

                                                let chest = '';

                                                //console.log(raid);

                                                if (task.hasOwnProperty('coffreG1') && task.coffreG1) chest += chest.length == 0 ? '<i class="fa-solid fa-gift"></i>&nbsp;<i class="fa-solid fa-1"></i>' : '&nbsp;<i class="fa-solid fa-1"></i>';
                                                if (task.hasOwnProperty('coffreG2') && task.coffreG2) chest += chest.length == 0 ? '<i class="fa-solid fa-gift"></i>&nbsp;<i class="fa-solid fa-2"></i>' : '&nbsp;<i class="fa-solid fa-2"></i>';
                                                if (task.hasOwnProperty('coffreG3') && task.coffreG3) chest += chest.length == 0 ? '<i class="fa-solid fa-gift"></i>&nbsp;<i class="fa-solid fa-3"></i>' : '&nbsp;<i class="fa-solid fa-3"></i>';
                                                if (task.hasOwnProperty('coffreG4') && task.coffreG4) chest += chest.length == 0 ? '<i class="fa-solid fa-gift"></i>&nbsp;<i class="fa-solid fa-4"></i>' : '&nbsp;<i class="fa-solid fa-4"></i>';

                                                let gate = '';

                                                for (let i = 1; i <= raid.repet; i++) {
                                                    if (task.done < i) gate += gate.length == 0 ? `<i class="fa-solid fa-dungeon"></i>&nbsp;<i class="fa-solid fa-${i}"></i>` : `&nbsp;<i class="fa-solid fa-${i}"></i>`;
                                                }

                                                return (
                                                    <div key={indext} className={`grow grid grid-cols-6 ${indext > 0 ? 'border-t' : ''} border-[#2e3643] p-2`}>
                                                        <div className="text-gray-300 content-center">
                                                            <div>{task.idperso}</div>
                                                            <div className='text-xs text-red-700'>{!task?.gold && p.goldEarner ? 'Uncheck golds' : ''}</div>
                                                        </div>
                                                        <div className="content-center">
                                                            <div className='flex flex-row justify-between mr-6'><span>{p.classe}</span><span>{p.ilevel}</span></div>
                                                        </div>
                                                        <div className="content-center">
                                                            <div>{classe.type}</div>
                                                        </div>
                                                        <div className="content-center">
                                                            <div dangerouslySetInnerHTML={{ __html: chest }}></div>
                                                        </div>
                                                        <div className="content-center">
                                                            <div dangerouslySetInnerHTML={{ __html: gate }}></div>
                                                        </div>
                                                        <div className="flex justify-end items-center gap-2">
                                                            <button onClick={() => handleTaskClick(task, p, 'NM')} className={`px-2 py-1 rounded-lg border text-gray-300 hover:text-gray-200 whitespace-nowrap ${p.ilevel >= raid.NM.ilevel && (!raid.HM || p.ilevel < raid.HM.ilevel) ? 'border-green-700 bg-green-800 hover:bg-green-700' : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}`}><span className='text-sm text-gray-400'>{raid.NM.ilevel}</span> NM</button>
                                                            {raid.HM && (
                                                                <button onClick={() => handleTaskClick(task, p, 'HM')} className={`px-2 py-1 rounded-lg border text-gray-300 hover:text-gray-200 whitespace-nowrap ${p.ilevel >= raid.HM.ilevel ? 'border-green-700 bg-green-800 hover:bg-green-700' : 'border-gray-700 bg-gray-800 hover:bg-gray-700'}`}><span className='text-sm text-gray-400'>{raid.HM.ilevel}</span> HM</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {!displayRaidPicture && (
                                        <div className="min-w-[6vw] min-h-[18vh] bg-cover bg-center" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                    )}
                                </div>
                            )
                        } else {
                            const clear = Math.floor(tasks
                                ?.filter(task => task.idcategorie === raid.name)
                                ?.reduce((sum, task) => sum + (task.count / raid.repet), 0)
                            )

                            const totalIncome = userDataObj.golds.incomes
                                ?.filter(income => income.description?.includes(raid.name))
                                ?.reduce((sum, income) => sum + income.montant, 0);

                            return (
                                <div key={indexr} className='grid grid-cols-3 text-gray-400 border border-[#2e3643]'>
                                    {displayRaidPicture && (
                                        <div className="min-w-[6vw] min-h-[18vh] bg-cover bg-center" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                    )}

                                    <div className="col-span-2">
                                        <div className="flex justify-around items-center h-full">
                                            <p className="text-lg text-gray-300">Clear { clear } times</p>
                                            <p className="text-lg text-gray-300">{ totalIncome.toLocaleString('fr-FR') } golds generated</p>
                                        </div>
                                    </div>

                                    {!displayRaidPicture && (
                                        <div className="min-w-[6vw] min-h-[18vh] bg-cover bg-center" style={{ backgroundImage: `url(${raid.image})` }}></div>
                                    )}
                                </div>
                            )
                        }

                        // tasks?.filter(task => task.idcategorie === raid.name).map((task, indext) => {
                        //     console.log('task', task)
                        // })
                    })
                }
            </div>
        </div>
    )
}
