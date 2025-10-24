import classnames from 'classnames';

import styles from './styles.module.css';

export const FretTopNum = () => (
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
