'use client'

import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import { categories } from '@/utils'
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

export default function TasksConfig() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading, resetDaily } = useAuth()
    const [tasks, setTasks] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedTask, setSelectedTask] = useState({
        "idtask": "",
        "idperso": "",
        "idcategorie": "",
        "actif": true,
        "done": 0,
        "count": 0,
    });

    useEffect(() => {
        if (currentUser && userDataObj) {
            setTasks(userDataObj.tasks);
            //console.log(tasks);
            //console.log(selectedTask);
        }
    }, [userDataObj]);

    useEffect(() => {
        console.log("updating selectedTask: ", selectedTask);

        if (selectedTask.idtask != "") {
            //console.log("updating selectedTask: ", selectedTask);

            
            const updatedTasks = tasks.map(task =>
                task.idtask === selectedTask.idtask ? selectedTask : task
            );

            setTasks(updatedTasks);
            setUserDataObj(prevUserDataObj => ({ ...prevUserDataObj, tasks: updatedTasks }));

            if (currentUser && userDataObj) {
                updateFirebase(updatedTasks);
            }
        }
    }, [selectedTask]);

    useEffect(() => {
        if (search) {
            const filteredTasks = userDataObj.tasks.filter(task => task.idcategorie.toLowerCase().includes(search.toLowerCase()) || task.idperso.toLowerCase().includes(search.toLowerCase()));

            setFilteredTasks(filteredTasks);
        } else {
            setFilteredTasks(userDataObj?.tasks);
        }
    }, [search, tasks]);

    async function updateFirebase(t = null) {
        if (currentUser && userDataObj) {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { ...userDataObj, tasks: t });
        }
    }

    const deleteTask = () => {
        if (selectedTask.idtask != "") {
            const updatedTasks = userDataObj.tasks.filter(task => task.idtask !== selectedTask.idtask);

            setTasks(updatedTasks);
            setUserDataObj(prevUserDataObj => ({ ...prevUserDataObj, tasks: updatedTasks }));

            if (currentUser) {
                updateFirebase(updatedTasks);
            }

            setSelectedTask({
                "idtask": "",
                "idperso": "",
                "idcategorie": "",
                "actif": true,
                "done": 0,
                "count": 0,
            });
        }
    }

    const addTask = () => {
        if (selectedTask.idtask == "") {
            if (!userDataObj.tasks) {
                userDataObj.tasks = [];
            }

            selectedTask.idtask = currentUser.uid + '_' + uuidv4();

            const updatedTasks = [...userDataObj.tasks, selectedTask];

            setTasks(updatedTasks);
            setUserDataObj(prevUserDataObj => ({ ...prevUserDataObj, tasks: updatedTasks }));

            if (currentUser) {
                updateFirebase(updatedTasks);
            }

            setSelectedTask({
                "idtask": "",
                "idperso": "",
                "idcategorie": "",
                "actif": true,
                "done": 0,
                "count": 0,
            });
        }
    }

    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        return (
            <div className='flex flex-col justify-center items-center h-full gap-6'>
                <h1 className='text-4xl font-bold text-white'>Tasks Configuration</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            <div className="grid grid-cols-6 grid-rows-6 h-full w-[60vw]">
                <div className='col-span-6 border-l border-r border-b border-[#2e3643] p-2'>
                    <h1 className='text-4xl font-bold text-gray-300 py-4'>
                        <span className='p-2'>Tasks Configuration</span>
                    </h1>
                </div>
                <div className='row-span-5 col-span-2 border-l border-[#2e3643] px-2 overflow-y-scroll overflow-x-hidden'>
                    <div className="sticky top-0 pt-3 bg-[#1e232d] z-10">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                id="tasksconfig_search_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <label htmlFor="tasksconfig_search_input" className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search:</label>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        {filteredTasks?.map((task, index) => {
                            const categorie = categories.find(categorie => categorie.name === task.idcategorie);
                            const perso = userDataObj.roster.persos.find(perso => perso.name === task.idperso);

                            //console.log(task);

                            return (
                                <div key={index} onClick={() => setSelectedTask(task)} className='p-1'>
                                    <div className={'flex flex-row justify-between items-center gap-1 border border-[#2e3643] bg-[#262d39] hover:bg-[#363e4b] rounded-lg cursor-pointer p-1 ' + (selectedTask.idtask === task.idtask ? ' text-blue-600 border-blue-600 ' : ' text-gray-500 ')}>
                                        <div>
                                            <p className='text-xs text-gray-400'><span className='font-bold'>Catégorie:</span> {task.idcategorie}</p>
                                            <p className='text-xs text-gray-400'><span className='font-bold'>Perso:</span> {task.idperso}</p>
                                        </div>
                                        {/* <img src={task?.logo} alt="Icon" className='w-12 h-12' /> */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='row-span-5 col-span-2 border-l border-r border-[#2e3643] p-2'>
                    <div className='h-full flex flex-col align-center justify-center'>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                list="list-categories"
                                id="tasksconfig_idcategories_input"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={selectedTask?.idcategorie}
                                onChange={e => setSelectedTask(prevSelectedTask => ({ ...prevSelectedTask, idcategorie: e.target.value }))}
                            />
                            <label htmlFor="tasksconfig_idcategories_input" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Catégorie</label>
                        </div>

                        {selectedTask.idcategorie && categories.find(categorie => categorie.name === selectedTask.idcategorie)?.inputs.map((input, index) => {
                            if (input.type === 'checkbox') {
                                return (
                                    <div key={index} className="relative z-0 w-full mb-2 group">
                                        <div className="inline-flex items-center">
                                            <label className="flex items-center cursor-pointer relative">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-400 checked:bg-blue-800 checked:border-blue-800"
                                                    id={input.id}
                                                    checked={selectedTask[input.var] || ""}
                                                    onChange={e => setSelectedTask(prevSelectedTask => ({ ...prevSelectedTask, [input.var]: e.target.checked }))}
                                                />
                                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </span>
                                            </label>
                                            <label htmlFor={input.id} className="ml-2 text-sm cursor-pointer text-gray-500 dark:text-gray-400">{input.name}</label>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="relative z-0 w-full mb-5 group">
                                        <input
                                            type={input.type.includes('list') ? 'text' : input.type}
                                            list={input.type.includes('list') ? input.type : undefined}
                                            id={input.id}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            value={selectedTask[input.var]}
                                            onChange={e => setSelectedTask(prevSelectedTask => ({ ...prevSelectedTask, [input.var]: input.type === 'number' ? parseInt(e.target.value) : e.target.value }))}
                                        />
                                        <label htmlFor={input.id} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{input.name}</label>
                                    </div>
                                );
                            }
                        })}

                        <div className="relative z-0 w-full mb-5 group">
                            <div className="inline-flex items-center">
                                <label className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-gray-400 checked:bg-blue-800 checked:border-blue-800"
                                        id="tasksconfig_actif_input"
                                        checked={selectedTask?.actif}
                                        onChange={e => setSelectedTask(prevSelectedTask => ({ ...prevSelectedTask, actif: e.target.checked }))}
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label htmlFor="tasksconfig_actif_input" className="ml-2 text-sm cursor-pointer text-gray-500 dark:text-gray-400 ">Actif</label>
                            </div>
                        </div>

                        <datalist id="list-categories">
                            {categories.map((categorie, index) => (
                                <option key={index} value={categorie?.name} label={categorie?.groupe} />
                            ))}
                        </datalist>

                        <datalist id="list-persos">
                            {userDataObj.roster.persos.map((perso, index) => (
                                <option key={index} value={perso?.name} label={perso?.classe + ' ' + perso?.ilevel} />
                            ))}
                        </datalist>

                        <div className="flex justify-end gap-2">
                            {
                                selectedTask.idtask != "" && (
                                    <button onClick={() => setSelectedTask({
                                        "idtask": "",
                                        "idperso": "",
                                        "idcategorie": "",
                                        "actif": true,
                                        "done": 0,
                                        "count": 0,
                                    })} id="tasksconfig_cancel" type="button" className="text-gray-400 hover:text-white border border-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-times"></i> Clear Data</button>
                                )
                            }
                            {
                                selectedTask.idtask != "" && (
                                    <button onClick={() => deleteTask()} id="tasksconfig_delete" type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Delete Tasks</button>
                                )
                            }
                            {
                                selectedTask.idtask == "" && (
                                    <button onClick={() => addTask()} id="tasksconfig_validate" type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 rounded text-xs px-3 py-2"><i className="fa-solid fa-check"></i> Valider</button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='row-span-5 col-span-2 border-r border-[#2e3643] p-2'>

                </div>
            </div>
        </div>
    )
}
