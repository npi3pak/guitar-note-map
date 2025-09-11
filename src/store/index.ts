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
    tuneUpNoteByString: (stringNumber: number) => void;
    tuneDownNoteByString: (stringNumber: number) => void;
    pressNote: (stringNumber: number, fretNumber: number) => void;
    getByString: (stringNumber: number) => string[];
}

const getBaseNote = (note: string) => note.replace(/[0-9]/, '');

const getNoteListSlice = (initialNote: string, sliceLen: number = 12) =>
    FULL_NOTES.slice(FULL_NOTES.indexOf(initialNote), FULL_NOTES.indexOf(initialNote) + sliceLen);

const getInitialFretList = (baseNote: string) =>
    getNoteListSlice(baseNote).reduce((acc, item, index) => {
        return {
            ...acc,
            [index]: {
                name: item,
                baseNote: getBaseNote(item),
                pressed: false,
                similar: false,
            },
        };
    }, {});

const updateStringFrets = (tuneNote: string) => (fret: Record<number, IFret>) => {
    const notesToTune = getNoteListSlice(tuneNote);

    return Object.entries(fret).reduce(
        (acc, [fretNumStr, data]) => {
            const fretNum = Number(fretNumStr);
            acc[fretNum] = {
                ...data,
                name: notesToTune[fretNum],
                baseNote: getBaseNote(notesToTune[fretNum]),
            };
            return acc;
        },
        {} as Record<number, IFret>,
    );
};

export const useFretBoardStore = create<IFretBoardState & IFretBoardActions>((set, get) => {
    return {
        strings: {
            1: {
                number: 1,
                fret: getInitialFretList('E4'),
            },
            2: {
                number: 2,
                fret: getInitialFretList('B3'),
            },
            3: {
                number: 3,
                fret: getInitialFretList('G3'),
            },
            4: {
                number: 4,
                fret: getInitialFretList('D3'),
            },
            5: {
                number: 5,
                fret: getInitialFretList('A2'),
            },
            6: {
                number: 6,
                fret: getInitialFretList('E2'),
            },
        },
        getByString: (stringNumber) => {
            const selectedString = get().strings[stringNumber].fret;

            return Object.entries(selectedString).map(([fretNum, data]) => data.name);
        },
        tuneUpNoteByString: (stringNumber) =>
            set((state) => {
                const currentTuneNote = state.strings[stringNumber].fret[0].name;
                const noteToTune = FULL_NOTES[FULL_NOTES.indexOf(currentTuneNote) + 1];

                const updatedString = R.modifyPath(
                    [stringNumber, 'fret'],
                    updateStringFrets(noteToTune),
                    state.strings,
                );

                return {
                    strings: {
                        ...updatedString,
                    },
                };
            }),
        tuneDownNoteByString: (stringNumber) =>
            set((state) => {
                const currentTuneNote = state.strings[stringNumber].fret[0].name;
                const noteToTune = FULL_NOTES[FULL_NOTES.indexOf(currentTuneNote) - 1];

                const updatedString = R.modifyPath(
                    [stringNumber, 'fret'],
                    updateStringFrets(noteToTune),
                    state.strings,
                );

                return {
                    strings: {
                        ...updatedString,
                    },
                };
            }),
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
