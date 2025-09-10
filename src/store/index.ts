import { create } from 'zustand';
import * as R from 'ramda';
import { FULL_NOTES } from 'src/constants';

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

const getNoteListSlice = (initialNote: string, sliceLen: number = 12) =>
    FULL_NOTES.slice(FULL_NOTES.indexOf(initialNote), FULL_NOTES.indexOf(initialNote) + sliceLen);

const getFretList = (baseNote: string) =>
    getNoteListSlice(baseNote).reduce((acc, item, index) => {
        return {
            ...acc,
            [index]: {
                name: item,
                baseNote: item.replace(/[0-9]/, ''),
                pressed: false,
                similar: false,
            },
        };
    }, {});

export const useFretBoardStore = create<IFretBoardState & IFretBoardActions>((set) => {
    return {
        strings: {
            0: {
                number: 1,
                fret: getFretList('E4'),
            },
            1: {
                number: 2,
                fret: getFretList('B3'),
            },
            2: {
                number: 3,
                fret: getFretList('G3'),
            },
            3: {
                number: 4,
                fret: getFretList('D3'),
            },
            4: {
                number: 5,
                fret: getFretList('A2'),
            },
            5: {
                number: 6,
                fret: getFretList('E2'),
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
