import { useFretBoardStore } from 'src/store';
import { xIcon } from '../Icons';
import { Piano } from '../Piano';
import { ScaleSelector } from '../ScaleSelector';

const NoteSelectedLabel = ({ note = 'C', onDelete }) => (
    <div className="flex items-center px-1 rounded-md bg-secondary text-secondary-content h-7">
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
    const { getUniqSelectedNotes, resetNotes, resetStringNotesByBaseNote } = useFretBoardStore();

    const selectedNotes = getUniqSelectedNotes();
    const handleNoteDelete = (baseNote: string) => {
        resetStringNotesByBaseNote(baseNote);
    };

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend text-base-content">Selected Notes</legend>
            <div className="card card-border border-base-300 flex flex-row justify-between w-full rounded-box p-4 mt-0">
                <div className="flex flex-wrap gap-1 justify-center h-15">
                    {selectedNotes.map((baseNote, index) => (
                        <NoteSelectedLabel note={baseNote} key={index} onDelete={handleNoteDelete} />
                    ))}
                </div>
                <button className="btn btn-ghost btn-xs text-base-content btn-circle" onClick={resetNotes}>
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
                <div className="bg-base-100 rounded-box py-3 px-5 w-full card card-border border-base-300">
                    <NoteSelector />
                </div>
            </div>
            <div className="md:flex flex-1 hidden">
                <div className="bg-base-100 rounded-box py-3 px-5 w-full card card-border border-base-300">
                    <ScaleSelector />
                </div>
            </div>
            <div className="flex flex-1">
                <div className="bg-base-100 rounded-box p-4 px-5 flex items-center w-full card card-border border-base-300">
                    <Piano />
                </div>
            </div>
        </div>
    );
};
