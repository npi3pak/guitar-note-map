import { String } from 'components/String';
import { Note } from 'src/constants';

export const Fretboard: React.FC = () => {
    return (
        <div className="p-12">
            <div className="bg-gray-100 rounded-xl">
                <String baseNote={Note.E} />
                <String baseNote={Note.B} />
                <String baseNote={Note.G} />
                <String baseNote={Note.D} />
                <String baseNote={Note.A} />
                <String baseNote={Note.E} />
            </div>
        </div>
    );
};
