import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';

const whiteKey = 'relative flex-1 border-l border-gray-400/25 rounded-b-xl hover:cursor-pointer';
const blackKey = 'absolute top-0 left-[65%] w-[70%] h-[60%] bg-gray-500 z-10 rounded-b-xl hover:cursor-pointer';

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

const isHighlightedStyles = (note: string, highlightNotes: any) => {
    if (!highlightNotes[note].display) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold`;
};

const isHighlightedHoverStyles = (note: string, highlightNotes: any) => {
    if (!highlightNotes[note].hover) {
        return '';
    }

    return `${colorMap[highlightNotes[note].colorNum]} font-semibold`;
};

const Octave = () => {
    const { getHighlightNotes, addHoverNote, removeHoverNote } = useFretBoardStore();

    const highlightNotes = getHighlightNotes();

    return (
        <div className="flex h-48 w-120">
            <div
                className={classnames(
                    `border-l-0 ${whiteKey} ${isHighlightedHoverStyles('C', highlightNotes) || 'bg-white'}`,
                )}
                onMouseEnter={() => addHoverNote('C')}
                onMouseLeave={() => removeHoverNote('C')}
            >
                <div
                    className={classnames(`${blackKey} ${isHighlightedHoverStyles('C#', highlightNotes)}`)}
                    onMouseEnter={() => addHoverNote('C#')}
                    onMouseLeave={() => removeHoverNote('C#')}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKey} ${isHighlightedHoverStyles('D', highlightNotes) || 'bg-white'}`)}
                onMouseEnter={() => addHoverNote('D')}
                onMouseLeave={() => removeHoverNote('D')}
            >
                <div
                    className={classnames(`${blackKey} ${isHighlightedHoverStyles('D#', highlightNotes)}`)}
                    onMouseEnter={() => addHoverNote('D#')}
                    onMouseLeave={() => removeHoverNote('D#')}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKey} ${isHighlightedHoverStyles('E', highlightNotes) || 'bg-white'}`)}
                onMouseEnter={() => addHoverNote('E')}
                onMouseLeave={() => removeHoverNote('E')}
            ></div>
            <div
                className={classnames(`${whiteKey} ${isHighlightedHoverStyles('F', highlightNotes) || 'bg-white'}`)}
                onMouseEnter={() => addHoverNote('F')}
                onMouseLeave={() => removeHoverNote('F')}
            >
                <div
                    className={classnames(`${blackKey} ${isHighlightedHoverStyles('F#', highlightNotes)}`)}
                    onMouseEnter={() => addHoverNote('F#')}
                    onMouseLeave={() => removeHoverNote('F#')}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKey} ${isHighlightedHoverStyles('G', highlightNotes) || 'bg-white'}`)}
                onMouseEnter={() => addHoverNote('G')}
                onMouseLeave={() => removeHoverNote('G')}
            >
                <div
                    className={classnames(`${blackKey} ${isHighlightedHoverStyles('G#', highlightNotes)}`)}
                    onMouseEnter={() => addHoverNote('G#')}
                    onMouseLeave={() => removeHoverNote('G#')}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKey} ${isHighlightedHoverStyles('A', highlightNotes) || 'bg-white'}`)}
                onMouseEnter={() => addHoverNote('A')}
                onMouseLeave={() => removeHoverNote('A')}
            >
                <div
                    className={classnames(`${blackKey} ${isHighlightedHoverStyles('A#', highlightNotes)}`)}
                    onMouseEnter={() => addHoverNote('A#')}
                    onMouseLeave={() => removeHoverNote('A#')}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKey} ${isHighlightedHoverStyles('B', highlightNotes) || 'bg-white'}`)}
                onMouseEnter={() => addHoverNote('B')}
                onMouseLeave={() => removeHoverNote('B')}
            ></div>
        </div>
    );
};

export const Piano = () => {
    return (
        <div className="flex p-12">
            <div className="bg-gray-100 rounded-xl p-10">
                <Octave />
            </div>
        </div>
    );
};
