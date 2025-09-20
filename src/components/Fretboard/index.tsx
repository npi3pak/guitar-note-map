import classnames from 'classnames';
import { String } from 'components/String';
import { GlobalTuneShift } from 'components/Fretboard/GlobalTuneShift';
import { StringsCountOptions } from 'components/Fretboard/StringsCountOptions';
import { useFretBoardStore } from 'src/store';
import styles from './styles.module.css';

export const Fretboard: React.FC = () => {
    const { getStringsCount } = useFretBoardStore();
    const stringsCount = getStringsCount();

    return (
        <div className="p-12">
            <div className="bg-gray-100 rounded-xl p-4 overflow-x-scroll">
                <div className={styles.fretboard}>
                    <StringsCountOptions />
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
                        const isMarker = [3, 5, 7, 9].includes(index);

                        return (
                            <div
                                key={index}
                                className={classnames(
                                    'flex items-center justify-center self-center justify-self-center text-red-500/50 font-bold',
                                    {
                                        'rounded-full w-6 h-6 bg-blue-200/50': isMarker,
                                    },
                                )}
                            >
                                {index}
                            </div>
                        );
                    })}
                    {[...Array(stringsCount).keys()].map((stringNum) => (
                        <String stringNumber={stringNum + 1} />
                    ))}
                </div>
                <GlobalTuneShift />
            </div>
        </div>
    );
};
