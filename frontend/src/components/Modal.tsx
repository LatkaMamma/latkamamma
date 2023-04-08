import { AnimatePresence, motion } from "framer-motion";
import { closeModal } from "../redux/features/slices";
import { useAppSelector, useAppDispatch } from "../redux/hooks";

export default function Modal() {
    const { openModal } = useAppSelector(state => state.modal);
    const dispatch = useAppDispatch();
    return (
        <AnimatePresence>
            {openModal && (
                <motion.div
                    className="modal"
                    key={openModal.id}
                >
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">{openModal.title}</p>
                            <button
                                className="delete"
                                aria-label="close"
                                onClick={() => dispatch(closeModal())}
                            ></button>
                        </header>
                        <section className="modal-card-body">
                            {openModal.content}
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button className="button">Cancel</button>
                        </footer>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}