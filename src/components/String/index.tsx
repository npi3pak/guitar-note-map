import classnames from 'classnames';
import { useFretBoardStore } from 'src/store';

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
    stringNumber: number;
}

export const String: React.FC<IProps> = ({ stringNumber = 1 }) => {
    const { getByString } = useFretBoardStore();
    const [baseNote, ...notes] = getByString(stringNumber);

    return (
        <>
            <div className="p-1 flex items-center">
                <div className="rounded-l w-15">
                    <span className="text-gray-600/50 dark:text-sky-400/50">{baseNote}</span>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-400/25"></div>
                    <div className="flex text-center">
                        {notes.map((note, index) => (
                            <div
                                className={classnames(
                                    `border-r-4 border-blue-400 flex justify-center ${getFlexClass(index)}`,
                                )}
                                key={index}
                            >
                                <span className="relative z-10 text-blue-600/50 dark:text-sky-400/50">{note}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
