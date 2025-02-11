'use client'

import { auth, db } from '@/firebase'
import { getCategorieByName, getLastWednesday, getNextWednesday } from '@/utils'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { format, getDay, subDays } from 'date-fns'
import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDataObj, setUserDataObj] = useState(null);
    const [commonDataObj, setCommonDataObj] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date(getLastWednesday()));
    const [endDate, setEndDate] = useState(new Date(getNextWednesday()));
    const provider = new GithubAuthProvider();

    provider.setCustomParameters({
        'allow_signup': 'false'
    });

    // AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj(null)
        setCommonDataObj(null)
        setCurrentUser(null)

        return signOut(auth)
    }

    function loginWithGithub() {
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {
                    console.log('No User Found')
                    return
                }

                console.log(user)

                // if user exists, fetch data from firestore database
                console.log('Fetching User Data')

                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseUserData = {}

                if (docSnap.exists()) {
                    console.log('Found User Data')
                    firebaseUserData = docSnap.data()
                }

                setUserDataObj(firebaseUserData)

                const commonDocRef = doc(db, 'common', 'jeresloa');
                const commonDocSnap = await getDoc(commonDocRef);

                let firebaseCommonData = {}

                if (commonDocSnap.exists()) {
                    console.log('Found Common Data');
                    firebaseCommonData = commonDocSnap.data();
                } else {
                    console.log('No Common Data Found');
                }

                setCommonDataObj(firebaseCommonData);

            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        console.log('useEffect userDataObj in AuthContext: ', userDataObj);
        let checkGoldRaid = false;

        if (currentUser && userDataObj) {
            if (!userDataObj.reset) {
                setUserDataObj({
                    ...userDataObj,
                    reset: {
                        resetHour: 11,
                        daily: "",
                        weekly: "",
                        bimensuel: "",
                        bimensueloffset: "",
                    }
                })
            } else {
                const currentDate = new Date();
                const currentDay = currentDate.toISOString().split('T')[0];
                const currentHour = currentDate.getHours();
                const currentNumberDay = getDay(new Date());

                console.log(userDataObj.reset.daily, currentDay, currentHour, userDataObj.reset.resetHour);

                if (userDataObj.reset.daily !== currentDay && currentHour >= userDataObj.reset.resetHour) {
                    resetDaily(currentDay);
                }

                if (userDataObj.reset.weekly !== currentDay && currentNumberDay === 3 && currentHour >= userDataObj.reset.resetHour) {
                    resetWeekly(currentDay);
                }

                // Reset Bi Mensuel
                const lastBiMensuelReset = new Date(userDataObj.reset.bimensuel);
                const now = new Date();

                if (userDataObj.reset.bimensuel !== currentDay && currentNumberDay === 3 && currentHour >= userDataObj.reset.resetHour && (now - lastBiMensuelReset) / (1000 * 60 * 60 * 24) > 10) {
                    resetBiMensuel(currentDay);
                    checkGoldRaid = true;
                }

                // Reset Bi Mensuel Offset (Thaemine)
                const lastBiMensuelOffsetReset = new Date(userDataObj.reset.bimensueloffset);

                if (userDataObj.reset.bimensueloffset !== currentDay && currentNumberDay === 3 && currentHour >= userDataObj.reset.resetHour && (now - lastBiMensuelOffsetReset) / (1000 * 60 * 60 * 24) > 10) {
                    resetBiMensuelOffset(currentDay);
                    checkGoldRaid = true;
                }
            }

            // Update artisanatLifeEnergy task
            if (userDataObj.tasks) {
                userDataObj.tasks.forEach(task => {
                    if (task?.artisanatLifeEnergy) {
                        const taskDateMaj = new Date(task.dateMaj);
                        const now = new Date();
                        const diffInMinutes = Math.floor((now - taskDateMaj) / (1000 * 60));
                        console.log("task: ", task);
                        console.log(`Difference in minutes: ${diffInMinutes}`);

                        if (Math.abs(diffInMinutes) >= 10) {
                            task.artisanatLifeEnergy += parseInt(Math.round((Math.abs(diffInMinutes) / 10)) * task.artisanatGainPer10Minutes)
                            task.artisanatLifeEnergy >= task.artisanatMaxLifeEnergy ? task.artisanatLifeEnergy = task.artisanatMaxLifeEnergy : null

                            task.dateMaj = new Date().toISOString()
                        }
                    }
                });

                if (checkGoldRaid) {
                    console.log('Check gold raids');
                    // Ensure only 3 tasks with gold set to true for each persos gold earner
                    if (userDataObj.roster.persos) {
                        userDataObj.roster.persos.forEach(perso => {
                            const raidTasks = userDataObj.tasks.filter(task => getCategorieByName(task.idcategorie).groupe === 'raids' && task.idperso === perso.name);

                            console.log(perso, raidTasks);

                            const sortedRaidTasks = raidTasks.sort((a, b) => {
                                const categorieA = getCategorieByName(a.idcategorie);
                                const categorieB = getCategorieByName(b.idcategorie);
                                let gainA = 0;
                                let gainB = 0;

                                if (categorieA.HM && perso.ilevel >= categorieA.HM.ilevel) {
                                    gainA = categorieA.HM.gain;
                                } else if (perso.ilevel >= categorieA.NM.ilevel) {
                                    gainA = categorieA.NM.gain;
                                }

                                if (categorieB.HM && perso.ilevel >= categorieB.HM.ilevel) {
                                    gainB = categorieB.HM.gain;
                                } else if (perso.ilevel >= categorieB.NM.ilevel) {
                                    gainB = categorieB.NM.gain;
                                }

                                return gainB - gainA;
                            });

                            let goldCount = 0;
                            sortedRaidTasks.forEach(task => {
                                const categorie = getCategorieByName(task.idcategorie);
                                console.log(task.idperso, task.idcategorie, task.gold);
                                if (categorie.name === 'Brelshaza Act. 2' || categorie.name === 'Aegir') {
                                    task.gold = true;
                                    goldCount++;
                                } else if (categorie.name === 'Thaemine' && goldCount < 3 && task.done < categorie.repet) {
                                    task.gold = true;
                                    goldCount++;
                                } else if (categorie.name === 'Echidna' && goldCount < 3) {
                                    task.gold = true;
                                    goldCount++;
                                } else {
                                    task.gold = false;
                                }
                            });

                            // Reset raid_gate_done if perso is a gold earner
                            if (perso.goldEarner) {
                                perso.raid_gate_done = 0;
                            }
                        });
                    }

                    console.log('check gold raid : ', userDataObj.tasks);
                }

                const docRef = doc(db, 'users', currentUser.uid);

                updateDoc(docRef, {
                    tasks: userDataObj.tasks,
                    'roster.persos': userDataObj.roster.persos
                }).then(() => {
                    console.log('Tasks updated successfully');
                }).catch((error) => {
                    console.error('Error updating tasks: ', error);
                });
            }

            if (!userDataObj?.golds) {
                userDataObj.golds = {
                    currentGolds: 0,
                    historiques: [],
                    incomes: []
                }
            }
        }
    }, [userDataObj])

    const resetDaily = async (currentDay) => {
        try {
            const updatedReset = {
                ...userDataObj.reset,
                daily: currentDay,
            };

            setUserDataObj({
                ...userDataObj,
                reset: updatedReset
            });

            const docRef = doc(db, 'users', currentUser.uid);

            if (userDataObj.tasks) {
                userDataObj.tasks.forEach(task => {
                    const categorie = getCategorieByName(task.idcategorie);

                    if (categorie && categorie.reset === 'daily') {
                        if (categorie.rested && categorie.maxRest) {
                            if (task.rest == "") task.rest = 0;

                            let notdone = parseInt(categorie.repet) - parseInt(task.done);
                            let newRest = parseInt(task.rest) + (notdone * (categorie.maxRest / 10));

                            if (newRest > categorie.maxRest) newRest = categorie.maxRest;
                            if (notdone > 0) task.rest = newRest;
                        }

                        task.done = 0;
                    }
                });
            }

            console.log('Resetting Daily Data');

            await updateDoc(docRef, {
                tasks: userDataObj.tasks,
                "reset": updatedReset
            });

        } catch (err) {
            console.log('Failed to reset daily: ', err.message);
        }
    }

    const resetWeekly = async (currentDay) => {
        try {
            const updatedReset = {
                ...userDataObj.reset,
                weekly: currentDay,
            };

            setUserDataObj({
                ...userDataObj,
                reset: updatedReset
            });

            const docRef = doc(db, 'users', currentUser.uid);

            if (userDataObj.tasks) {
                userDataObj.tasks.forEach(task => {
                    const categorie = getCategorieByName(task.idcategorie);

                    if (categorie && categorie.reset === 'weekly') {
                        task.done = 0;
                    }
                });
            }

            console.log('Resetting Weekly Data');

            await updateDoc(docRef, {
                tasks: userDataObj.tasks,
                "reset": updatedReset
            });

        } catch (err) {
            console.log('Failed to reset weekly: ', err.message);
        }
    }

    const resetBiMensuel = async (currentDay) => {
        try {
            const updatedReset = {
                ...userDataObj.reset,
                bimensuel: currentDay,
            };

            setUserDataObj({
                ...userDataObj,
                reset: updatedReset
            });

            const docRef = doc(db, 'users', currentUser.uid);

            if (userDataObj.tasks) {
                userDataObj.tasks.forEach(task => {
                    const categorie = getCategorieByName(task.idcategorie);

                    if (categorie && categorie.reset === 'bimensuel') {
                        task.done = 0;
                    }
                });
            }

            console.log('Resetting BiMensuel Data');

            await updateDoc(docRef, {
                tasks: userDataObj.tasks,
                "reset": updatedReset
            });

        } catch (err) {
            console.log('Failed to reset bimensuel: ', err.message);
        }
    }

    const resetBiMensuelOffset = async (currentDay) => {
        try {
            const updatedReset = {
                ...userDataObj.reset,
                bimensueloffset: currentDay,
            };

            setUserDataObj({
                ...userDataObj,
                reset: updatedReset
            });

            const docRef = doc(db, 'users', currentUser.uid);

            if (userDataObj.tasks) {
                userDataObj.tasks.forEach(task => {
                    const categorie = getCategorieByName(task.idcategorie);

                    if (categorie && categorie.reset === 'bimensuelthaemine') {
                        task.done = 0;
                    }
                });
            }

            console.log('Resetting BiMensuelOffset Data');

            await updateDoc(docRef, {
                tasks: userDataObj.tasks,
                "reset": updatedReset
            });

        } catch (err) {
            console.log('Failed to reset bimensueloffset: ', err.message);
        }
    }

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        commonDataObj,
        setCommonDataObj,
        signup,
        logout,
        login,
        loginWithGithub,
        loading,
        resetDaily,
        resetWeekly,
        resetBiMensuel,
        resetBiMensuelOffset,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}