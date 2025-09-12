import classnames from 'classnames';
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

const isPressedStyles = (isPressed: boolean) => (isPressed ? 'font-bold text-red-600/50 bg-red-400/25 rounded-xl' : '');

const isHighlightedStyles = (note: string, highlightNotes: any) => {
    console.log('note', note);
    console.log('highlightNotes', highlightNotes);

    if (!highlightNotes[note].display) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold rounded-xl`;
};

interface IProps {
    stringNumber: number;
}

export const String: React.FC<IProps> = ({ stringNumber = 1 }) => {
    const { getByString, getHighlightNotes, pressNote } = useFretBoardStore();
    const [zeroFret, ...frets] = getByString(stringNumber);
    const highlightNotes = getHighlightNotes();

    return (
        <>
            <div className="p-1 flex items-center">
                <div className="rounded-l w-15">
                    <span className="text-gray-600/50 dark:text-sky-400/50">{zeroFret.note}</span>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-400/25"></div>
                    <div className="flex text-center">
                        {frets.map((fret, index) => (
                            <div
                                className={classnames(
                                    `border-r-4 border-blue-400 flex justify-center ${getFlexClass(index)}`,
                                )}
                                key={index}
                            >
                                <button
                                    className={classnames(
                                        `relative z-10 text-blue-600/50 dark:text-sky-400/50 ${isHighlightedStyles(fret.baseNote, highlightNotes)} ${isPressedStyles(fret.pressed)}`,
                                    )}
                                    onClick={() => pressNote(stringNumber, index + 1)}
                                >
                                    {fret.note}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
