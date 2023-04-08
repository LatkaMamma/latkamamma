import Image from "next/image";
import { notifications } from "@/src/redux/features/notifications";
import { useAppDispatch } from '@/src/redux/hooks';
import { IconMenu } from "@tabler/icons-react";

export default function Navbar() {
    const dispatch = useAppDispatch();
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <IconMenu />
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li tabIndex={0}>
                            <a className="text-success" onClick={() => dispatch(notifications.success({ message: "Success notification" }))}>
                                Success
                            </a>
                        </li>
                        <li tabIndex={0}>
                            <a className="text-error" onClick={() => dispatch(notifications.error({ message: "Error notification" }))}>
                                Error
                            </a>
                        </li>
                        <li tabIndex={0}>
                            <a className="text-info" onClick={() => dispatch(notifications.info({ message: "Info notification" }))}>
                                Info
                            </a>
                        </li>
                        <li tabIndex={0}>
                            <a className="text-warning" onClick={() => dispatch(notifications.warning({ message: "Warning notification" }))}>
                                Warning
                            </a>
                        </li>

                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">
                    LätkäMamma
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <a className="text-success" onClick={() => dispatch(notifications.success({ message: "Success notification" }))}>
                            Success
                        </a>
                    </li>
                    <li>
                        <a className="text-error" onClick={() => dispatch(notifications.error({ message: "Error notification" }))}>
                            Error
                        </a>
                    </li>
                    <li>
                        <a className="text-info" onClick={() => dispatch(notifications.info({ message: "Info notification" }))}>
                            Info
                        </a>
                    </li>
                    <li>
                        <a className="text-warning" onClick={() => dispatch(notifications.warning({ message: "Warning notification" }))}>
                            Warning
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}