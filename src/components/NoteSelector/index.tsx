import { useFretBoardStore } from 'src/store';
import { xIcon } from '../Icons';

const NoteSelectedLabel = ({ note = 'C', onDelete }) => (
    <div className="flex items-center px-1 rounded-xl bg-secondary text-secondary-content h-7 px-2">
        <div>{note}</div>
        <button
            type="button"
            aria-label={`Remove ${note}`}
            className="btn btn-ghost btn-xs btn-circle"
            onClick={() => onDelete(note)}
        >
            {xIcon}
        </button>
    </div>
);

export const NoteSelector = () => {
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
