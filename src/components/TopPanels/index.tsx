import { Piano } from '../Piano';
import { ScaleSelector } from '../ScaleSelector';
import { NoteSelector } from '../NoteSelector';

export const TopPanels = () => {
    return (
        <div className="flex flex-col gap-4 px-4 md:px-12 pt-4 md:flex-row">
            <div className="flex flex-1">
                <div className="bg-base-100 rounded-box p-4 px-5 flex items-center w-full card card-border border-base-300">
                    <Piano />
                </div>
            </div>
            <div className="md:flex flex-1 hidden">
                <div className="bg-base-100 rounded-box py-3 px-5 w-full card card-border border-base-300">
                    <NoteSelector />
                </div>
            </div>
            <div className="md:flex flex-1 hidden">
                <div className="bg-base-100 rounded-box py-3 px-5 w-full card card-border border-base-300">
                    <ScaleSelector />
                </div>
            </div>
        </div>
    );
};
