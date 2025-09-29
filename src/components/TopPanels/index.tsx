import { useFretBoardStore } from 'src/store';
import { xIcon } from '../Icons';
import { Piano } from '../Piano';
import { ScaleSelector } from '../ScaleSelector';

const NoteSelectedLabel = ({ note = 'C', onDelete = (note: string) => {} }) => (
    <div className="flex items-center px-1 rounded-md bg-red-100 text-red-500 h-7">
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

const NoteSelector = () => {
    const { getUniqSelectedNotes, resetNotes } = useFretBoardStore();

    const selectedNotes = getUniqSelectedNotes();
    const handleNoteDelete = (note: string) => {};

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend text-gray-500">Selected Notes</legend>
            <div className="flex flex-row justify-between w-full bg-white border border-gray-300 rounded-md p-4 mt-0">
                <div className="flex flex-wrap gap-1 justify-center h-15">
                    {selectedNotes.map((baseNote, index) => (
                        <NoteSelectedLabel note={baseNote} key={index} />
                    ))}
                </div>
                <button className="btn btn-ghost btn-xs text-gray-500 btn-circle" onClick={resetNotes}>
                    {xIcon}
                </button>
            </div>
        </fieldset>
    );
};

export const TopPanels = () => {
    return (
        <div className="flex flex-col gap-4 px-4 md:px-12 pt-4 md:flex-row">
            <div className="flex flex-1">
                <div className="bg-gray-100 rounded-xl py-3 px-5 w-full">
                    <NoteSelector />
                </div>
            </div>
            <div className="md:flex flex-1 hidden">
                <div className="bg-gray-100 rounded-xl py-3 px-5 w-full">
                    <ScaleSelector />
                </div>
            </div>
            <div className="flex flex-1">
                <div className="bg-gray-100 rounded-xl p-4 px-5 flex items-center w-full">
                    <Piano />
                </div>
            </div>
        </div>
    );
};
