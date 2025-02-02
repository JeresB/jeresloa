'use client'

import { useAuth } from '@/context/AuthContext'
import { redirect } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast';
import Loading from './Loading'

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj, commonDataObj, setCommonDataObj, loading } = useAuth()
    const [commonData, setCommonData] = useState({})

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

    async function handleCommonData() {
        try {
            const newCommonData = { ...commonDataObj }

            // update the current state
            setCommonData(newCommonData)

            // update the global state
            setCommonDataObj(newCommonData)

            // update firebase
            const docRef = doc(db, 'common', 'jeresloa')
            const res = await setDoc(docRef, {
                fate_ember_options: []
            }, { merge: true })

            toast.success('handleCommonData:\nDonnées enregistrées', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (err) {
            console.log('Failed to set data: ', err.message)
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-full gap-6'>
            {/* <h1 className='text-4xl font-bold text-white'>Dashboard</h1>
            <p className='text-white'>{currentUser.uid}</p>
            <p className='text-white'>{JSON.stringify(userDataObj)}</p>
            <p className='text-white'>{JSON.stringify(commonDataObj)}</p>
            <button onClick={() => { handleCommonData() }}>SetCommonData</button> */}
        </div>
    )
}
