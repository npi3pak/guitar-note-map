import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';
import { trash, xIcon } from '../Icons';

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

const NoteSelectedLabel = ({ note = 'C', onDelete = (note: string) => {} }) => (
    <div className="flex items-center px-1 rounded-md bg-red-100 text-red-500">
        <div>{note}</div>
        <button
            type="button"
            aria-label={`Remove ${note}`}
            className="btn btn-ghost btn-xs btn-circle mx-1"
            onClick={() => onDelete(note)}
        >
            {xIcon}
        </button>
    </div>
);

const ScaleNote = ({ note = 'C' }) => (
    <div className="flex items-center px-1 rounded-md bg-indigo-500/25 text-indigo-600">
        <div>{note}</div>
    </div>
);

const Piano = () => {
    const { getHighlightNotes } = useFretBoardStore();
    const highlightNotes = getHighlightNotes();

    return (
        <div className="flex h-24 w-full lg:w-120">
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

const ScaleSelector = () => {
    const {
        getScale,
        getScaleKeys,
        getAllScaleNames,
        setScaleKey,
        setScaleName,
        getScaleNotesByKeyName,
        toggleScaleDisplay,
    } = useFretBoardStore();

    const scaleKeys = getScaleKeys();
    const scaleNames = getAllScaleNames();
    const { selectedKey, selectedScaleName, isDisplayed } = getScale();
    const notes = isDisplayed ? getScaleNotesByKeyName() : [];

    return (
        <>
            <fieldset className="fieldset border-gray-300 rounded-box border p-4">
                <legend className="fieldset-legend text-gray-500">Scale</legend>
                <label className="label text-xs py-4">
                    <input type="checkbox" defaultChecked className="checkbox checkbox-md" />
                    Filter by selected notes
                </label>
                <div className="flex join join-horizontal">
                    <select
                        className="select select-sm mr-2 flex-1 rounded-md"
                        value={selectedKey}
                        onChange={(e) => setScaleKey(e.target.value)}
                    >
                        <option value={null} />
                        {scaleKeys.map((scaleKey, item) => (
                            <option key={item}>{scaleKey}</option>
                        ))}
                    </select>
                    <select
                        className="select select-sm flex-3 rounded-l-md"
                        value={selectedScaleName}
                        onChange={(e) => setScaleName(e.target.value)}
                    >
                        <option value={null} />
                        {scaleNames.map((scaleName, item) => (
                            <option key={item}>{scaleName}</option>
                        ))}
                    </select>
                    <button
                        className="btn btn-sm text-red-400/70 join-item rounded-r-md"
                        onClick={() => toggleScaleDisplay()}
                        disabled={!selectedKey || !selectedScaleName}
                    >
                        Scale
                    </button>
                </div>
                <div className="flex flex-wrap mt-2 gap-2">
                    {notes.map((note, item) => (
                        <ScaleNote note={note} key={item} />
                    ))}
                </div>
            </fieldset>
        </>
    );
};

export const TopPanels = () => {
    const { getUniqSelectedNotes, resetNotes } = useFretBoardStore();
    const selectedNotes = getUniqSelectedNotes();

    const handleNoteDelete = (note: string) => {};

    return (
        <div className="flex pt-4">
            <div className="hidden md:flex pl-12 flex-[1.5]">
                <div className="bg-gray-100 rounded-xl p-10 flex w-full">
                    <div className="flex-1">
                        <h1 className="text-4xl text-red-500/50 font-bold">Guitar Note Map</h1>
                        <p className="py-2 text-gray-400">
                            Interactive tool to explore notes on the guitar fretboard and see their matches on the piano
                            keyboard
                        </p>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
            <div className="hidden md:flex pl-6 flex-[1.5]">
                <div className="bg-gray-100 rounded-xl p-10 w-full">
                    <fieldset className="fieldset border-gray-300 rounded-box border flex flex-wrap bg-white/50 p-2">
                        <legend className="fieldset-legend text-gray-500">Selected Notes</legend>
                        <button className="btn btn-xs text-red-400/70" onClick={resetNotes}>
                            {trash}
                        </button>
                        {selectedNotes.map((baseNote, index) => (
                            <NoteSelectedLabel note={baseNote} key={index} />
                        ))}
                    </fieldset>
                    <div className="">
                        <ScaleSelector />
                    </div>
                </div>
            </div>
            <div className="flex pl-12 md:pl-6 pr-12 flex-[1]">
                <div className="bg-gray-100 rounded-xl p-10 flex items-center w-full h-full">
                    <Piano />
                </div>
            </div>
        </div>
    );
};
