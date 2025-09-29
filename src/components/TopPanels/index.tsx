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
            <legend className="fieldset-legend">Selected Notes</legend>
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
        <div className="flex pt-4">
            {/* <div className="hidden md:flex pl-12 flex-[1.5]">
                <div className="bg-gray-100 rounded-xl p-8 flex w-full">
                    <div className="flex-1">
                        <h1 className="text-4xl text-red-500/50 font-bold">Guitar Note Map</h1>
                        <p className="py-2 text-gray-400">
                            Interactive tool to explore notes on the guitar fretboard and see their matches on the piano
                            keyboard
                        </p>
                    </div>
                    <div className="flex-1"></div>
                </div>
                </div> */}
            <div className="hidden md:flex pl-12 flex-[1.5]">
                <div className="bg-gray-100 rounded-xl py-3 px-5 w-full">
                    <NoteSelector />
                </div>
            </div>
            <div className="hidden md:flex pl-6 flex-[1.5]">
                <div className="bg-gray-100 rounded-xl py-3 px-5 w-full">
                    <div className="">
                        <ScaleSelector />
                    </div>
                </div>
            </div>
            <div className="flex pl-12 md:pl-6 pr-12 flex-[1]">
                <div className="bg-gray-100 rounded-xl px-4 p-4 flex items-center w-full">
                    <Piano />
                </div>
            </div>
        </div>
    );
};
