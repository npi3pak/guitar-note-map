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
            <div className="p-1">
                <div className="flex flex-col px-4 py-1">
                    <button
                        className="btn btn-xs btn-outline border-ableton-orange text-ableton-orange my-1"
                        onClick={() => setLock()}
                    >
                        {isLocked ? lockIcon : unlockIcon}
                    </button>
                    <button
                        className="btn btn-xs btn-outline border-ableton-orange text-ableton-orange my-1"
                        onClick={() => tuneDownAll()}
                        disabled={isLocked}
                    >
                        {chevronLeft}
                    </button>
                    <button
                        className="btn btn-xs btn-outline border-ableton-orange text-ableton-orange my-1"
                        onClick={() => tuneUpAll()}
                        disabled={isLocked}
                    >
                        {chevronRight}
                    </button>
                    {!isLocked && (
                        <button
                            className="btn btn-xs btn-outline border-ableton-orange text-ableton-orange my-1"
                            onClick={() => tuneToStandard()}
                            disabled={isLocked}
                        >
                            Reset to standart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
