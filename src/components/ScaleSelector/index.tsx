import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';
import { xIcon } from '../Icons';

const DEFAULT_KEY = 'C';

export const ScaleNote = ({ note = 'C' }) => (
    <div className="flex items-center px-1 rounded-md bg-indigo-500/25 text-indigo-600">
        <div>{note}</div>
    </div>
);

export const ScaleSelector = () => {
    const { getScale, getScales, setScaleKey, setScaleName, getScaleNotesByKeyName, resetScale, toggleScaleFilter } =
        useFretBoardStore();

    const { selectedKey, selectedScaleName, isDisplayed, isFiltered } = getScale();
    const allScales = getScales();
    const notes = isDisplayed ? getScaleNotesByKeyName() : [];

    const keysToDisplay = Object.keys(allScales).map((scaleKey) => ({
        name: scaleKey,
        makeAsFiltered: isFiltered
            ? Object.keys(allScales[scaleKey]).some((item) => {
                  return allScales[scaleKey][item].makeAsFiltered;
              })
            : false,
    }));

    const scalesToDisplay = Object.keys(allScales[selectedKey || DEFAULT_KEY]).map((scaleItem) => ({
        name: allScales[selectedKey || DEFAULT_KEY][scaleItem].name,
        makeAsFiltered:
            isFiltered && selectedKey ? allScales[selectedKey || DEFAULT_KEY][scaleItem].makeAsFiltered : false,
    }));

    const toggleBntColor = isDisplayed ? 'bg-indigo-300/25' : 'text-red-400/70';

    return (
        <>
            <fieldset className="fieldset border-gray-300 rounded-box border h-42 p-2 mt-2">
                <legend className="fieldset-legend text-gray-500">Scale</legend>
                <div className="flex join-horizontal">
                    <select
                        className="select select-sm mr-2 flex-1 rounded-md"
                        value={selectedKey ?? ''}
                        onChange={(e) => setScaleKey(e.target.value)}
                    >
                        <option value={null} />
                        {keysToDisplay.map((scaleKey, item) => (
                            <option className={classnames({ 'text-indigo-500': scaleKey.makeAsFiltered })} key={item}>
                                {scaleKey.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select select-sm mr-2 flex-3 rounded-l-md"
                        value={selectedScaleName ?? ''}
                        onChange={(e) => setScaleName(e.target.value)}
                    >
                        <option value={null} />
                        {scalesToDisplay.map((scaleName, item) => (
                            <option className={classnames({ 'text-indigo-500': scaleName.makeAsFiltered })} key={item}>
                                {scaleName.name}
                            </option>
                        ))}
                    </select>
                    <button className={`btn btn-sm  rounded-r-md ${toggleBntColor}`} onClick={() => resetScale()}>
                        {xIcon}
                    </button>
                </div>
                <label className="label mt-2">
                    <input
                        type="checkbox"
                        checked={isFiltered}
                        onChange={(e) => toggleScaleFilter(e.target.value)}
                        className="toggle text-red-400/70"
                    />
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
