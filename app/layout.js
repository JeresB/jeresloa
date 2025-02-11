import { Comfortaa } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Head from "./head";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Login from "@/components/Login";
import Fatember from "@/components/Fatember";
import GoldsDrawer from "@/components/GoldsDrawer";

const ComfortaaSans = Comfortaa({ subsets: ["latin"] });

export const metadata = {
    title: "Jeres LOA",
    description: "Complet Todo List for your daily and weekly Lost Ark life",
};

export default function RootLayout({ children }) {
    const header = (
        <header>
            <nav className="pb-2 px-2 h-[48px]">
                <div className={"h-full mx-auto flex justify-between items-center " + ComfortaaSans.className}>
                    <Link href={'/'} className="min-w-[200px]">
                        <div className="text-white text-lg font-bold">Jeres LOA Todo</div>
                    </Link>
                    <div className="flex justify-center items-center">
                        <Link href={'/dashboard'}>
                            <div className="text-white text-lg font-bold mx-4 hover:bg-gray-800 rounded-lg p-2">Dashboard</div>
                        </Link>
                        <Link href={'/fatember'}>
                            <div className="text-white text-lg font-bold mx-4 hover:bg-gray-800 rounded-lg p-2">Fate Embers</div>
                        </Link>
                        <Link href={'/golds'}>
                            <div className="text-white text-lg font-bold mx-4 hover:bg-gray-800 rounded-lg p-2">Golds</div>
                        </Link>
                    </div>
                    <Login />
                </div>
            </nav>
        </header>
    );

    const footer = (
        <footer className={"pt-4 text-center " + ComfortaaSans.className}>
            Jeres LOA Todo © {new Date().getFullYear()} - All rights reserved.
        </footer>
    );

    return (
        <html lang="en">
            <Head />
            <AuthProvider>
                <body className="antialiased p-2">
                    <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
                    {header}
                    
                    <div className="flex flex-row h-full gap-2">
                        <div className="flex flex-col h-full w-[230px] gap-2">
                            <Fatember />
                            <GoldsDrawer />
                        </div>
                        {children}
                    </div>
                    
                    {footer}
                </body>
            </AuthProvider>
        </html>
    );
}
