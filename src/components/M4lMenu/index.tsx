import { TopDrawer } from 'components/TopDrawer';
import { NoteSelector } from '../NoteSelector';
import { ScaleSelector } from '../ScaleSelector';
import { StringsTuneShift } from '../Fretboard/StringsTuneShift';

import React from 'react';
import { chevronLeft, chevronRight, lockIcon, unlockIcon } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';

export const M4lMenu = () => {
    const { tuneUpAll, tuneDownAll, getIsLocked, setLock, tuneToStandard, resetNotes, resetScale, getScale } =
        useFretBoardStore();
    const { isLocked } = getIsLocked();
    const { isDisplayed: isScaleDisplayed } = getScale();

    return (
        <div className="p-2 pt-6 flex">
            <div className="p-3 flex flex-col bg-ableton-black card  w-[150px]">
                <div className="flex flex-row mt-2 justify-items-center items-center">
                    <button className="border-ableton-orange text-ableton-orange mr-1" onClick={() => setLock()}>
                        {isLocked ? lockIcon : unlockIcon}
                    </button>

                    <button
                        className="border-ableton-orange text-ableton-orange mr-1 text-[1px]"
                        onClick={() => tuneDownAll()}
                        disabled={isLocked}
                    >
                        {chevronLeft}
                    </button>
                    <label className="text-ableton-orange text-[10px]">fred tuning</label>
                    <button
                        className="border-ableton-orange text-ableton-orange mr-1 text-[1px]"
                        onClick={() => tuneUpAll()}
                        disabled={isLocked}
                    >
                        {chevronRight}
                    </button>
                </div>
                <div className="flex flex-row">
                    <button
                        className="border-ableton-orange text-ableton-orange my-1 text-[8px]"
                        onClick={() => tuneToStandard()}
                        disabled={isLocked}
                    >
                        Reset to standard
                    </button>
                </div>
            </div>
        </div>
    );
};
