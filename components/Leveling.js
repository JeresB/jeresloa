'use client'

import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { leveling_structure } from '@/utils';
import { Comfortaa } from 'next/font/google';
import toast from 'react-hot-toast';

const ComfortaaSans = Comfortaa({ subsets: ["latin"] });

export default function Leveling() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, userLevelingObj, setUserLevelingObj, loading } = useAuth();

    const [start, setStart] = useState(false);
    const [count, setCount] = useState(0);
    const [time, setTime] = useState("00:00:00");

    //console.log("Leveling.js");

    useEffect(() => {
        //console.log(userLevelingObj);

        if (userLevelingObj && currentUser) {
            const today = new Date().toISOString().split('T')[0];
            if (userLevelingObj.user.daily_status.date_last_reset !== today) {
                let updatedExperiencePoints = userLevelingObj.user.experience_points;

                const updatedCategories = userLevelingObj.categories.map(category => {
                    const updatedLevels = category.levels.map(level => {
                        const updatedSubLevels = level.sub_levels.map(sub_level => {
                            if (level.xp_requis < updatedExperiencePoints && !sub_level.completed) {
                                updatedExperiencePoints -= sub_level.gain_xp;
                            }
                            return { ...sub_level, completed: false };
                        });
                        return { ...level, sub_levels: updatedSubLevels };
                    });
                    return { ...category, levels: updatedLevels };
                });

                setUserLevelingObj(prevState => ({
                    ...prevState,
                    categories: updatedCategories,
                    user: {
                        ...prevState.user,
                        experience_points: updatedExperiencePoints < 0 ? 0 : updatedExperiencePoints,
                        daily_status: {
                            ...prevState.user.daily_status,
                            date_last_reset: today
                        }
                    }
                }));
            }

            // if (JSON.stringify(userLevelingObj.categories) !== JSON.stringify(leveling_structure.categories)) {
            //     setUserLevelingObj(prevState => ({
            //         ...prevState,
            //         categories: leveling_structure.categories
            //     }));
            // }
        }
    }, [userLevelingObj, currentUser]);

    useEffect(() => {
        console.log(userLevelingObj);

        if (userLevelingObj && currentUser) {
            const levelingDocRef = doc(db, 'users', currentUser.uid, 'leveling', 'data');
            setDoc(levelingDocRef, userLevelingObj, { merge: true })
                .then(() => {
                    toast.success('Leveling saved successfully', {
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
                    toast.error('Failed to update userLevelingObj');
                });
        }
    }, [userLevelingObj, currentUser]);

    // -----------------------------------------------------------------------------------
    // --- CHRONO ------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    var initTime = new Date();

    const showTimer = (ms) => {
        // const milliseconds = Math.floor((ms % 1000) / 10)
        //     .toString()
        //     .padStart(2, "0");
        const second = Math.floor((ms / 1000) % 60)
            .toString()
            .padStart(2, "0");
        const minute = Math.floor((ms / 1000 / 60) % 60)
            .toString()
            .padStart(2, "0");
        const hour = Math.floor(ms / 1000 / 60 / 60)
            .toString()
            .padStart(2, "0");

        setTime(
            hour + ":" + minute + ":" + second
            // + ":" + milliseconds
        );
    };

    const clearTime = () => {
        setTime("00:00:00");
        setCount(0);
    };

    useEffect(() => {
        if (!start) {
            return;
        }
        var id = setInterval(() => {
            var left = count + (new Date() - initTime);
            setCount(left);
            showTimer(left);
            if (left <= 0) {
                setTime("00:00:00");
                clearInterval(id);
            }
        }, 1);
        return () => clearInterval(id);
    }, [start]);
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------

    const getColorFromXP = (xp) => {
        return xp < 4800 ? '#ffffff' :
            xp < 9600 ? '#8df901' :
                xp < 19200 ? '#00b0fa' :
                    xp < 28800 ? '#ba00f9' :
                        xp < 43200 ? '#f99200' :
                            xp < 57600 ? '#fa5d00' :
                                xp < 76800 ? '#ddc29d' : '#3cf2e6';
    }

    if (!currentUser || loading) return null;

    return (
        <div className={ComfortaaSans.className}>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <h2 className="text-xl text-center font-bold mb-2">Leveling</h2>

            <div className="flex flex-col items-center mb-2 p-2 border rounded-lg text-gray-300 bg-gray-800 border-gray-700">
                <div className="flex flex-row justify-between w-full items-center">
                    <div>
                        <h3 className="text-md font-bold" style={{ color: getColorFromXP(userLevelingObj.user.experience_points) }}>Rank: {
                            userLevelingObj.user.experience_points < 4800 ? 'E' :
                                userLevelingObj.user.experience_points < 9600 ? 'D' :
                                    userLevelingObj.user.experience_points < 19200 ? 'C' :
                                        userLevelingObj.user.experience_points < 28800 ? 'B' :
                                            userLevelingObj.user.experience_points < 43200 ? 'A' :
                                                userLevelingObj.user.experience_points < 57600 ? 'S' :
                                                    userLevelingObj.user.experience_points < 76800 ? 'SS' : 'SSS'
                        }</h3>
                        <h3 className="text-md font-bold">Level: {Math.floor((userLevelingObj.user.experience_points * 100) / 76800)}</h3>
                        <h3 className="text-md font-bold">XP: {userLevelingObj.user.experience_points}/{((Math.ceil((userLevelingObj.user.experience_points * 100) / 76800) * 76800) / 100)}</h3>
                    </div>
                    <div>
                        <i className="fas fa-dumbbell text-3xl"></i>
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{
                        width: `${userLevelingObj.user.experience_points < 4800 ? (userLevelingObj.user.experience_points / 4800) * 100 :
                            userLevelingObj.user.experience_points < 9600 ? ((userLevelingObj.user.experience_points - 4800) / 4800) * 100 :
                                userLevelingObj.user.experience_points < 19200 ? ((userLevelingObj.user.experience_points - 9600) / 9600) * 100 :
                                    userLevelingObj.user.experience_points < 28800 ? ((userLevelingObj.user.experience_points - 19200) / 9600) * 100 :
                                        userLevelingObj.user.experience_points < 43200 ? ((userLevelingObj.user.experience_points - 28800) / 14400) * 100 :
                                            userLevelingObj.user.experience_points < 57600 ? ((userLevelingObj.user.experience_points - 43200) / 14400) * 100 :
                                                userLevelingObj.user.experience_points < 76800 ? ((userLevelingObj.user.experience_points - 57600) / 19200) * 100 : 100
                            }%`
                    }}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{
                        width: `${(Math.round(((userLevelingObj.user.experience_points - ((Math.floor((userLevelingObj.user.experience_points * 100) / 76800) * 76800) / 100)) * 100) / (((Math.ceil((userLevelingObj.user.experience_points * 100) / 76800) * 76800) / 100) - ((Math.floor((userLevelingObj.user.experience_points * 100) / 76800) * 76800) / 100))))
                            }%`
                    }}></div>
                </div>
            </div>

            <div className="flex flex-col items-center mb-2 p-2 border rounded-lg text-gray-300 bg-gray-800 border-gray-700 mt-2">
                <div className="flex flex-row justify-between w-full items-center">
                    <h2 className="text-md font-bold">Chrono</h2>
                    <div className='flex flex-row flex-nowrap gap-2'>
                        <i 
                            className="fas fa-stopwatch text-xl cursor-pointer hover:text-blue-500"
                            onClick={() => setStart(!start)}
                        ></i>
                        <i 
                            className="fas fa-redo text-xl cursor-pointer hover:text-blue-500" 
                            onClick={clearTime}
                        ></i>
                    </div>
                </div>
                <div className="w-full mt-2">
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div>{time}</div>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                {userLevelingObj?.categories?.map((category, index) => {
                    let level = category.levels.find(level =>
                        level.sub_levels.some(sub_level => !sub_level.completed)
                    );

                    if (!level) {
                        level = category.levels[category.levels.length - 1];
                    }

                    const firstIncompleteSubLevel = level?.sub_levels?.find(sub_level => !sub_level.completed);

                    if (level) {
                        const handleClick = () => {
                            setStart(false);

                            let gainedXP = 0;

                            const updatedCategories = userLevelingObj.categories.map((cat, catIndex) => {
                                if (catIndex === index) {
                                    const updatedLevels = cat.levels.map(lvl => {
                                        if (lvl === level) {
                                            const updatedSubLevels = lvl.sub_levels.map(sub_lvl => {
                                                if (sub_lvl === firstIncompleteSubLevel) {
                                                    gainedXP = sub_lvl.gain_xp;
                                                    return { ...sub_lvl, completed: true };
                                                }
                                                return sub_lvl;
                                            });
                                            return { ...lvl, sub_levels: updatedSubLevels };
                                        }
                                        return lvl;
                                    });
                                    return { ...cat, levels: updatedLevels };
                                }
                                return cat;
                            });

                            const updatedStats = { ...userLevelingObj.user.stats || {} };

                            if (updatedStats[category.name]) {
                                updatedStats[category.name].done += firstIncompleteSubLevel.required_reps;
                            } else {
                                updatedStats[category.name] = { done: firstIncompleteSubLevel.required_reps, name: category.name };
                            }

                            setUserLevelingObj(prevState => ({
                                ...prevState,
                                categories: updatedCategories,
                                user: {
                                    ...prevState.user,
                                    stats: updatedStats,
                                    experience_points: prevState.user.experience_points + gainedXP
                                }
                            }));

                            clearTime();
                            //setStart(true);
                        };

                        return (
                            <div key={index} onClick={handleClick} className="w-full items-center p-2 border rounded-lg cursor-pointer text-gray-300 bg-gray-800 hover:text-gray-200 hover:bg-gray-700 border-gray-700">
                                <div className='flex flex-row justify-between mb-1 gap-6'>
                                    <h2 style={{ color: level.color }}>{level.type} ⋅ {level.rank}</h2>
                                    <h2 className='' style={{ color: level.color }}>{firstIncompleteSubLevel ? '+' + firstIncompleteSubLevel?.required_reps : 'Done'}</h2>
                                </div>

                                <div className='flex flex-row flex-nowrap gap-2'>

                                    {level.sub_levels.map((sub_level, subindex) => (
                                        <div key={subindex} className="grow h-[5px] rounded-lg" style={{ backgroundColor: sub_level.completed ? level.color : "#1e232d" }}></div>
                                    ))}

                                </div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>

            <div className="flex flex-col items-center mb-2 p-2 border rounded-lg text-gray-300 bg-gray-800 border-gray-700 mt-2">
                <div className="flex flex-row justify-between w-full items-center">
                    <h2 className="text-md font-bold">Statistics</h2>
                    <i className="fas fa-chart-bar text-3xl"></i>
                </div>
                <div className="w-full mt-2">
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    {Object.entries(userLevelingObj.user.stats || {}).map(([key, value], index) => (
                        <div key={index} className="flex flex-row justify-between w-full items-center">
                            <span>{value.name}</span>
                            <span>{value.done}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
