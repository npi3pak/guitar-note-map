import { String } from 'components/String';
import { GlobalTuneShift } from 'components/Fretboard/GlobalTuneShift';
import { useFretBoardStore } from 'src/store';

export const Fretboard: React.FC = () => {
    const { pressNote, tuneDownNoteByString } = useFretBoardStore();

    return (
        <div className="p-12">
            <div className="bg-gray-100 rounded-xl p-4">
                {GlobalTuneShift()}
                <div>
                    <String stringNumber={1} />
                    <String stringNumber={2} />
                    <String stringNumber={3} />
                    <String stringNumber={4} />
                    <String stringNumber={5} />
                    <String stringNumber={6} />
                </div>
            </div>
        </div>
    );
};
