import { TopDrawer } from 'components/TopDrawer';
import { NoteSelector } from '../NoteSelector';
import { ScaleSelector } from '../ScaleSelector';

export const MobileTopMenu = () => {
    return (
        <TopDrawer>
            <div className="py-2 card border-base-300">
                <NoteSelector />
            </div>
            <div className="py-2 card border-base-300">
                <ScaleSelector />
            </div>
        </TopDrawer>
    );
};
