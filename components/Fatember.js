'use client'

import { useAuth } from '@/context/AuthContext'
import { demo_perso, getLastWednesday } from '@/utils'
import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import toast from 'react-hot-toast'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Comfortaa } from 'next/font/google'

const ComfortaaSans = Comfortaa({ subsets: ["latin"] });

export default function Fatember() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, loading } = useAuth();
    const [fateEmberDrawerOpen, setFateEmberDrawerOpen] = useState(false);
    const [fateEmberSelectedPerso, setFateEmberSelectedPerso] = useState(null);
    const [fateEmberSelectedOption, setFateEmberSelectedOption] = useState(null);

    const handleClickOutsideFE = (event) => {
        if (fateEmberDrawerOpen && !event.target.closest('#fate-ember-drawer')) {
            setFateEmberDrawerOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideFE)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideFE)
        };
    }, [fateEmberDrawerOpen])

    // Setter Selected Perso
    const handleSelectionPersoClick = (val) => {
        setFateEmberSelectedPerso(val)
        handleAddFateEmber(val, fateEmberSelectedOption)
    }

    // Setter Selected Option
    const handleSelectionOptionClick = (val) => {
        setFateEmberSelectedOption(val)
        handleAddFateEmber(fateEmberSelectedPerso, val)
    }

    // Event outside click fate ember drawer -----------------------------------------
    const handleFateEmberDrawerClick = () => {
        setFateEmberDrawerOpen(!fateEmberDrawerOpen)
    }
    // --------------------------------------------------------------------------------

    const nbBeforeThisWeek = userDataObj?.fate_embers?.filter(fe => new Date(fe.date) < getLastWednesday()).length;
    const nbThisWeek = userDataObj?.fate_embers?.filter(fe => new Date(fe.date) >= getLastWednesday()).length;

    const handleAddFateEmber = (perso, fe) => {
        try {
            const newData = { ...userDataObj };

            if (perso && fe) {
                if (!newData?.fate_embers) {
                    newData.fate_embers = [];
                }

                const newFe = {
                    perso: perso,
                    type: fe,
                    date: new Date().toISOString()
                }

                newData.fate_embers.push(newFe);

                const feOptions = commonDataObj.fate_ember_options.find(option => option.idfateember === fe);

                if (feOptions && feOptions.type === 'Golds') {
                    const montant = feOptions.value || 0;
                    const newGolds = (userDataObj.golds.currentGolds || 0) + montant;

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
                                    type: 'Fate Ember',
                                    description: feOptions.name,
                                    categorie: montant > 0 ? 'positif' : 'negatif',
                                    perso: perso,
                                    montant: montant,
                                    date: new Date().toISOString()
                                }
                            ]
                        }
                    };

                    newData.golds = updatedUserData.golds;
                }

                // update the global state
                setUserDataObj(newData);

                const perso_data = userDataObj?.roster?.persos.find(p => p.name === perso);
                const fe_data = commonDataObj?.fate_ember_options.find(e => e.idfateember === fe);

                // update firebase
                const userDocRef = doc(db, 'users', currentUser.uid);
                setDoc(userDocRef, newData)
                    .then(() => {
                        toast.success(`Fate Ember ${fe_data.name} ajouté pour ${perso_data.name}`, {
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
                        console.error('Error adding fate ember: ', error);
                        toast.error('Failed to add fate ember');
                    });

                setFateEmberSelectedPerso(null);
                setFateEmberSelectedOption(null);

                document.querySelectorAll('input[name="fateemberperso"]').forEach(input => {
                    input.checked = false;
                });

                document.querySelectorAll('input[name="fateembertype"]').forEach(input => {
                    input.checked = false;
                });

                setFateEmberDrawerOpen(!fateEmberDrawerOpen);

                updateFateEmbers('refresh', null);
            }
        } catch (err) {
            console.log('Failed to set data: ', err.message);
        }
    }

    if (!currentUser || loading) return null;

    return (
        <div>
            <button onClick={handleFateEmberDrawerClick} className={"w-full inline-flex gap-6 items-center justify-between p-2 border rounded-lg cursor-pointer text-gray-300 bg-gray-800 hover:text-gray-200 hover:bg-gray-700 border-gray-700 " + ComfortaaSans.className}>
                <div className="block min-w-[120px]">
                    <div className="w-full text-left">{userDataObj?.fate_embers?.length.toLocaleString('fr-FR')}</div>
                    <div className="w-full text-left text-gray-400">+{nbThisWeek?.toLocaleString('fr-FR')}</div>
                </div>
                <img className="w-[32px]" src="images/use_11_221.webp" />
            </button>

            <div id="fate-ember-drawer" className={'fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-[20vw] dark:bg-gray-800 ' + ComfortaaSans.className + (!fateEmberDrawerOpen ? ' -translate-x-full ' : '')} tabIndex="-1" aria-labelledby="drawer-label">
                <div className='flex flex-col gap-4'>
                    <div className='text-lg'>Ajout Fate Ember</div>

                    <button type="button" onClick={handleFateEmberDrawerClick} data-drawer-hide="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>

                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                    <ul className="flex flex-row flex-wrap gap-2">
                        {userDataObj?.roster?.persos?.map((perso, index) => {
                            if (perso.track_fate_ember) {
                                return (
                                    <li className="h-full" style={{ flex: '1 1 180px' }} key={index} onChange={() => handleSelectionPersoClick(perso.name)}>
                                        <input type="radio" id={"fateemberperso-" + perso.idperso} name="fateemberperso" value={perso.name} className="hidden peer js-fate-ember" required="" />
                                        <label htmlFor={"fateemberperso-" + perso.idperso} className="inline-flex items-center justify-between h-full w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                            <div className="block">
                                                <div className="w-full text-md font-semibold">{perso.name}</div>
                                                <div className="w-full text-xs">{perso.classe} - {perso.ilevel}</div>
                                            </div>
                                            <img className="" style={{ width: '36px' }} src={perso.logo} />
                                        </label>
                                    </li>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </ul>

                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                    <ul className="flex flex-row flex-wrap gap-2">
                        {commonDataObj?.fate_ember_options?.map((fe, index) => {
                            return (
                                <li className="h-full" style={{ flex: '1 1 150px' }} key={index} onChange={() => handleSelectionOptionClick(fe.idfateember)}>
                                    <input type="radio" id={"fateembertype-" + fe.idfateember} name="fateembertype" value={fe.idfateember} className="hidden peer js-fate-ember" required="" />
                                    <label htmlFor={"fateembertype-" + fe.idfateember} className="inline-flex items-center justify-between h-full w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="block">
                                            <div className="w-full text-md font-semibold">{fe.short_name}</div>
                                            <div className="w-full text-xs">{fe.type}</div>
                                        </div>
                                        <img className="" style={{ width: '36px' }} src={fe.logo} />
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}