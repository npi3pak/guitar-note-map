import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { EAnimationType, useFretBoardStore, type IFret, type IHighlightNotesState } from 'src/store';
import { chevronLeft, chevronRight } from 'src/components/Icons';

const colorMap: Record<number, string> = {
    1: 'bg-blue-300/25 text-blue-500/50',
    2: 'bg-red-300/25 text-red-500/50',
    3: 'bg-green-300/25 text-green-500/50',
    4: 'bg-yellow-300/25 text-yellow-500/50',
    5: 'bg-purple-300/25 text-purple-500/50',
    6: 'bg-pink-300/25 text-pink-500/50',
    7: 'bg-indigo-300/25 text-indigo-500/50',
    8: 'bg-teal-300/25 text-teal-500/50',
    9: 'bg-orange-300/25 text-orange-500/50',
    10: 'bg-lime-300/25 text-lime-500/50',
    11: 'bg-cyan-300/25 text-cyan-500/50',
    12: 'bg-rose-300/25 text-rose-500/50',
};

function getFlexClass(index: number) {
    if (index < 3) {
        return 'flex-1';
    }

    if (index < 6) {
        return 'flex-[0.7]';
    }

    return 'flex-[0.5]';
}

const isPressedStyles = (isPressed: boolean) => (isPressed ? 'font-bold text-red-600/50 bg-red-400/25' : '');

const isScaleDisplayStyles = (isScaleDisplay: boolean) => (isScaleDisplay ? 'border-indigo-600/50' : '');

const isHighlightedStyles = (note: string, highlightNotes: unknown) => {
    if (!highlightNotes[note].display) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl`;
};

const isHighlightedHoverStyles = (note: string, highlightNotes: unknown) => {
    if (!highlightNotes[note].hover) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl transition-colors duration-100`;
};

interface IProps {
    stringNumber: number;
}

interface IFretNote {
    fret: Partial<IFret>;
    highlightNotes: IHighlightNotesState['highlightedNotes'];
    scaleStepNumber?: number;
}

const FretNote: React.FC<IFretNote> = ({ fret, highlightNotes, scaleStepNumber = 10 }) => {
    const { addHoverNote, removeHoverNote } = useFretBoardStore();

    const animationOffsetSign =
        fret.animationType === EAnimationType.rightShift
            ? { initial: { x: 50, opacity: 0 }, exit: { x: -50, opacity: 0 } }
            : { initial: { x: -100, opacity: 0 }, exit: { x: 100, opacity: 0 } };

    return (
        <motion.div
            layout
            {...animationOffsetSign}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={classnames(
                ` rounded-xl w-12 ${isHighlightedStyles(fret.baseNote, highlightNotes)} ${isHighlightedHoverStyles(fret.baseNote, highlightNotes)} ${isPressedStyles(fret.pressed)} ${isScaleDisplayStyles(fret.scaleDisplay)}`,
            )}
            onMouseEnter={() => addHoverNote(fret.baseNote)}
            onMouseLeave={() => removeHoverNote(fret.baseNote)}
        >
            <div className="indicator">
                {fret.isNoteInScale && (
                    <span className="indicator-item badge border-indigo-300/25 bg-indigo-300/25 text-indigo-400/50 badge-xs text-[10px] px-1">
                        {scaleStepNumber}
                    </span>
                )}
                {fret.note}
            </div>
        </motion.div>
    );
};

export const String: React.FC<IProps> = ({ stringNumber = 1 }) => {
    const { getByString, getHighlightNotes, pressNote, getIsLocked, tuneUpNoteByString, tuneDownNoteByString } =
        useFretBoardStore();
    const [zeroFret, ...frets] = getByString(stringNumber);
    const highlightNotes = getHighlightNotes();
    const { isLocked } = getIsLocked();

    return (
        <>
            <div className="flex  justify-self-center p-2">
                <div className="flex w-24 justify-between">
                    <motion.button
                        animate={{ opacity: isLocked ? 0 : 1 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ visibility: isLocked ? 'hidden' : 'visible' }}
                        className="btn btn-ghost btn-xs text-blue-600/50"
                        onClick={() => tuneDownNoteByString(stringNumber)}
                    >
                        {chevronLeft}
                    </motion.button>
                    <span className="text-gray-600/50 dark:text-sky-400/50">{zeroFret.note}</span>
                    <motion.button
                        animate={{ opacity: isLocked ? 0 : 1 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ visibility: isLocked ? 'hidden' : 'visible' }}
                        className="btn btn-ghost btn-xs text-blue-600/50"
                        onClick={() => tuneUpNoteByString(stringNumber)}
                    >
                        {chevronRight}
                    </motion.button>
                </div>
            </div>
            {frets.map((fret, index) => {
                return (
                    <div
                        className={classnames(
                            `relative border-r-4 border-blue-400 flex justify-center ${getFlexClass(index)}`,
                        )}
                        key={index}
                    >
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-400/25 -translate-y-1/2 pointer-events-none"></div>
                        <button
                            className={classnames(
                                'relative z-10 text-blue-600/50 dark:text-sky-400/50 hover:cursor-pointer',
                            )}
                            onClick={() => pressNote(stringNumber, index + 1)}
                        >
                            <div className="w-12 flex justify-center">
                                <AnimatePresence mode="wait">
                                    <FretNote key={fret.note} fret={fret} highlightNotes={highlightNotes} />
                                </AnimatePresence>
                            </div>
                        </button>
                    </div>
                );
            })}
        </>
    );
};
