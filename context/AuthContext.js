'use client'

import { auth, db } from '@/firebase'
import { getCategorieByName, getLastWednesday, getNextWednesday, getSecondLastWednesday, getWeekNumber, isThaemineWeek, leveling_structure } from '@/utils'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { format, getDay, subDays, getWeek } from 'date-fns'
import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDataObj, setUserDataObj] = useState(null);
    const [userLevelingObj, setUserLevelingObj] = useState(null);
    const [commonDataObj, setCommonDataObj] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(new Date(getLastWednesday()));
    const [endDate, setEndDate] = useState(new Date(getNextWednesday()));
    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    githubProvider.setCustomParameters({
        'allow_signup': 'false'
    });

    // AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setUserDataObj(null);
        setUserLevelingObj(null);
        setCommonDataObj(null);
        setCurrentUser(null);

        return signOut(auth);
    }

    function loginWithGithub() {
        return signInWithPopup(auth, githubProvider);
    }

    function loginWithGoogle() {
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set the user to our local context state
                setLoading(true);
                setCurrentUser(user);

                if (!user) {
                    console.log('No User Found');
                    return;
                }

                //console.log(user);

                // if user exists, fetch data from firestore database
                //console.log('Fetching User Data');

                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                let firebaseUserData = {}

                if (docSnap.exists()) {
                    //console.log('Found User Data');
                    firebaseUserData = docSnap.data();
                }

                setUserDataObj(firebaseUserData);
                console.log(firebaseUserData);

                const levelingDocRef = doc(db, 'users', user.uid, 'leveling', 'data');
                const levelingDocSnap = await getDoc(levelingDocRef);

                let firebaseLevelingData = {}

                if (levelingDocSnap.exists()) {
                    firebaseLevelingData = levelingDocSnap.data();
                } else {
                    console.log('No Leveling Data Found');
                    firebaseLevelingData = leveling_structure;
                }

                setUserLevelingObj(firebaseLevelingData);



                const commonDocRef = doc(db, 'common', 'jeresloa');
                const commonDocSnap = await getDoc(commonDocRef);

                let firebaseCommonData = {}

                if (commonDocSnap.exists()) {
                    //console.log('Found Common Data');
                    firebaseCommonData = commonDocSnap.data();
                } else {
                    console.log('No Common Data Found');
                }

                setCommonDataObj(firebaseCommonData);

            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        })
        return unsubscribe;
    }, [])

    useEffect(() => {
        //console.log('useEffect userDataObj in AuthContext: ', userDataObj);
        let checkGoldRaid = false;
        let updatedUserDataObj = { ...userDataObj };

        if (currentUser && userDataObj) {
            if (!userDataObj.reset) {
                const today = new Date();
                today.setDate(today.getDate() - 1);

                const bimensuel = isThaemineWeek(new Date()) ? getSecondLastWednesday().toISOString().split('T')[0] : getLastWednesday().toISOString().split('T')[0];
                const bimensueloffset = isThaemineWeek(new Date()) ? getLastWednesday().toISOString().split('T')[0] : getSecondLastWednesday().toISOString().split('T')[0];
                
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    reset: {
                        resetHour: 11,
                        daily: today.toISOString().split('T')[0],
                        weekly: getLastWednesday().toISOString().split('T')[0],
                        bimensuel: bimensuel,
                        bimensueloffset: bimensueloffset,
                    }
                };
            }

            if (!userDataObj?.golds) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    golds: {
                        currentGolds: 0,
                        historiques: [],
                        incomes: []
                    }
                };
            }

            if (!userDataObj?.fate_embers) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    fate_embers: []
                };
            }

            if (!userDataObj?.roster) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    roster: {
                        ilevel: 1,
                        persos: []
                    }
                };
            }

            if (!userDataObj?.tasks) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    tasks: []
                };
            }

            const currentDate = new Date();
            const currentDay = currentDate.toISOString().split('T')[0];
            const currentHour = currentDate.getHours();
            const currentNumberDay = getDay(new Date());

            if (updatedUserDataObj.reset.daily !== currentDay && currentHour >= updatedUserDataObj.reset.resetHour) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    reset: {
                        ...updatedUserDataObj.reset,
                        daily: currentDay
                    }
                };

                if (updatedUserDataObj.tasks) {
                    updatedUserDataObj.tasks.forEach(task => {
                        const categorie = getCategorieByName(task.idcategorie);

                        if (categorie && categorie.reset === 'daily') {
                            if (categorie.rested && categorie.maxRest) {

                                if (task.rest === "") task.rest = 0;

                                let notdone = parseInt(categorie.repet) - parseInt(task.done);
                                let newRest = parseInt(task.rest) + (notdone * (categorie.maxRest / 10));

                                if (newRest > categorie.maxRest) newRest = categorie.maxRest;
                                if (notdone > 0) task.rest = newRest;
                            }

                            task.done = 0;
                        }
                    });
                }
            }

            if (updatedUserDataObj.reset.weekly !== currentDay && currentNumberDay === 3 && currentHour >= updatedUserDataObj.reset.resetHour) {
                // if (updatedUserDataObj.reset.weekly !== currentDay && currentHour >= updatedUserDataObj.reset.resetHour) {
                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    reset: {
                        ...updatedUserDataObj.reset,
                        weekly: currentDay
                    }
                };

                if (updatedUserDataObj.tasks) {
                    updatedUserDataObj.tasks.forEach(task => {
                        const categorie = getCategorieByName(task.idcategorie);

                        if (categorie && categorie.reset === 'weekly') {
                            task.done = 0;
                        }
                    });
                }

                if (updatedUserDataObj?.roster?.persos) {
                    updatedUserDataObj.roster.persos.forEach(perso => {
                        if (perso?.trackBloodstones) {
                            perso.bloodstones = 0;
                        }
                    });
                }
            }

            // Reset Bi Mensuel
            const lastBiMensuelReset = new Date(userDataObj?.reset?.bimensuel);
            const now = new Date();

            if (userDataObj?.reset?.bimensuel !== currentDay && currentNumberDay === 3 && currentHour >= userDataObj?.reset?.resetHour && (now - lastBiMensuelReset) / (1000 * 60 * 60 * 24) > 10) {
                // if (userDataObj?.reset?.bimensuel !== currentDay && currentHour >= userDataObj?.reset?.resetHour && (now - lastBiMensuelReset) / (1000 * 60 * 60 * 24) > 10) {
                checkGoldRaid = true;

                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    reset: {
                        ...updatedUserDataObj.reset,
                        bimensuel: currentDay
                    }
                };

                if (updatedUserDataObj.tasks) {
                    updatedUserDataObj.tasks.forEach(task => {
                        const categorie = getCategorieByName(task.idcategorie);

                        if (categorie && categorie.reset === 'bimensuel') {
                            task.done = 0;
                        }
                    });
                }
            }

            // Reset Bi Mensuel Offset (Thaemine)
            const lastBiMensuelOffsetReset = new Date(userDataObj?.reset?.bimensueloffset);

            if (userDataObj?.reset?.bimensueloffset !== currentDay && currentNumberDay === 3 && currentHour >= userDataObj?.reset?.resetHour && (now - lastBiMensuelOffsetReset) / (1000 * 60 * 60 * 24) > 10) {
                // if (userDataObj?.reset?.bimensueloffset !== currentDay && currentHour >= userDataObj?.reset?.resetHour && (now - lastBiMensuelOffsetReset) / (1000 * 60 * 60 * 24) > 10) {
                checkGoldRaid = true;

                updatedUserDataObj = {
                    ...updatedUserDataObj,
                    reset: {
                        ...updatedUserDataObj.reset,
                        bimensueloffset: currentDay
                    }
                };

                if (updatedUserDataObj.tasks) {
                    updatedUserDataObj.tasks.forEach(task => {
                        const categorie = getCategorieByName(task.idcategorie);

                        if (categorie && categorie.reset === 'bimensuelthaemine') {
                            task.done = 0;
                        }
                    });
                }
            }

            updatedUserDataObj?.tasks?.forEach(task => {
                if (task?.artisanatLifeEnergy) {
                    const taskDateMaj = new Date(task.dateMaj);
                    const now = new Date();
                    const diffInMinutes = Math.floor((now - taskDateMaj) / (1000 * 60));

                    if (Math.abs(diffInMinutes) >= 10) {
                        task.artisanatLifeEnergy += parseInt(Math.round((Math.abs(diffInMinutes) / 10)) * task.artisanatGainPer10Minutes)
                        task.artisanatLifeEnergy >= task.artisanatMaxLifeEnergy ? task.artisanatLifeEnergy = task.artisanatMaxLifeEnergy : null

                        task.dateMaj = new Date().toISOString()
                    }
                }
            });

            if (userDataObj?.roster?.persos) {
                userDataObj.roster.persos.forEach(perso => {
                    if (checkGoldRaid) {
                        // updatedUserDataObj.tasks.forEach(task => {
                        //     if (task.idcategorie === 'Echidna' && task.idperso === perso.name) {
                        //         const thaemineTask = updatedUserDataObj.tasks.find(t => t.idcategorie === 'Thaemine' && t.idperso === perso.name);
                        //         if (thaemineTask && thaemineTask.done >= getCategorieByName(thaemineTask.idcategorie).repet) {
                        //             task.gold = true;
                        //         } else {
                        //             task.gold = false;
                        //         }
                        //     }
                        //     if (task.idcategorie === 'Thaemine' && task.idperso === perso.name) {
                        //         if (task.done < getCategorieByName(task.idcategorie).repet) {
                        //             task.gold = true;
                        //         } else {
                        //             task.gold = false;
                        //         }
                        //     }
                        // });

                        // Reset raidgatedone if perso is a gold earner
                        if (perso.goldEarner) {
                            perso.raidgatedone = 0;
                        }
                    }
                });
            }

            if (JSON.stringify(updatedUserDataObj) !== JSON.stringify(userDataObj)) {
                setUserDataObj(updatedUserDataObj);

                const userDocRef = doc(db, 'users', currentUser.uid);
                setDoc(userDocRef, updatedUserDataObj, { merge: true })
                    .then(() => {
                        console.log("Reset OK");
                    })
                    .catch((error) => {
                        console.error('Error reset: ', error);
                    });
            }
        }
    }, [userDataObj])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        commonDataObj,
        setCommonDataObj,
        userLevelingObj,
        setUserLevelingObj,
        signup,
        logout,
        login,
        loginWithGithub,
        loginWithGoogle,
        loading,
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
