'use client'

import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GithubAuthProvider } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [commonDataObj, setCommonDataObj] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GithubAuthProvider()

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
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}