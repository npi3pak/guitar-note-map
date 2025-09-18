import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useFretBoardStore } from 'src/store';

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

const isHighlightedStyles = (note: string, highlightNotes: any) => {
    if (!highlightNotes[note].display) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl`;
};

const isHighlightedHoverStyles = (note: string, highlightNotes: any) => {
    if (!highlightNotes[note].hover) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl`;
};

interface IProps {
    stringNumber: number;
}

export const String: React.FC<IProps> = ({ stringNumber = 1 }) => {
    const { getByString, getHighlightNotes, pressNote, addHoverNote, removeHoverNote } = useFretBoardStore();
    const [zeroFret, ...frets] = getByString(stringNumber);
    const highlightNotes = getHighlightNotes();

    return (
        <>
            <div className="rounded-l self-center justify-self-center p-2">
                <span className="text-gray-600/50 dark:text-sky-400/50">{zeroFret.note}</span>
            </div>
            {frets.map((fret, index) => {
                console.log('fret', fret);
                const animationOffsetSign = fret.animationType === 'leftShift' ? -1 : 1;
                const offset = 50;

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
                                <AnimatePresence>
                                    <motion.div
                                        key={fret.note}
                                        // initial={{ x: offset * animationOffsetSign, opacity: 0 }}
                                        // exit={{ x: offset * animationOffsetSign, opacity: 0 }}
                                        initial={{ x: 50, opacity: 0 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        // initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.1 }}
                                        className={classnames(
                                            ` rounded-xl w-12 ${isHighlightedStyles(fret.baseNote, highlightNotes)} ${isHighlightedHoverStyles(fret.baseNote, highlightNotes)} ${isPressedStyles(fret.pressed)}`,
                                        )}
                                        onMouseEnter={() => addHoverNote(fret.baseNote)}
                                        onMouseLeave={() => removeHoverNote(fret.baseNote)}
                                    >
                                        {fret.note}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </button>
                    </div>
                );
            })}
        </>
    );
};
