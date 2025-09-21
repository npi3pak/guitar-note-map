import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';

const whiteKeyStyle = 'relative flex-1 border-l border-gray-400/25 rounded-b-xl hover:cursor-pointer';
const blackKeyStyle = 'absolute top-0 left-[65%] w-[70%] h-[60%] z-10 rounded-b-xl hover:cursor-pointer';

const colorMap: Record<number, string> = {
    1: 'bg-blue-300/25 text-blue-500/50',
    2: 'bg-(--color-piano-Csharp) text-red-500/50',
    3: 'bg-green-300/25 text-green-500/50',
    4: 'bg-(--color-piano-Dsharp) text-yellow-500/50',
    5: 'bg-purple-300/25 text-purple-500/50',
    6: 'bg-pink-300/25 text-pink-500/50',
    7: 'bg-(--color-piano-Fsharp) text-indigo-500/50',
    8: 'bg-teal-300/25 text-teal-500/50',
    9: 'bg-(--color-piano-Gsharp) text-orange-500/50',
    10: 'bg-lime-300/25 text-lime-500/50',
    11: 'bg-(--color-piano-Asharp) text-cyan-500/50',
    12: 'bg-rose-300/25 text-rose-500/50',
};

const getColor = ({ note, highlightNotes, isPressed = false }) => {
    const highlightColorNum =
        highlightNotes[note].hover || highlightNotes[note].display ? colorMap[highlightNotes[note].colorNum] : null;
    const isBlackKey = note.endsWith('#');

    if (isPressed) {
        return 'bg-(--color-piano-pressed)';
    }

    if (highlightColorNum) {
        return highlightColorNum;
    }

    if (isBlackKey) {
        return 'bg-gray-500';
    }

    return 'bg-(--color-piano-white)';
};

const Octave = () => {
    const { getHighlightNotes, addHoverNote, removeHoverNote } = useFretBoardStore();

    const highlightNotes = getHighlightNotes();

    return (
        <div className="flex h-48 w-120">
            <div className={classnames(`border-l-0 ${whiteKeyStyle} ${getColor({ note: 'C', highlightNotes })}`)}>
                <div className={classnames(`${blackKeyStyle} ${getColor({ note: 'C#', highlightNotes })}`)}></div>
            </div>
            <div className={classnames(`${whiteKeyStyle} ${getColor({ note: 'D', highlightNotes })}`)}>
                <div className={classnames(`${blackKeyStyle} ${getColor({ note: 'D#', highlightNotes })}`)}></div>
            </div>
            <div className={classnames(`${whiteKeyStyle} ${getColor({ note: 'E', highlightNotes })}`)}></div>
            <div className={classnames(`${whiteKeyStyle} ${getColor({ note: 'F', highlightNotes })}`)}>
                <div className={classnames(`${blackKeyStyle} ${getColor({ note: 'F#', highlightNotes })}`)}></div>
            </div>
            <div className={classnames(`${whiteKeyStyle} ${getColor({ note: 'G', highlightNotes })}`)}>
                <div className={classnames(`${blackKeyStyle} ${getColor({ note: 'G#', highlightNotes })}`)}></div>
            </div>
            <div className={classnames(`${whiteKeyStyle} ${getColor({ note: 'A', highlightNotes })}`)}>
                <div className={classnames(`${blackKeyStyle} ${getColor({ note: 'A#', highlightNotes })}`)}></div>
            </div>
            <div className={classnames(`${whiteKeyStyle} ${getColor({ note: 'B', highlightNotes })}`)}></div>
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
