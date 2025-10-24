import React from 'react';
import classnames from 'classnames';
import { String } from 'components/String';
import { StringsTuneShift } from 'src/components/Fretboard/StringsTuneShift';
import { StringsCountOptions } from 'components/Fretboard/StringsCountOptions';
import { useFretBoardStore } from 'src/store';
import styles from './styles.module.css';
import { FretboardContext } from './FretboardContext';
import { FretTopNum } from './FretTopNum';

interface IProps {
    m4l?: boolean;
}

export interface FretboardContextValue {
    m4l: boolean;
}

export const Fretboard: React.FC<IProps> = ({ m4l = false }) => {
    const { getStringsCount, resetPressedNotes } = useFretBoardStore();
    const stringsCount = getStringsCount();

    React.useEffect(() => {
        resetPressedNotes();
    }, []);

    return (
        <FretboardContext.Provider value={{ m4l }}>
            <div className={styles.fretboard}>
                {m4l ? <div /> : <StringsCountOptions />}
                <FretTopNum />
                {[...Array(stringsCount).keys()].map((stringNum, item) => (
                    <String stringNumber={stringNum + 1} key={item} m4l={m4l} />
                ))}
            </div>
            {!m4l && <StringsTuneShift />}
        </FretboardContext.Provider>
    );
};

export const FretboardAppContainer = () => (
    <div className={classnames(styles.fretboardContainer)}>
        <div className="bg-base-100 rounded-box p-4 overflow-x-auto card card-border border-base-300">
            <Fretboard />
        </div>
    </div>
);

export const FretboardM4LContainer = () => (
    <div className={styles.fretboardContainer}>
        <Fretboard m4l />
    </div>
);
