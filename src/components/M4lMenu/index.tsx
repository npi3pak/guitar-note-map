import { chevronLeft, chevronRight, lockIcon, unlockIcon } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';

export const M4lMenu = () => {
    const {
        tuneUpAll,
        tuneDownAll,
        getIsLocked,
        setLock,
        tuneToStandard,
        resetNotes,
        getStringsCount,
        decStrings,
        incStrings,
        toggleScaleDisplay,
    } = useFretBoardStore();
    const { isLocked } = getIsLocked();
    const stringsCount = getStringsCount();

    const elementTextStyle = isLocked ? 'text-ableton-gray' : 'text-ableton-orange';

    return (
        <div className="p-1 flex">
            <div className="p-1 flex flex-col bg-ableton-black card w-[150px] h-[160px] items-center justify-center">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start">
                        <div className="flex flex-row justify-items-center items-center">
                            <button
                                className={`border-ableton-orange ${elementTextStyle} mr-1 text-[1px]`}
                                onClick={() => tuneDownAll()}
                                disabled={isLocked}
                            >
                                {chevronLeft}
                            </button>
                            <label className={`${elementTextStyle} text-[10px]`}>strings tune</label>
                            <button
                                className={`border-ableton-orange ${elementTextStyle} mr-1 text-[1px]`}
                                onClick={() => tuneUpAll()}
                                disabled={isLocked}
                            >
                                {chevronRight}
                            </button>
                        </div>
                        <div className="flex flex-row justify-items-center items-center">
                            <button className={`${elementTextStyle} text-[1px]`} onClick={() => decStrings()}>
                                {chevronLeft}
                            </button>
                            <label className={`${elementTextStyle} text-[10px]`}>strings: {stringsCount}</label>
                            <button className={`${elementTextStyle} text-[1px]`} onClick={() => incStrings()}>
                                {chevronRight}
                            </button>
                        </div>
                        <div className="flex">
                            <button
                                className={`${elementTextStyle} text-[10px]`}
                                onClick={() => tuneToStandard()}
                                disabled={isLocked}
                            >
                                Tune to standard
                            </button>
                        </div>
                    </div>
                    <div className="flex  items-end">
                        <button className="border-ableton-orange text-ableton-orange mr-1" onClick={() => setLock()}>
                            {isLocked ? lockIcon : unlockIcon}
                        </button>
                    </div>
                </div>
                <div className="flex flex-row mt-2">
                    <button className="border-1 text-ableton-orange text-[10px] px-1" onClick={() => resetNotes()}>
                        Reset Notes
                    </button>
                </div>
                <div className="flex flex-row mt-1">
                    <button className="border-1 text-ableton-orange text-[10px] px-1" onClick={() => toggleScaleDisplay()}>
                        Scale Highlight
                    </button>
                </div>
            </div>
        </div>
    );
};
