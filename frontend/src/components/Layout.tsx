import { useAppDispatch } from "@app/hooks";
import { useEffect } from "react";
import Footer from "./Footer"
import Navbar from "./Navbar"

export interface LayoutProps {
    children: React.ReactNode | React.ReactNode[]
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Navbar />
            <div className="main-content">
                <div className="container">{children}</div>
            </div>
            <Footer />
        </div>
    )
}