import classnames from 'classnames';
import { isMobile } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useFretBoardStore } from 'src/store';
import { EAnimationType, type IFret, type IHighlightNotesState } from 'src/store/interfaces';
import { chevronLeft, chevronRight } from 'src/components/Icons';
import { useTheme } from 'src/hooks/useTheme';

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

// Add regulag map for all cases
const colorMapM4l: Record<number, string> = {
    1: 'bg-blue-300/70 text-blue-500',
    2: 'bg-red-300/70 text-red-500',
    3: 'bg-green-300/70 text-green-500',
    4: 'bg-yellow-300/70 text-yellow-500',
    5: 'bg-purple-300/70 text-purple-500',
    6: 'bg-pink-300/70 text-pink-500',
    7: 'bg-indigo-300/70 text-indigo-500',
    8: 'bg-teal-300/70 text-teal-500',
    9: 'bg-orange-300/70 text-orange-500',
    10: 'bg-lime-300/70 text-lime-500',
    11: 'bg-cyan-300/70 text-cyan-500',
    12: 'bg-rose-300/70 text-rose-500',
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

const isScaleDisplayStyles = (isScaleDisplay: boolean) => (isScaleDisplay ? 'border-1 border-indigo-600/25' : '');

const isHighlightedStyles = (colorMap) => (note: string, highlightNotes: unknown) => {
    if (!highlightNotes[note].display) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl`;
};

const isHighlightedHoverStyles = (colorMap) => (note: string, highlightNotes: unknown) => {
    if (!highlightNotes[note].hover) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl transition-colors duration-100`;
};

interface IProps {
    stringNumber: number;
    m4l?: boolean;
}

interface IFretNote {
    fret: Partial<IFret>;
    highlightNotes: IHighlightNotesState['highlightedNotes'];
    scaleStepNumber?: number;
}

const FretNote: React.FC<IFretNote> = React.memo(({ fret, highlightNotes }) => {
    const { addHoverNote, removeHoverNote, getScale, getScaleNotesByKeyName } = useFretBoardStore();
    const colors = useTheme();

    const animationOffsetSign =
        fret.animationType === EAnimationType.rightShift
            ? { initial: { x: 50, opacity: 0 }, exit: { x: -50, opacity: 0 } }
            : { initial: { x: -100, opacity: 0 }, exit: { x: 100, opacity: 0 } };

    const scaleNoteList: string[] = getScaleNotesByKeyName();

    const isScaleDisplayed = getScale().isDisplayed && fret.isNoteInScale;
    const scaleStepNumber = isScaleDisplayed ? scaleNoteList.indexOf(fret.baseNote) + 1 : null;

    return (
        <motion.div
            layout
            {...animationOffsetSign}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={classnames(
                `mx-1 md:mx-0 rounded-xl w-12 ${isHighlightedStyles(colors.fretNotesMap)(fret.baseNote, highlightNotes)} ${isHighlightedHoverStyles(colors.fretNotesMap)(fret.baseNote, highlightNotes)} ${isPressedStyles(fret.pressed)} ${isScaleDisplayStyles(isScaleDisplayed)}`,
            )}
            onMouseEnter={() => {
                if (!isMobile) {
                    return addHoverNote(fret.baseNote);
                }
            }}
            onMouseLeave={() => {
                if (!isMobile) {
                    return removeHoverNote(fret.baseNote);
                }
            }}
        >
            <div className="indicator">
                {isScaleDisplayed && (
                    <span className="indicator-item badge border-indigo-300/25 bg-indigo-100 text-indigo-400/50 badge-xs text-[10px] px-1">
                        {scaleStepNumber}
                    </span>
                )}
                {fret.note}
            </div>
        </motion.div>
    );
});

const isPressedZeroStyles = (isPressed: boolean) => (isPressed ? 'font-bold' : '');

const isScaleZeroDisplayStyles = (isScaleDisplay: boolean) =>
    isScaleDisplay ? 'border-1 border-gray-600/25 rounded-xl' : '';

const isZeroHighlightedStyles = (note: string, highlightNotes: unknown) => {
    if (!highlightNotes[note].display) {
        return '';
    }

    return 'bg-gray-300/25 font-semibold rounded-xl';
};

const isZeroHighlightedHoverStyles = (note: string, highlightNotes: unknown) => {
    if (!highlightNotes[note].hover) {
        return '';
    }

    return 'bg-gray-300/25 font-semibold rounded-xl';
};

const ZeroFret = ({ fret, stringNumber, highlightNotes }) => {
    const colors = useTheme();
    const {
        tuneUpNoteByString,
        tuneDownNoteByString,
        getIsLocked,
        addHoverNote,
        removeHoverNote,
        getScale,
        getScaleNotesByKeyName,
        pressNote,
    } = useFretBoardStore();
    const { isLocked } = getIsLocked();

    const scaleNoteList: string[] = getScaleNotesByKeyName();
    const isScaleDisplayed = getScale().isDisplayed && fret.isNoteInScale;
    const scaleStepNumber: number | null = isScaleDisplayed ? scaleNoteList.indexOf(fret.baseNote as string) + 1 : null;

    return (
        <div className="flex w-28 justify-between">
            <motion.button
                animate={{ opacity: isLocked ? 0 : 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ visibility: isLocked ? 'hidden' : 'visible' }}
                className={`btn btn-ghost btn-xs ${colors.zeroFretArrows}`}
                onClick={() => tuneDownNoteByString(stringNumber)}
            >
                {chevronLeft}
            </motion.button>
            {isLocked ? (
                <div
                    className={`hover:cursor-pointer text-center rounded-xl w-12 text-gray-600/50 dark:text-sky-400/50 ${isZeroHighlightedStyles(fret.baseNote, highlightNotes)} ${isZeroHighlightedHoverStyles(fret.baseNote, highlightNotes)} ${isPressedZeroStyles(fret.pressed)} ${isScaleZeroDisplayStyles(isScaleDisplayed)}`}
                    onMouseEnter={() => addHoverNote(fret.baseNote)}
                    onMouseLeave={() => removeHoverNote(fret.baseNote)}
                    onClick={() => pressNote(stringNumber, 0)}
                >
                    <div className="indicator">
                        {isScaleDisplayed && (
                            <span className="indicator-item badge border-gray-300/25 bg-gray-100 text-gray-400/50 badge-xs text-[10px] px-1">
                                {scaleStepNumber}
                            </span>
                        )}
                        {fret.note}
                    </div>
                </div>
            ) : (
                <div className="text-center rounded-xl w-12 text-gray-600/50 dark:text-sky-400/50">{fret.note}</div>
            )}
            <motion.button
                animate={{ opacity: isLocked ? 0 : 1 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ visibility: isLocked ? 'hidden' : 'visible' }}
                className={`btn btn-ghost btn-xs ${colors.zeroFretArrows}`}
                onClick={() => tuneUpNoteByString(stringNumber)}
            >
                {chevronRight}
            </motion.button>
        </div>
    );
};

export const String: React.FC<IProps> = React.memo(({ stringNumber = 1, m4l = false }) => {
    const { getByString, getHighlightNotes, pressNote } = useFretBoardStore();
    const colors = useTheme();
    const [zeroFret, ...frets] = getByString(stringNumber);
    const highlightNotes = getHighlightNotes();

    return (
        <>
            <div className="flex justify-self-center p-2">
                <ZeroFret fret={zeroFret} highlightNotes={highlightNotes} stringNumber={stringNumber} />
            </div>
            {frets.map((fret, index) => {
                return (
                    <div
                        className={classnames(
                            `relative border-r-4 ${colors.fret} flex justify-center ${getFlexClass(index)}`,
                        )}
                        key={index}
                    >
                        <div
                            className={`absolute top-1/2 left-0 w-full h-[1px] ${colors.string} -translate-y-1/2 pointer-events-none`}
                        ></div>
                        <button
                            className={classnames(
                                `relative z-10 ${colors.noteText} dark:text-sky-400/50 hover:cursor-pointer`,
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
});
