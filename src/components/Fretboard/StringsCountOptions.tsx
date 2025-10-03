import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';
import { chevronLeft, chevronRight } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';

export const StringsCountOptions = React.memo(() => {
    const { getIsLocked, getStringsCount, decStrings, incStrings } = useFretBoardStore();
    const { isLocked } = getIsLocked();
    const stringsCount = getStringsCount();

    return (
        <div className="flex py-2 justify-center">
            <motion.div
                animate={{ opacity: isLocked ? 0 : 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className={classNames({
                    invisible: isLocked,
                    visible: !isLocked,
                })}
            >
                <button className="btn btn-ghost btn-xs text-red-600/50" onClick={() => decStrings()}>
                    {chevronLeft}
                </button>
                <span className="label text-red-600/50">{stringsCount}</span>
                <button className="btn btn-ghost btn-xs text-red-600/50" onClick={() => incStrings()}>
                    {chevronRight}
                </button>
            </motion.div>
        </div>
    );
});
