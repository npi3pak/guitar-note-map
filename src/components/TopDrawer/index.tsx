import { useTopDrawer } from 'store/useTopDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleX } from 'lucide-react';

export const TopDrawer = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, close } = useTopDrawer();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black"
                        onClick={close}
                    />

                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-0 left-0 right-0 z-50 bg-base-200 shadow-lg"
                    >
                        <div className="px-4 py-2 bg-base-100 relative">
                            {children}
                            <button className="btn btn-lg btn-ghost absolute right-0 bottom-0 p-8" onClick={close}>
                                <CircleX />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
