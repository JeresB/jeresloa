import { Comfortaa } from 'next/font/google';
import React from 'react'

const ComfortaaSans = Comfortaa({ subsets: ["latin"] });

export default function Main(props) {
    const { children } = props

    return (
        <main className={`w-full h-[91vh] bg-main rounded-lg ${ComfortaaSans.className}`}>
            {children}
        </main>
    )
}