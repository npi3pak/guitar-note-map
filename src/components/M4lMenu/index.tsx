import { TopDrawer } from 'components/TopDrawer';
import { NoteSelector } from '../NoteSelector';
import { ScaleSelector } from '../ScaleSelector';
import { StringsTuneShift } from '../Fretboard/StringsTuneShift';

import React from 'react';
import { chevronLeft, chevronRight, lockIcon, unlockIcon } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';
import classNames from 'classnames';

export const M4lMenu = () => {
    const {
        tuneUpAll,
        tuneDownAll,
        getIsLocked,
        setLock,
        tuneToStandard,
        resetNotes,
        resetScale,
        getScale,
        getStringsCount,
        decStrings,
        incStrings,
    } = useFretBoardStore();
    const { isLocked } = getIsLocked();
    const { isDisplayed: isScaleDisplayed } = getScale();
    const stringsCount = getStringsCount();

    return (
        <div className="p-2 pt-6 flex">
            <div className="p-3 flex flex-col bg-ableton-black card  w-[150px]">
                <div className="flex flex-row justify-items-center items-center">
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
                <div className="flex flex-row justify-items-center items-center">
                    <button className="text-ableton-orange text-[1px]" onClick={() => decStrings()}>
                        {chevronLeft}
                    </button>
                    <label className="text-ableton-orange text-[10px]">strings: {stringsCount}</label>
                    <button className="text-ableton-orange text-[1px]" onClick={() => incStrings()}>
                        {chevronRight}
                    </button>
                </div>
                <div className="flex flex-row">
                    <button
                        className="text-ableton-orange text-[10px]"
                        onClick={() => tuneToStandard()}
                        disabled={isLocked}
                    >
                        Tune to standard
                    </button>
                </div>
                <div className="flex flex-row">
                    <button
                        className="text-ableton-orange text-[10px]"
                        onClick={() => resetNotes()}
                        disabled={isLocked}
                    >
                        Reset Notes
                    </button>
                </div>
                <button className="border-ableton-orange text-ableton-orange mr-1" onClick={() => setLock()}>
                    {isLocked ? lockIcon : unlockIcon}
                </button>
            </div>
        </div>
    );
};
