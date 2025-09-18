import { create } from 'zustand';
import * as R from 'ramda';
import { FULL_NOTES } from 'src/constants';
import { persist } from 'zustand/middleware';

interface IFret {
    note: string;
    baseNote: string;
    pressed: boolean;
    similar: boolean;
}

interface IGuitarString {
    number: number;
    animationType: 'leftShift' | 'rightShift';
    fret: Record<number, IFret>;
}

interface IFretBoardState {
    strings: Record<number, IGuitarString>;
}

export interface IHighlightNotesState {
    highlightedNotes: Record<string, { display: boolean; colorNum: number }>;
}

interface IFretBoardActions {
    tuneUpAll: () => void;
    tuneDownAll: () => void;
    tuneUpNoteByString: (stringNumber: number) => void;
    tuneDownNoteByString: (stringNumber: number) => void;
    pressNote: (stringNumber: number, fretNumber: number) => void;
    getByString: (stringNumber: number) => Partial<IFret>[];
    getHighlightNotes: () => IHighlightNotesState['highlightedNotes'];
}

const getBaseNote = (note: string) => note.replace(/[0-9]/, '');

const getNoteListSlice = (initialNote: string, sliceLen: number = 12) =>
    FULL_NOTES.slice(FULL_NOTES.indexOf(initialNote), FULL_NOTES.indexOf(initialNote) + sliceLen);

const getInitialFretList = (baseNote: string) =>
    getNoteListSlice(baseNote).reduce((acc, item, index) => {
        return {
            ...acc,
            [index]: {
                note: item,
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
                note: notesToTune[fretNum],
                baseNote: getBaseNote(notesToTune[fretNum]),
            };
            return acc;
        },
        {} as Record<number, IFret>,
    );
};

////// TODO replace to my code

type TuneDirection = 1 | -1 | 0;

const transposeNote = (note: string, direction: TuneDirection, targetNote?: string): string => {
    if (direction === 0 && targetNote) {
        return targetNote;
    }

    const index = FULL_NOTES.indexOf(note);
    if (index === -1) {
        throw new Error(`Unknown note: ${note}`);
    }

    return FULL_NOTES[(index + direction + FULL_NOTES.length) % FULL_NOTES.length];
};

const updateStringTune = (
    strings: Record<number, { fret: Record<number, IFret> }>,
    stringNumber: number,
    direction: TuneDirection,
    targetNote?: string,
): IGuitarString => {
    const currentTuneNote = strings[stringNumber].fret[0].note;
    const noteToTune = transposeNote(currentTuneNote, direction, targetNote);

    const updatedString = R.compose(
        R.modifyPath([stringNumber, 'fret'], updateStringFrets(noteToTune)),
        R.modifyPath([stringNumber, 'animationType'], () => (direction > 0 ? 'leftShift' : 'rightShift')),
    )(strings);

    return updatedString[stringNumber] as IGuitarString;
};

type TStore = IFretBoardState & IHighlightNotesState & IFretBoardActions;

export const useFretBoardStore = create<TStore>()(
    persist((set, get) => {
        return {
            highlightedNotes: {
                C: { display: false, hover: false, colorNum: 1 },
                'C#': { display: false, hover: false, colorNum: 2 },
                D: { display: false, hover: false, colorNum: 3 },
                'D#': { display: false, hover: false, colorNum: 4 },
                E: { display: false, hover: false, colorNum: 5 },
                F: { display: false, hover: false, colorNum: 6 },
                'F#': { display: false, hover: false, colorNum: 7 },
                G: { display: false, hover: false, colorNum: 8 },
                'G#': { display: false, hover: false, colorNum: 9 },
                A: { display: false, hover: false, colorNum: 10 },
                'A#': { display: false, hover: false, colorNum: 11 },
                B: { display: false, hover: false, colorNum: 12 },
            },
            settings: {
                isLocked: true,
            },
            strings: {
                1: {
                    number: 1,
                    animationType: null,
                    fret: getInitialFretList('E4'),
                },
                2: {
                    number: 2,
                    animationType: null,
                    fret: getInitialFretList('B3'),
                },
                3: {
                    number: 3,
                    animationType: null,
                    fret: getInitialFretList('G3'),
                },
                4: {
                    number: 4,
                    animationType: null,
                    fret: getInitialFretList('D3'),
                },
                5: {
                    number: 5,
                    animationType: null,
                    fret: getInitialFretList('A2'),
                },
                6: {
                    number: 6,
                    animationType: null,
                    fret: getInitialFretList('E2'),
                },
            },
            getByString: (stringNumber) => {
                const selectedString = get().strings[stringNumber].fret;
                const animationType = get().strings[stringNumber].animationType;

                return Object.entries(selectedString).map(([fretNum, data]) => ({
                    note: data.note,
                    baseNote: data.baseNote,
                    pressed: data.pressed,
                    animationType,
                }));
            },
            setLock: () =>
                set((state) => ({
                    settings: {
                        isLocked: !state.settings.isLocked,
                    },
                })),
            getIsLocked: () => {
                return { isLocked: get().settings.isLocked };
            },
            getHighlightNotes: () => get().highlightedNotes,
            tuneUpAll: () =>
                set((state) => ({
                    strings: {
                        ...state.strings,
                        [1]: updateStringTune(state.strings, 1, +1),
                        [2]: updateStringTune(state.strings, 2, +1),
                        [3]: updateStringTune(state.strings, 3, +1),
                        [4]: updateStringTune(state.strings, 4, +1),
                        [5]: updateStringTune(state.strings, 5, +1),
                        [6]: updateStringTune(state.strings, 6, +1),
                    },
                })),
            tuneDownAll: () =>
                set((state) => ({
                    strings: {
                        ...state.strings,
                        [1]: updateStringTune(state.strings, 1, -1),
                        [2]: updateStringTune(state.strings, 2, -1),
                        [3]: updateStringTune(state.strings, 3, -1),
                        [4]: updateStringTune(state.strings, 4, -1),
                        [5]: updateStringTune(state.strings, 5, -1),
                        [6]: updateStringTune(state.strings, 6, -1),
                    },
                })),
            tuneUpNoteByString: (stringNumber) =>
                set((state) => {
                    const currentTuneNote = state.strings[stringNumber].fret[0].note;
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
                    const currentTuneNote = state.strings[stringNumber].fret[0].note;
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
                    const updatedString = R.modifyPath(
                        [stringNumber, 'fret', fretNumber, 'pressed'],
                        R.not,
                        state.strings,
                    );
                    const baseNote = state.strings[stringNumber].fret[fretNumber].baseNote;

                    const updatedHighlightedNotes = R.modifyPath([baseNote, 'display'], R.not, state.highlightedNotes);

                    return {
                        highlightedNotes: {
                            ...updatedHighlightedNotes,
                        },
                        strings: {
                            ...updatedString,
                        },
                    };
                }),
            addHoverNote: (baseNote) =>
                set((state) => {
                    const updatedHighlightedNotes = R.modifyPath(
                        [baseNote, 'hover'],
                        () => true,
                        state.highlightedNotes,
                    );

                    return {
                        highlightedNotes: {
                            ...updatedHighlightedNotes,
                        },
                    };
                }),
            removeHoverNote: (baseNote) =>
                set((state) => {
                    const updatedHighlightedNotes = R.modifyPath(
                        [baseNote, 'hover'],
                        () => false,
                        state.highlightedNotes,
                    );

                    return {
                        highlightedNotes: {
                            ...updatedHighlightedNotes,
                        },
                    };
                }),
        };
    }),
    {
        name: 'fretboard-storage',
    },
);
