import { create } from 'zustand';
import * as R from 'ramda';

interface IFret {
    name: string;
    baseNote: string;
    pressed: boolean;
    similar: boolean;
}

interface IGuitarString {
    number: number;
    fret: Record<number, IFret>;
}

interface IFretBoardState {
    strings: Record<number, IGuitarString>;
}

interface IFretBoardActions {
    pressNote: (stringNumber: number, fretNumber: number) => void;
}

export const useFretBoardStore = create<IFretBoardState & IFretBoardActions>((set) => {
    return {
        strings: {
            0: {
                number: 1,
                fret: {
                    0: {
                        name: 'E1',
                        baseNote: 'E',
                        pressed: false,
                        similar: false,
                    },
                },
            },
        },
        pressNote: (stringNumber, fretNumber) =>
            set((state) => {
                const updatedString = R.modifyPath([stringNumber, 'fret', fretNumber, 'pressed'], R.not, state.strings);

                return {
                    strings: {
                        ...updatedString,
                    },
                };
            }),
    };
});
