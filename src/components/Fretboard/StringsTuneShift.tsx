import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chevronLeft, chevronRight, lockIcon, unlockIcon } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';

export const StringsTuneShift = React.memo(() => {
    const { tuneUpAll, tuneDownAll, getIsLocked, setLock, tuneToStandard, resetNotes, resetScale, getScale } =
        useFretBoardStore();
    const { isLocked } = getIsLocked();
    const { isDisplayed: isScaleDisplayed } = getScale();

    return (
        <>
            <div className="flex py-2">
                <div className="join join-horizontal">
                    <button className="btn btn-xs join-item  w-10" onClick={() => setLock()}>
                        {isLocked ? lockIcon : unlockIcon}
                    </button>
                    <button className="btn btn-xs join-item  w-10" onClick={() => tuneDownAll()} disabled={isLocked}>
                        {chevronLeft}
                    </button>
                    <button className="btn btn-xs join-item  w-10" onClick={() => tuneUpAll()} disabled={isLocked}>
                        {chevronRight}
                    </button>
                </div>
                {!isLocked && (
                    <button className="btn btn-xs ml-4" onClick={() => tuneToStandard()} disabled={isLocked}>
                        Reset to standart
                    </button>
                )}
                <AnimatePresence>
                    <motion.button
                        key="clear-notes"
                        className="btn btn-xs ml-4 md:hidden"
                        onClick={() => resetNotes()}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                    >
                        Clear notes
                    </motion.button>

                    {isScaleDisplayed && (
                        <motion.button
                            key="clear-scales"
                            className="btn btn-xs ml-4 md:hidden"
                            onClick={() => resetScale()}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            Clear scales
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
});
