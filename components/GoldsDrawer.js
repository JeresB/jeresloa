'use client'

import { useAuth } from '@/context/AuthContext'
import { demo_perso, getLastWednesday, gold_types } from '@/utils'
import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import toast from 'react-hot-toast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Comfortaa } from 'next/font/google'

const ComfortaaSans = Comfortaa({ subsets: ["latin"] });

export default function GoldsDrawer() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, loading } = useAuth();
    const [goldsDrawerOpen, setGoldsDrawerOpen] = useState(false);
    const [update, setUpdate] = useState('');
    const [cost, setCost] = useState('');
    const [before, setBefore] = useState('');
    const [after, setAfter] = useState('');
    const [income, setIncome] = useState({
        'type': '',
        'description': '',
        'categorie': '',
        'perso': '',
        'montant': '',
        'date': ''
    });

    const handleClickOutsideGD = (event) => {
        if (goldsDrawerOpen && !event.target.closest('#golds-drawer')) {
            setGoldsDrawerOpen(false);
            setIncome({
                'type': '',
                'description': '',
                'categorie': '',
                'perso': '',
                'montant': '',
                'date': ''
            });
            setUpdate('');
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideGD);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideGD);
        };

    }, [goldsDrawerOpen]);

    const addIncome = () => {
        if (income.type && (cost || after )) {
            let montant = 0;
            
            if (cost) {
                montant = parseInt(cost);
            } else if (before && after ) {
                montant = parseInt(after) - parseInt(before);
            } else if (after) {
                montant = parseInt(after) - parseInt(userDataObj.golds.currentGolds);
            }

            const newIncome = {
                ...income,
                montant: montant,
                categorie: montant > 0 ? 'positif' : 'negatif',
                date: new Date().toISOString(),
                perso: income.perso || 'Roster'
            };

            const updatedUserData = {
                ...userDataObj,
                golds: {
                    ...userDataObj.golds,
                    currentGolds: userDataObj.golds.currentGolds + parseInt(montant),
                    historiques: [
                        ...userDataObj.golds.historiques,
                        {
                            date: new Date().toISOString(),
                            gold: userDataObj.golds.currentGolds + parseInt(montant)
                        }
                    ],
                    incomes: [
                        ...userDataObj.golds.incomes,
                        newIncome
                    ]
                }
            };

            setUserDataObj(updatedUserData);

            setIncome({
                'type': '',
                'description': '',
                'categorie': '',
                'perso': '',
                'montant': '',
                'date': ''
            });

            setCost('');
            setBefore('');
            setAfter('');

            setGoldsDrawerOpen(false);

            const userDocRef = doc(db, 'users', currentUser.uid);
            setDoc(userDocRef, updatedUserData, { merge: true })
                .then(() => {
                    toast.success(`${income.type} (${montant}) income added successfully for ${newIncome.perso}`, {
                        position: 'top-right',
                        duration: 3000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                })
                .catch((error) => {
                    console.error('Error adding income: ', error);
                    toast.error('Failed to add income');
                });
        } else {
            toast.error('Please fill in the required fields');
        }
    }
    
    const updateGold = () => {
        if (update) {
            const montant = parseInt(update) - parseInt(userDataObj.golds.currentGolds);
            const newGolds = parseInt(update);
            
            const updatedUserData = {
                ...userDataObj,
                golds: {
                    ...userDataObj.golds,
                    currentGolds: newGolds,
                    historiques: [
                        ...userDataObj.golds.historiques,
                        {
                            date: new Date().toISOString(),
                            gold: newGolds
                        }
                    ],
                    incomes: [
                        ...userDataObj.golds.incomes,
                        {
                            type: 'Update',
                            description: '',
                            categorie: montant > 0 ? 'positif' : 'negatif',
                            perso: 'Roster',
                            montant: montant,
                            date: new Date().toISOString()
                        }
                    ]
                }
            };

            setUserDataObj(updatedUserData);

            setUpdate('');
            setGoldsDrawerOpen(false);

            const userDocRef = doc(db, 'users', currentUser.uid);
            setDoc(userDocRef, updatedUserData, { merge: true })
                .then(() => {
                    toast.success(`Golds updated successfully`, {
                        position: 'top-right',
                        duration: 3000,
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                })
                .catch((error) => {
                    console.error('Error updating golds: ', error);
                    toast.error('Failed to update golds');
                });
        }
    }

    const handleGoldsDrawerClick = () => {
        setGoldsDrawerOpen(!goldsDrawerOpen);
    }

    if (!currentUser || loading) return null;

    return (
        <div>
            <button onClick={handleGoldsDrawerClick} className="w-full inline-flex gap-6 items-center justify-between p-2 border rounded-lg cursor-pointer text-gray-300 bg-gray-800 hover:text-gray-200 hover:bg-gray-700 border-gray-700">
                <div className={"block min-w-[120px] " + ComfortaaSans.className}>
                    <div className="w-full text-left">{userDataObj.golds.currentGolds.toLocaleString('fr-FR')}</div>
                </div>
                <img className="w-[32px]" src="images/money_4.webp" />
            </button>

            <div id="golds-drawer" className={'fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-[20vw] dark:bg-gray-800 ' + ComfortaaSans.className + (!goldsDrawerOpen ? ' -translate-x-full ' : '')} tabIndex="-1" aria-labelledby="drawer-label">
                <div className='flex flex-col gap-4'>
                    <div className='text-lg'>Formulaire Golds</div>

                    <button type="button" onClick={handleGoldsDrawerClick} data-drawer-hide="golds-drawer" aria-controls="golds-drawer" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>

                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className='h-full flex flex-col align-center justify-center'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                list="list-golds-types"
                                id="goldsdrawer_type_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={income?.type}
                                onChange={e => setIncome(prevIncome => ({ ...prevIncome, type: e.target.value }))}
                            />
                            <label htmlFor="goldsdrawer_type_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
                        </div>
                    </div>

                    <div className='h-full flex flex-col align-center justify-center'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="goldsdrawer_desc_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={income?.description}
                                onChange={e => setIncome(prevIncome => ({ ...prevIncome, description: e.target.value }))}
                            />
                            <label htmlFor="goldsdrawer_desc_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description (optional)</label>
                        </div>
                    </div>

                    <div className='h-full flex flex-col align-center justify-center'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                list="list-persos"
                                id="goldsdrawer_perso_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={income?.perso}
                                onChange={e => setIncome(prevIncome => ({ ...prevIncome, perso: e.target.value }))}
                            />
                            <label htmlFor="goldsdrawer_perso_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Perso (optional)</label>
                        </div>
                    </div>

                    <div className='h-full flex flex-row align-center justify-center gap-4'>
                        <div className="relative z-0 w-full mb-2 group">
                            <input
                                type="text"
                                id="goldsdrawer_cost_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                            />
                            <label htmlFor="goldsdrawer_cost_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sum</label>
                        </div>

                        <div className="relative z-0 w-full mb-2 group">
                            <input
                                type="text"
                                id="goldsdrawer_before_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={before}
                                onChange={e => setBefore(e.target.value)}
                            />
                            <label htmlFor="goldsdrawer_before_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Before</label>
                        </div>

                        <div className="relative z-0 w-full mb-2 group">
                            <input
                                type="text"
                                id="goldsdrawer_after_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={after}
                                onChange={e => setAfter(e.target.value)}
                            />
                            <label htmlFor="goldsdrawer_after_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">After</label>
                        </div>
                    </div>

                    <div className='text-gray-400'>
                        3 options:
                        <br />
                        <ul className='list-disc px-6'>
                            <li>Sum of the income</li>
                            <li>Golds before and after the income</li>
                            <li>Golds after the income</li>
                        </ul>
                    </div>

                    <button onClick={() => addIncome()} id="goldsdrawer_add" type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Add</button>

                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                    <div className="relative z-0 w-full mb-2 group">
                        <input
                            type="number"
                            id="goldsdrawer_update_input"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={update}
                            onChange={e => setUpdate(e.target.value)}
                        />
                        <label htmlFor="goldsdrawer_update_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Update</label>
                    </div>

                    <button onClick={() => updateGold()} id="goldsdrawer_update" type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Update</button>

                    <datalist id="list-golds-types">
                        {gold_types.sort((a, b) => a.name.localeCompare(b.name)).map((type, index) => (
                            <option key={index} value={type?.name} />
                        ))}
                    </datalist>

                    <datalist id="list-persos">
                        {userDataObj?.roster?.persos?.map((perso, index) => (
                            <option key={index} value={perso?.name} label={perso?.classe + ' ' + perso?.ilevel} />
                        ))}
                    </datalist>
                </div>
            </div>
        </div>
    )
}