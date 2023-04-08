import { Notification } from "@/src/redux/features/notifications";
import { AnimationProps, motion } from "framer-motion";

export default function Alert({ ...props }: Notification & {
    animations: AnimationProps,
    handleRemoveNotification: (id: string) => void
}) {
    const { id, type, icon, title, message, handleRemoveNotification, animations } = props;
    return (
        <motion.div
            className={`alert alert-${type} shadow-lg`}
            {...animations}
        >
            <div>
                {icon}
                {title ?
                    (
                        <div>
                            <h3 className="font-bold">{title}</h3>
                            <div className="text-xs">{message}</div>
                        </div>
                    ) : (
                        <span>
                            {message}
                        </span>
                    )}
            </div>
            <div className="flex-none">
                <button className="btn btn-sm btn-outline btn-circle" onClick={() => handleRemoveNotification(id)}>
                    <svg className="icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </motion.div>
    )
}