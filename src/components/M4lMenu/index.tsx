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
        getScale,
    } = useFretBoardStore();
    const { isLocked } = getIsLocked();
    const stringsCount = getStringsCount();

    const elementTextStyle = isLocked ? 'text-ableton-gray' : 'text-ableton-orange';
    const activeElementTextStyle = isLocked ? '' : 'hover:brightness-120';

    const isScaleDisplayed = getScale().isDisplayed;

    const scaleHighlightStyle = isScaleDisplayed
        ? 'border border-ableton-orange bg-ableton-orange text-ableton-black text-[10px] px-1'
        : 'border border-ableton-orange text-ableton-orange text-[10px] px-1 active:bg-ableton-orange active:text-black';

    return (
        <div className="p-1 flex">
            <div className="p-1 flex flex-col bg-ableton-black card w-[150px] h-[160px] items-center justify-center">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row justify-items-center items-center">
                            <button
                                className={`${elementTextStyle} ${activeElementTextStyle} text-[1px]`}
                                onClick={() => decStrings()}
                            >
                                {chevronLeft}
                            </button>
                            <label className={`text-ableton-gray text-[10px]`}>strings: {stringsCount}</label>
                            <button
                                className={`${elementTextStyle} ${activeElementTextStyle} text-[1px]`}
                                onClick={() => incStrings()}
                            >
                                {chevronRight}
                            </button>
                        </div>
                        <div className="flex flex-row justify-items-center items-center">
                            <button
                                className={`border-ableton-orange ${elementTextStyle} ${activeElementTextStyle} mr-1 text-[1px]`}
                                onClick={() => tuneDownAll()}
                                disabled={isLocked}
                            >
                                {chevronLeft}
                            </button>
                            <label className={`text-ableton-gray text-[10px]`}>strings tune</label>
                            <button
                                className={`border-ableton-orange ${elementTextStyle} ${activeElementTextStyle} mr-1 text-[1px]`}
                                onClick={() => tuneUpAll()}
                                disabled={isLocked}
                            >
                                {chevronRight}
                            </button>
                        </div>

                        <div className="flex">
                            <button
                                className={`${elementTextStyle} ${activeElementTextStyle} text-[10px]`}
                                onClick={() => tuneToStandard()}
                                disabled={isLocked}
                            >
                                Tune to standard
                            </button>
                        </div>
                    </div>
                    <div className="flex  items-center">
                        <button
                            className="border-ableton-orange text-ableton-orange mr-1 hover:brightness-120"
                            onClick={() => setLock()}
                        >
                            {isLocked ? lockIcon : unlockIcon}
                        </button>
                    </div>
                </div>
                <div className="border-t-1 mt-4 border-ableton-border-gray flex w-full" />
                <div className="flex flex-row mt-6">
                    <button
                        className="border border-ableton-orange text-ableton-orange text-[10px] px-1 active:bg-ableton-orange active:text-black"
                        onClick={() => resetNotes()}
                    >
                        Reset Notes
                    </button>
                </div>
                <div className="flex flex-row mt-1">
                    <button className={scaleHighlightStyle} onClick={() => toggleScaleDisplay()}>
                        Scale Highlight
                    </button>
                </div>
            </div>
        </div>
    );
};
