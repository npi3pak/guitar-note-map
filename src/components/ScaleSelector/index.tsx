import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';
import { xIcon } from '../Icons';

const DEFAULT_KEY = 'C';

export const ScaleNote = ({ note = 'C' }) => (
    <div className="flex items-center px-1 rounded-md bg-info/25 text-info">
        <div>{note}</div>
    </div>
);

export const NoteList = () => {
    const { getScaleNotesByKeyName, getScale } = useFretBoardStore();

    const { isDisplayed } = getScale();

    const notes = isDisplayed ? getScaleNotesByKeyName() : [];

    return (
        <div className="flex flex-wrap mt-2 gap-2 justify-center">
            {notes.map((note, item) => (
                <ScaleNote note={note} key={item} />
            ))}
        </div>
    );
};

export const ScaleSelector = () => {
    const { getScale, getScales, setScaleKey, setScaleName, resetScale, toggleScaleFilter } = useFretBoardStore();

    const { selectedKey, selectedScaleName, isFiltered } = getScale();
    const allScales = getScales();

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

    return (
        <>
            <fieldset className="fieldset h-34">
                <legend className="fieldset-legend text-base-content">Scale</legend>
                <div className="flex join-horizontal">
                    <select
                        className="select select-sm mr-2 flex-1"
                        value={selectedKey ?? ''}
                        onChange={(e) => setScaleKey(e.target.value)}
                    >
                        <option value={null} />
                        {keysToDisplay.map((scaleKey, item) => (
                            <option
                                className={classnames(
                                    { 'bg-info/25 text-info-content/50 my-1 text-xs': scaleKey.makeAsFiltered },
                                    'font-semibold',
                                )}
                                key={item}
                            >
                                {scaleKey.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select select-sm mr-2 flex-3"
                        value={selectedScaleName ?? ''}
                        onChange={(e) => setScaleName(e.target.value)}
                    >
                        <option value={null} />
                        {scalesToDisplay.map((scaleName, item) => (
                            <option
                                className={classnames(
                                    { 'bg-info/25 text-info-content/50 my-1 text-xs': scaleName.makeAsFiltered },
                                    'font-semibold',
                                )}
                                key={item}
                            >
                                {scaleName.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-sm bg-info/25" onClick={() => resetScale()}>
                        {xIcon}
                    </button>
                </div>
                <label className="label mt-2 text-base-content">
                    <input
                        type="checkbox"
                        checked={isFiltered}
                        onChange={() => toggleScaleFilter()}
                        className={`toggle toggle-sm ${isFiltered ? 'text-info/50' : 'text-base-content'}`}
                    />
                    Highlight scales containing selected notes
                </label>
                <NoteList />
            </fieldset>
        </>
    );
};
