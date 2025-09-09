import classnames from 'classnames';
import { ALL_NOTES, Note } from 'src/constants';

function getFlexClass(index: number) {
    if (index < 3) {
        return 'flex-1';
    }

    if (index < 6) {
        return 'flex-[0.7]';
    }

    return 'flex-[0.5]';
}

interface IProps {
    baseNote: Note;
}

export const String: React.FC<IProps> = ({ baseNote = Note.E }) => {
    const startIndex = ALL_NOTES.indexOf(baseNote);
    const notes = Array.from({ length: 12 }, (_, i) => ALL_NOTES[(startIndex + i) % ALL_NOTES.length]);

    return (
        <div className="p-1 flex items-center">
            <div className="bg-white px-2 py-1 rounded-l mr-4">{baseNote}</div>

            <div className="flex-1 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-400"></div>

                <div className="flex text-center">
                    {notes.map((note, index) => (
                        <div
                            className={classnames(
                                `bg-blue-100 border-l border-blue-400 flex justify-center ${getFlexClass(index)}`,
                            )}
                            key={index}
                        >
                            <span className="relative z-10">{note}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
