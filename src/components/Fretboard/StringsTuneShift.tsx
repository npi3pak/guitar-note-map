import { chevronLeft, chevronRight, lockIcon, unlockIcon } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';

export const StringsTuneShift = () => {
    const { tuneUpAll, tuneDownAll, getIsLocked, setLock, tuneToStandard } = useFretBoardStore();
    const { isLocked } = getIsLocked();

    return (
        <>
            <div className="flex py-2">
                <div className="join join-horizontal">
                    <button className="btn btn-xs join-item text-red-400/70 w-10" onClick={() => setLock()}>
                        {isLocked ? lockIcon : unlockIcon}
                    </button>
                    <button
                        className="btn btn-xs join-item text-red-400/70 w-10"
                        onClick={() => tuneDownAll()}
                        disabled={isLocked}
                    >
                        {chevronLeft}
                    </button>
                    <button
                        className="btn btn-xs join-item text-red-400/70 w-10"
                        onClick={() => tuneUpAll()}
                        disabled={isLocked}
                    >
                        {chevronRight}
                    </button>
                </div>
                <button
                    className="btn btn-xs text-red-400/70 ml-4"
                    onClick={() => tuneToStandard()}
                    disabled={isLocked}
                >
                    Reset to standart
                </button>
            </div>
        </>
    );
};
