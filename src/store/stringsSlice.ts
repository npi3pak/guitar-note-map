import * as R from 'ramda';
import { FULL_NOTES, STANDARD_TUNE } from 'src/constants';
import {
    EAnimationType,
    type IFret,
    type IGuitarString,
    type TStore,
    type TStringSlice,
    type TuneDirection,
} from './interfaces';
import type { StateCreator } from 'zustand';

export const getBaseNote = (note: string) => note.replace(/[0-9]/, '');

const getNoteListSlice = (initialNote: string, sliceLen: number = 12) =>
    FULL_NOTES.slice(FULL_NOTES.indexOf(initialNote), FULL_NOTES.indexOf(initialNote) + sliceLen);

export const toggleInArray = (arr, item) => (R.includes(item, arr) ? R.without([item], arr) : R.append(item, arr));

const getInitialFretList = (baseNote: string) =>
    getNoteListSlice(baseNote).reduce((acc, item, index) => {
        return {
            ...acc,
            [index]: {
                note: item,
                baseNote: getBaseNote(item),
                pressed: false,
                isNoteInScale: false,
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
    const isStringExists = !!strings[stringNumber];

    if (!isStringExists) {
        const newZeroFretNote = targetNote || STANDARD_TUNE[stringNumber - 1];

        return {
            number: 1,
            animationType: null,
            fret: getInitialFretList(newZeroFretNote),
        };
    }

    const currentTuneNote = strings[stringNumber].fret[0].note;
    const noteToTune = transposeNote(currentTuneNote, direction, targetNote);

    const stringToUpdate = strings[stringNumber] as IGuitarString;

    const updatedString: IGuitarString = {
        ...stringToUpdate,
        fret: updateStringFrets(noteToTune)(stringToUpdate.fret),
        animationType: direction > 0 ? EAnimationType.leftShift : EAnimationType.rightShift,
    };
    return updatedString;
};

const initialStrings = {
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
};

export const stringsSlice: StateCreator<TStore, [], [], TStringSlice> = (set, get) => ({
    strings: initialStrings,
    updateNotesInScale: () =>
        set((state) => {
            const scaleNotes = get().getScaleNotesByKeyName();

            if (scaleNotes.length) {
                return {
                    strings: R.mapObjIndexed((stringData: IGuitarString) => {
                        const newFrets = R.mapObjIndexed((fret: IFret) => ({
                            ...fret,
                            isNoteInScale: R.includes(fret.baseNote, scaleNotes),
                        }))(stringData.fret);

                        return {
                            ...stringData,
                            fret: newFrets,
                        };
                    }, state.strings),
                };
            }

            return { strings: state.strings };
        }),
    resetPressedNotes: () =>
        set((state) => ({
            selectedNotes: [],
            strings: R.map(
                (guitarString) => ({
                    ...guitarString,
                    fret: R.map(R.assoc('pressed', false), guitarString.fret),
                }),
                state.strings,
            ),
        })),
    resetStringNotesByBaseNote: (baseNote) => {
        set((state) => {
            return {
                strings: R.mapObjIndexed((stringData: IGuitarString) => {
                    const newFrets = R.mapObjIndexed((fret: IFret) => ({
                        ...fret,
                        pressed: fret.baseNote === baseNote ? false : fret.pressed,
                    }))(stringData.fret);

                    return {
                        ...stringData,
                        fret: newFrets,
                    };
                }, state.strings),
            };
        });

        get().removeHighlightNoteByBaseNote(baseNote);
        get().updateFilteredScale();
    },
    getByString: (stringNumber) => {
        const selectedString: Record<string, IFret> = get().strings[stringNumber].fret;
        const animationType = get().strings[stringNumber].animationType;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return Object.entries(selectedString).map(([fretNum, data]) => ({
            note: data.note,
            baseNote: data.baseNote,
            pressed: data.pressed,
            isNoteInScale: data.isNoteInScale,
            animationType,
        }));
    },
    getStringsCount: () => Number(Object.keys(get().strings).length),
    incStrings: () => {
        set((state) => {
            const newStringNum = Number(Object.keys(state.strings).length + 1);

            if (newStringNum < 9) {
                const initialNote = STANDARD_TUNE[newStringNum - 1];

                return {
                    strings: {
                        ...state.strings,
                        [newStringNum]: {
                            number: newStringNum,
                            animationType: null,
                            isNoteInScale: false,
                            fret: getInitialFretList(initialNote),
                        },
                    },
                };
            }

            return {
                strings: {
                    ...state.strings,
                },
            };
        });
        get().updateNotesInScale();
    },
    decStrings: () => {
        set((state) => {
            const lastStringNum = Number(Object.keys(state.strings).length);

            if (lastStringNum > 1) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [lastStringNum]: _, ...restStrings } = state.strings;

                return {
                    strings: {
                        ...restStrings,
                    },
                };
            }

            return {
                strings: {
                    ...state.strings,
                },
            };
        });

        get().updateNotesInScale();
    },
    tuneToStandard: () => {
        get().resetNotes();
        set((state) => ({
            strings: {
                [1]: updateStringTune(state.strings, 1, 0, 'E4'),
                [2]: updateStringTune(state.strings, 2, 0, 'B3'),
                [3]: updateStringTune(state.strings, 3, 0, 'G3'),
                [4]: updateStringTune(state.strings, 4, 0, 'D3'),
                [5]: updateStringTune(state.strings, 5, 0, 'A2'),
                [6]: updateStringTune(state.strings, 6, 0, 'E2'),
            },
        }));

        get().updateNotesInScale();
    },
    tuneUpAll: () => {
        get().resetNotes();
        set((state) => ({
            strings: Object.keys(state.strings).reduce(
                (acc, stringNum) => ({
                    ...acc,
                    [stringNum]: updateStringTune(state.strings, Number(stringNum), +1),
                }),
                {},
            ),
        }));

        get().updateNotesInScale();
    },
    tuneDownAll: () => {
        get().resetNotes();
        set((state) => ({
            strings: Object.keys(state.strings).reduce(
                (acc, stringNum) => ({
                    ...acc,
                    [stringNum]: updateStringTune(state.strings, Number(stringNum), -1),
                }),
                {},
            ),
        }));

        get().updateNotesInScale();
    },
    tuneUpNoteByString: (stringNumber) => {
        get().resetNotes();
        set((state) => ({
            strings: {
                ...state.strings,
                [stringNumber]: updateStringTune(state.strings, stringNumber, +1),
            },
        }));

        get().updateNotesInScale();
    },
    tuneDownNoteByString: (stringNumber) => {
        get().resetNotes();
        set((state) => ({
            strings: {
                ...state.strings,
                [stringNumber]: updateStringTune(state.strings, stringNumber, -1),
            },
        }));

        get().updateNotesInScale();
    },
    searchNoteAndPress: (baseNote: string) => {
        const strings = get().strings;

        let bestMatch: { stringNumber: number; fretNumber: number } | null = null;

        for (const stringNumberKey in strings) {
            const stringNumber = Number(stringNumberKey);
            const { fret } = strings[stringNumber];

            for (const fretKey in fret) {
                const fretNumber = Number(fretKey);
                const fretNoteBase = fret[fretNumber].baseNote;

                if (fretNoteBase === baseNote) {
                    if (!bestMatch || fretNumber < bestMatch.fretNumber) {
                        bestMatch = { stringNumber, fretNumber };
                    }
                }
            }
        }

        if (bestMatch) {
            get().pressNote(bestMatch.stringNumber, bestMatch.fretNumber);
        }
    },
    pressNote: (stringNumber, fretNumber) =>
        set((state) => {
            const updatedString = R.modifyPath([stringNumber, 'fret', fretNumber, 'pressed'], R.not, state.strings);
            const baseNote = state.strings[stringNumber].fret[fretNumber].baseNote;

            const updatedHighlightedNotes = {
                ...state.highlightedNotes,
                [baseNote]: {
                    ...state.highlightedNotes[baseNote],
                    display: !state.highlightedNotes[baseNote].display,
                },
            };

            get().updateFilteredScale();

            const pressedNote = {
                baseNote,
                pressedPlace: {
                    stringNumber,
                    fretNumber,
                },
            };

            return {
                selectedNotes: toggleInArray(state.selectedNotes, pressedNote) as (typeof pressedNote)[],
                highlightedNotes: {
                    ...updatedHighlightedNotes,
                },
                strings: {
                    ...updatedString,
                },
            };
        }),
});
