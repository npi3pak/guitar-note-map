import { chevronLeft, chevronRight, lockIcon, unlockIcon } from 'src/components/Icons';
import { useFretBoardStore } from 'src/store';

export const GlobalTuneShift = () => {
    const { tuneUpAll, tuneDownAll, getIsLocked, setLock } = useFretBoardStore();
    const { isLocked } = getIsLocked();

    return (
        <div className="join join-vertical lg:join-horizontal py-2 w-20">
            <button className="btn btn-xs join-item text-red-400/70" onClick={() => tuneDownAll()} disabled={isLocked}>
                {chevronLeft}
            </button>
            <button className="btn btn-xs join-item text-red-400/70" onClick={() => tuneUpAll()} disabled={isLocked}>
                {chevronRight}
            </button>
            <button className="btn btn-xs join-item text-red-400/70" onClick={() => setLock()}>
                {isLocked ? lockIcon : unlockIcon}
            </button>
        </div>
    );
};
