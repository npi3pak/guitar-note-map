import classnames from 'classnames';
import { String } from 'components/String';
import { StringsTuneShift } from 'src/components/Fretboard/StringsTuneShift';
import { StringsCountOptions } from 'components/Fretboard/StringsCountOptions';
import { useFretBoardStore } from 'src/store';
import styles from './styles.module.css';
import React from 'react';

interface IProps {
    m4l?: boolean;
}

const FretTopNum = () => (
    <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => {
            const isMarker = [3, 5, 7, 9].includes(index);

            return (
                <div
                    key={index}
                    className={classnames(styles.fretMarkers, {
                        [styles.fretMarkersRound]: isMarker,
                    })}
                >
                    {index}
                </div>
            );
        })}
    </>
);

export const Fretboard: React.FC<IProps> = ({ m4l = false }) => {
    const { getStringsCount, resetPressedNotes } = useFretBoardStore();
    const stringsCount = getStringsCount();

    React.useEffect(() => {
        resetPressedNotes();
    }, []);

    if (m4l) {
        return (
            <div className={styles.fretboardContainer}>
                <div className={styles.fretboard}>
                    <div />
                    <FretTopNum />
                    {[...Array(stringsCount).keys()].map((stringNum, item) => (
                        <String stringNumber={stringNum + 1} key={item} m4l />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.fretboardContainer}>
            <div className="bg-base-100 rounded-box p-4 overflow-x-auto card card-border border-base-300">
                <div className={styles.fretboard}>
                    <StringsCountOptions />
                    <FretTopNum />
                    {[...Array(stringsCount).keys()].map((stringNum, item) => (
                        <String stringNumber={stringNum + 1} key={item} />
                    ))}
                </div>
                <StringsTuneShift />
            </div>
        </div>
    );
};
