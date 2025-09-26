import { useFretBoardStore } from 'src/store';

export const ScaleNote = ({ note = 'C' }) => (
    <div className="flex items-center px-1 rounded-md bg-indigo-500/25 text-indigo-600">
        <div>{note}</div>
    </div>
);

export const ScaleSelector = () => {
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

    const toggleBntColor = isDisplayed ? 'bg-indigo-300/25' : 'text-red-400/70';

    return (
        <>
            <fieldset className="fieldset border-gray-300 rounded-box border h-42 p-2 mt-2">
                <legend className="fieldset-legend text-gray-500">Scale</legend>
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
                        className={`btn btn-sm  join-item rounded-r-md ${toggleBntColor}`}
                        onClick={() => toggleScaleDisplay()}
                        disabled={!selectedKey || !selectedScaleName}
                    >
                        Scale
                    </button>
                </div>
                <label className="label mt-2">
                    <input type="checkbox" defaultChecked className="toggle text-red-400/70" />
                    filter scales by selected notes
                </label>
                <div className="flex flex-wrap mt-2 gap-2 justify-center">
                    {notes.map((note, item) => (
                        <ScaleNote note={note} key={item} />
                    ))}
                </div>
            </fieldset>
        </>
    );
};
