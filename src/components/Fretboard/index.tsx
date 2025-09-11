import { String } from 'components/String';
import { useFretBoardStore } from 'src/store';

export const Fretboard: React.FC = () => {
    const { pressNote, tuneDownNoteByString } = useFretBoardStore();

    return (
        <div className="p-12">
            <div className="m-4">
                <button className="btn btn-neutral" onClick={() => pressNote(0, 0)}>
                    check
                </button>
            </div>
            <div className="m-4">
                <button className="btn btn-neutral" onClick={() => tuneDownNoteByString(6)}>
                    tune down
                </button>
            </div>
            <div className="bg-gray-100 rounded-xl">
                <String stringNumber={1} />
                <String stringNumber={2} />
                <String stringNumber={3} />
                <String stringNumber={4} />
                <String stringNumber={5} />
                <String stringNumber={6} />
            </div>
        </div>
    );
};
