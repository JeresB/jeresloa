'use client'

import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { classes, demo_perso } from '@/utils'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function Roster() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading } = useAuth()
    const [roster, setRoster] = useState(null);
    const [selectedPerso, setSelectedPerso] = useState({
        "idperso": "",
        "name": "",
        "classe": "",
        "ilevel": "",
        "bloodstones": 0,
        "trackBloodstones": false,
    });

    useEffect(() => {
        if (userDataObj) {
            setRoster(userDataObj.roster);
        }
    }, [userDataObj]);

    useEffect(() => {
        if (selectedPerso.idperso != "") {
            let p = selectedPerso;
            
            if (!p.bloodstones) {
                p.bloodstones = 0;
            }

            const r = {
                ...roster,
                persos: roster.persos.map(perso =>
                    perso.idperso === p.idperso ? p : perso
                )
            }

            setRoster(r);

            if (currentUser && userDataObj) {
                setUserDataObj(prevUserDataObj => ({ ...prevUserDataObj, roster: r }));

                updateFirebase(r);
            }
        }

    }, [selectedPerso]);

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

    console.log(userDataObj.roster);
    console.log(roster);
    console.log(selectedPerso);

    async function updateFirebase(r = null) {
        if (currentUser && userDataObj) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { ...userDataObj, roster: r ? r : roster });
        }
    }

    const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
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

    const deletePerso = () =>{
        if (selectedPerso.idperso != "") {
            const r = {
                ...roster,
                persos: roster.persos.filter(perso => perso.idperso !== selectedPerso.idperso)
            }

            setRoster(r);

            if (currentUser && userDataObj) {
                setUserDataObj(prevUserDataObj => ({ ...prevUserDataObj, roster: r }));

                updateFirebase(r);
                // const userDocRef = doc(db, 'users', currentUser.uid);
                // //await updateDoc(userDocRef, { roster: r });
                // await updateDoc(userDocRef, { ...userDataObj, roster: r });
            }

            setSelectedPerso({
                "idperso": "",
                "name": "",
                "classe": "",
                "ilevel": 0,
                "bloodstones": 0,
                "trackBloodstones": false,
            });
        }
    }

    const addPerso = () => {
        if (selectedPerso.idperso == "") {
            selectedPerso.idperso = currentUser.uid + '_' + (roster.persos.length + 1);

            const r = {
                ...roster,
                persos: [...roster.persos, selectedPerso]
            }

            setRoster(r);

            if (currentUser && userDataObj) {
                setUserDataObj(prevUserDataObj => ({ ...prevUserDataObj, roster: r }));

                updateFirebase(r);
            }

            setSelectedPerso({
                "idperso": "",
                "name": "",
                "classe": "",
                "ilevel": 0,
                "bloodstones": 0,
                "trackBloodstones": false,
            });
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            <div className="grid grid-cols-3 grid-rows-3 h-full min-w-[60vw] max-w-[1200px]">
                <div className='border-l border-r border-b border-[#2e3643] p-2'>
                    <div className='h-full flex flex-row justify-around items-center gap-2'>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-400'>Roster</h1>
                            <h2 onClick={() => setRoster(prevRoster => ({ ...prevRoster, ilevel: prevRoster?.ilevel + 1 }))} className='text-xl font-bold text-gray-500 cursor-pointer'>{userDataObj?.roster?.ilevel} ILevel</h2>
                            <h2 className='text-xl font-bold text-gray-500'>{roster?.persos.length} Character's</h2>
                        </div>
                        <img src='/images/expedition_symbol_01_16.webp' alt='Expedition Symbol' className='w-[96px] h-[96px]' />
                    </div>
                </div>
                <div className='col-span-2 border-r border-b border-[#2e3643] overflow-y-scroll overflow-x-hidden'>
                    <div className='flex flex-wrap p-1'>
                        {roster?.persos.map((perso, index) => (
                            <div key={index} onClick={() => setSelectedPerso(perso)} className='w-1/3 p-1'>
                                <div className={'flex flex-row justify-between items-center gap-1 border border-[#2e3643] bg-[#262d39] hover:bg-[#363e4b] rounded-lg cursor-pointer p-1 ' + (selectedPerso.idperso === perso.idperso ? ' text-blue-600 border-blue-600 ' : ' text-gray-500 ')}>
                                    <div>
                                        <h2 className='font-bold'>
                                            <span dangerouslySetInnerHTML={{ __html: perso.icon }} /> {perso.name}
                                        </h2>
                                        <p className='text-xs text-gray-400'>Level: {perso.ilevel}</p>
                                        <p className='text-xs text-gray-400'>Class: {perso.classe}</p>
                                    </div>
                                    {classes.find(classe => classe.name === perso.classe)?.logo && (
                                        <img src={classes.find(classe => classe.name === perso.classe)?.logo} alt="Icon" className='w-12 h-12' />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='row-span-2 border-l border-r border-[#2e3643] p-2'>
                    <div className='h-full flex flex-col align-center justify-center'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="roster_perso_name_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedPerso?.name}
                                onChange={e => setSelectedPerso(prevSelectedPerso => ({ ...prevSelectedPerso, name: e.target.value }))}
                            />
                            <label htmlFor="roster_perso_name_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input 
                                type="number"
                                id="roster_perso_ilevel_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedPerso?.ilevel}
                                onChange={e => setSelectedPerso(prevSelectedPerso => ({ ...prevSelectedPerso, ilevel: parseInt(e.target.value) }))}
                            />
                            <label htmlFor="roster_perso_ilevel_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ILevel</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                list="classes"
                                id="roster_perso_class_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedPerso?.classe}
                                onChange={e => setSelectedPerso(prevSelectedPerso => ({ ...prevSelectedPerso, classe: e.target.value }))}
                            />
                            <datalist id="classes">
                                {classes.map((classe, index) => (
                                    <option key={index} value={classe?.name} />
                                ))}
                            </datalist>
                            <label htmlFor="roster_perso_class_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Class</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-400 checked:bg-blue-800 checked:border-blue-800"
                                        id="roster_perso_trackbloodstone_input"
                                        checked={selectedPerso?.trackBloodstones || ""}
                                        onChange={e => setSelectedPerso(prevSelectedPerso => ({ ...prevSelectedPerso, trackBloodstones: e.target.checked }))}
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label htmlFor="roster_perso_trackbloodstone_input" className="ml-2 text-sm cursor-pointer text-gray-500 dark:text-gray-400 ">Track Bloodstones</label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-400 checked:bg-blue-800 checked:border-blue-800"
                                        id="roster_perso_goldearner_input"
                                        checked={selectedPerso?.goldEarner || ""}
                                        onChange={e => setSelectedPerso(prevSelectedPerso => ({ ...prevSelectedPerso, goldEarner: e.target.checked }))}
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label htmlFor="roster_perso_goldearner_input" className="ml-2 text-sm cursor-pointer text-gray-500 dark:text-gray-400 ">Gold Earner</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            {
                                selectedPerso.idperso != "" && (
                                    <button onClick={() => setSelectedPerso({
                                        "idperso": "",
                                        "name": "",
                                        "classe": "",
                                        "ilevel": 0,
                                        "bloodstones": 0,
                                        "trackBloodstones": false,
                                    })} id="roster_perso_cancel" type="button" className="text-gray-400 hover:text-white border border-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-times"></i> Clear Data</button>
                                )
                            }
                            {
                                selectedPerso.idperso != "" && (
                                    <button onClick={() => deletePerso()} id="roster_perso_delete" type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Delete Character</button>
                                )
                            }
                            {
                                selectedPerso.idperso == "" && (
                                    <button onClick={() => addPerso()} id="roster_perso_validate" type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Valider</button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='row-span-2 col-span-2 border-r border-[#2e3643] p-2'>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    )
}
