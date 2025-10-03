import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';

export const whiteKeyStyle = 'relative flex-1 border-l border-gray-400/25 rounded-b-xl hover:cursor-pointer';
export const blackKeyStyle = 'absolute top-0 left-[65%] w-[70%] h-[60%] z-10 rounded-b-xl hover:cursor-pointer';

const colorMap: Record<number, string> = {
    1: 'bg-note-c',
    2: 'bg-note-c-diez',
    3: 'bg-note-d',
    4: 'bg-note-d-diez',
    5: 'bg-note-e',
    6: 'bg-note-f',
    7: 'bg-note-f-diez',
    8: 'bg-note-g',
    9: 'bg-note-g-diez',
    10: 'bg-note-a',
    11: 'bg-note-a-diez',
    12: 'bg-note-b',
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
        return 'bg-neutral';
    }

    return 'bg-base-100 border-r-1 border-b-2';
};

export const Piano = () => {
    const { getHighlightNotes, searchNoteAndPress } = useFretBoardStore();
    const highlightNotes = getHighlightNotes();

    return (
        <div className="flex h-24 w-full lg:w-120">
            <div
                className={classnames(`border-l-2 ${whiteKeyStyle} ${getColor({ note: 'C', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('C')}
            >
                <div
                    className={classnames(`${blackKeyStyle} ${getColor({ note: 'C#', highlightNotes })}`)}
                    onClick={(e) => {
                        e.stopPropagation();
                        searchNoteAndPress('C#');
                    }}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKeyStyle} ${getColor({ note: 'D', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('D')}
            >
                <div
                    className={classnames(`${blackKeyStyle} ${getColor({ note: 'D#', highlightNotes })}`)}
                    onClick={(e) => {
                        e.stopPropagation();
                        return searchNoteAndPress('D#');
                    }}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKeyStyle} ${getColor({ note: 'E', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('E')}
            ></div>
            <div
                className={classnames(`${whiteKeyStyle} ${getColor({ note: 'F', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('F')}
            >
                <div
                    className={classnames(`${blackKeyStyle} ${getColor({ note: 'F#', highlightNotes })}`)}
                    onClick={(e) => {
                        e.stopPropagation();
                        return searchNoteAndPress('F#');
                    }}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKeyStyle} ${getColor({ note: 'G', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('G')}
            >
                <div
                    className={classnames(`${blackKeyStyle} ${getColor({ note: 'G#', highlightNotes })}`)}
                    onClick={(e) => {
                        e.stopPropagation();
                        return searchNoteAndPress('G#');
                    }}
                ></div>
            </div>
            <div
                className={classnames(`${whiteKeyStyle} ${getColor({ note: 'A', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('A')}
            >
                <div
                    className={classnames(`${blackKeyStyle} ${getColor({ note: 'A#', highlightNotes })}`)}
                    onClick={(e) => {
                        e.stopPropagation();
                        return searchNoteAndPress('A#');
                    }}
                ></div>
            </div>
            <div
                className={classnames(`border-r-2 ${whiteKeyStyle} ${getColor({ note: 'B', highlightNotes })}`)}
                onClick={() => searchNoteAndPress('B')}
            ></div>
        </div>
    );
};
