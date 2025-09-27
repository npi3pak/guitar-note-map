import { create } from 'zustand';
import * as R from 'ramda';
import { ALL_NOTES, BASE_SCALES, FULL_NOTES, STANDARD_TUNE } from 'src/constants';
import { persist } from 'zustand/middleware';

interface IScales {
    [key: string]: Record<
        string,
        {
            name: string;
            notes: string[];
        }
    >;
}

interface ISelectedScale {
    selectedKey: string | null;
    selectedScaleName: string | null;
    isDisplayed: boolean;
    isFiltered: boolean;
}

export interface IFret {
    note: string;
    baseNote: string;
    pressed: boolean;
    isNoteInScale: boolean;
    animationType?: string;
}

export enum EAnimationType {
    leftShift = 'leftShift',
    rightShift = 'rightShift',
}

interface IGuitarString {
    number: number;
    animationType: EAnimationType | null;
    fret: Record<number, IFret>;
}

interface IFretBoardState {
    strings: Record<number, IGuitarString>;
}

export interface IHighlightNotesState {
    highlightedNotes: Record<string, { display: boolean; colorNum: number }>;
}

interface ISettings {
    settings: { isLocked: boolean };
}

interface ISelectedNote {
    baseNote: string;
    pressedPlace: {
        stringNumber: number;
        fretNumber: number;
    };
}

interface ISelectedNotes {
    selectedNotes: ISelectedNote[];
}

interface IFretBoardActions {
    setLock: () => void;
    getIsLocked: () => ISettings['settings'];
    getSelectedNotes: () => void;
    resetHighlightedNotes: () => void;
    resetPressedNotes: () => void;
    tuneUpAll: () => void;
    tuneDownAll: () => void;
    tuneToStandard: () => void;
    tuneUpNoteByString: (stringNumber: number) => void;
    tuneDownNoteByString: (stringNumber: number) => void;
    pressNote: (stringNumber: number, fretNumber: number) => void;
    getByString: (stringNumber: number) => Partial<IFret>[];
    getHighlightNotes: () => IHighlightNotesState['highlightedNotes'];
    getStringsCount: () => number;
    decStrings: () => void;
    incStrings: () => void;
    addHoverNote: (baseNote: string) => void;
    removeHoverNote: (baseNote: string) => void;
    getAllScaleNames: () => void;
    setScaleKey: (selectedKey: string) => void;
    setScaleName: (selectedScaleName: string) => void;
    toggleScaleDisplay: () => void;
    getScale: () => ISelectedScale;
    getScaleNotesByKeyName: () => string[] | [];
    updateNotesInScale: () => void;
    resetNotes: () => void;
}

type TuneDirection = 1 | -1 | 0;
type TStore = IFretBoardState &
    IHighlightNotesState &
    IFretBoardActions &
    ISettings &
    ISelectedNotes & {
        selectedScale: ISelectedScale;
        scales: IScales;
    };

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

export const toggleInArray = (arr, item) => (R.includes(item, arr) ? R.without([item], arr) : R.append(item, arr));

const containsAllNotesInScale = (scaleNotes, targetNotes) => targetNotes.every((el) => scaleNotes.includes(el));

export const generateNote = (scale, targetRoot) => {
    const baseIndex = ALL_NOTES.indexOf('C'); // где находится C в текущем массиве
    const shift = ALL_NOTES.indexOf(targetRoot) - baseIndex;

    return scale.map((n) => ALL_NOTES[(ALL_NOTES.indexOf(n) + shift + ALL_NOTES.length) % ALL_NOTES.length]);
};

export const useFretBoardStore = create<TStore>()(
    persist(
        (set, get) => {
            const initialScale = {
                C: {
                    minor_test: {
                        name: 'minor_test',
                        notes: ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'],
                        makeAsFiltered: false,
                    },
                    major: {
                        name: 'major',
                        notes: generateNote(BASE_SCALES['major'], 'C'),
                        makeAsFiltered: false,
                    },
                    minor: {
                        name: 'minor',
                        notes: generateNote(BASE_SCALES['minor'], 'C'),
                        makeAsFiltered: false,
                    },
                    harmonicMinor: {
                        name: 'harmonicMinor',
                        notes: generateNote(BASE_SCALES['harmonicMinor'], 'C'),
                        makeAsFiltered: false,
                    },
                    melodicMinor: {
                        name: 'melodicMinor',
                        notes: generateNote(BASE_SCALES['melodicMinor'], 'C'),
                        makeAsFiltered: false,
                    },
                    pentatonicMajor: {
                        name: 'pentatonicMajor',
                        notes: generateNote(BASE_SCALES['pentatonicMajor'], 'C'),
                        makeAsFiltered: false,
                    },
                    phrygian: {
                        name: 'phrygian',
                        notes: generateNote(BASE_SCALES['phrygian'], 'C'),
                        makeAsFiltered: false,
                    },
                    dorian: {
                        name: 'dorian',
                        notes: generateNote(BASE_SCALES['dorian'], 'C'),
                        makeAsFiltered: false,
                    },
                    lydian: {
                        name: 'lydian',
                        notes: generateNote(BASE_SCALES['lydian'], 'C'),
                        makeAsFiltered: false,
                    },
                    mixolydian: {
                        name: 'mixolydian',
                        notes: generateNote(BASE_SCALES['mixolydian'], 'C'),
                        makeAsFiltered: false,
                    },
                    locrian: {
                        name: 'locrian',
                        notes: generateNote(BASE_SCALES['locrian'], 'C'),
                        makeAsFiltered: false,
                    },
                },
                D: {
                    minor: {
                        name: 'minor',
                        notes: ['D', 'E', 'F', 'G', 'A', 'A#', 'C'],
                        makeAsFiltered: false,
                    },
                },
            };

            const initialSelectedScale = {
                selectedKey: null,
                selectedScaleName: null,
                isDisplayed: false,
                isFiltered: false,
            };

            const initialHighlightedNotes = {
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

            return {
                scales: initialScale,
                selectedScale: initialSelectedScale,
                selectedNotes: [],
                highlightedNotes: initialHighlightedNotes,
                settings: {
                    isLocked: true,
                },
                strings: initialStrings,

                getScale: () => get().selectedScale,
                getScales: () => get().scales,
                getScaleNotesByKeyName: () => {
                    const selectedKey = get().selectedScale.selectedKey;
                    const selectedScaleName = get().selectedScale.selectedScaleName;

                    if (selectedKey && selectedScaleName) {
                        return get().scales[selectedKey][selectedScaleName].notes;
                    }

                    return [];
                },
                setScaleKey: (selectedKey) =>
                    set((state) => ({
                        selectedScale: { ...state.selectedScale, selectedKey },
                    })),
                setScaleName: (selectedScaleName) =>
                    set((state) => ({
                        selectedScale: { ...state.selectedScale, selectedScaleName },
                    })),
                toggleScaleFilter: () =>
                    set((state) => {
                        const isScaleFiltered = !state.selectedScale.isFiltered;
                        get().updateFilteredScale(isScaleFiltered);

                        return {
                            selectedScale: { ...state.selectedScale, isFiltered: isScaleFiltered },
                        };
                    }),
                updateFilteredScale: (isFiltered) =>
                    set((state) => {
                        const updatedScales = R.mapObjIndexed(
                            (scaleGroup) =>
                                R.mapObjIndexed((scaleNameItem) => ({
                                    ...scaleNameItem,
                                    makeAsFiltered: isFiltered
                                        ? containsAllNotesInScale(scaleNameItem.notes, get().getUniqSelectedNotes())
                                        : false,
                                }))(scaleGroup),
                            state.scales,
                        );

                        console.log('updatedScales', updatedScales);

                        return { scales: updatedScales };
                    }),
                toggleScaleDisplay: () =>
                    set((state) => {
                        get().updateNotesInScale();

                        return {
                            selectedScale: { ...state.selectedScale, isDisplayed: !state.selectedScale.isDisplayed },
                        };
                    }),
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
                resetHighlightedNotes: () =>
                    set(() => ({
                        highlightedNotes: initialHighlightedNotes,
                    })),
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
                resetNotes: () => {
                    get().resetPressedNotes();
                    get().resetHighlightedNotes();
                },
                getByString: (stringNumber) => {
                    const selectedString = get().strings[stringNumber].fret;
                    const animationType = get().strings[stringNumber].animationType;

                    return Object.entries(selectedString).map(([fretNum, data]) => ({
                        note: data.note,
                        baseNote: data.baseNote,
                        pressed: data.pressed,
                        isNoteInScale: data.isNoteInScale,
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
                getSelectedNotes: () => get().selectedNotes,
                getUniqSelectedNotes: () => [...new Set(get().selectedNotes.map((item) => item.baseNote))],
                getStringsCount: () => Number(Object.keys(get().strings).length),
                incStrings: () =>
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
                    }),
                decStrings: () =>
                    set((state) => {
                        const lastStringNum = Number(Object.keys(state.strings).length);

                        if (lastStringNum > 1) {
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
                    }),
                tuneToStandard: () => {
                    get().resetNotes();
                    return set((state) => ({
                        strings: {
                            [1]: updateStringTune(state.strings, 1, 0, 'E4'),
                            [2]: updateStringTune(state.strings, 2, 0, 'B3'),
                            [3]: updateStringTune(state.strings, 3, 0, 'G3'),
                            [4]: updateStringTune(state.strings, 4, 0, 'D3'),
                            [5]: updateStringTune(state.strings, 5, 0, 'A2'),
                            [6]: updateStringTune(state.strings, 6, 0, 'E2'),
                        },
                    }));
                },
                tuneUpAll: () => {
                    get().resetNotes();

                    return set((state) => ({
                        strings: Object.keys(state.strings).reduce(
                            (acc, stringNum) => ({
                                ...acc,
                                [stringNum]: updateStringTune(state.strings, Number(stringNum), +1),
                            }),
                            {},
                        ),
                    }));
                },
                tuneDownAll: () => {
                    get().resetNotes();
                    return set((state) => ({
                        strings: Object.keys(state.strings).reduce(
                            (acc, stringNum) => ({
                                ...acc,
                                [stringNum]: updateStringTune(state.strings, Number(stringNum), -1),
                            }),
                            {},
                        ),
                    }));
                },
                tuneUpNoteByString: (stringNumber) => {
                    get().resetNotes();
                    return set((state) => ({
                        strings: {
                            ...state.strings,
                            [stringNumber]: updateStringTune(state.strings, stringNumber, +1),
                        },
                    }));
                },
                tuneDownNoteByString: (stringNumber) => {
                    get().resetNotes();
                    return set((state) => ({
                        strings: {
                            ...state.strings,
                            [stringNumber]: updateStringTune(state.strings, stringNumber, -1),
                        },
                    }));
                },
                pressNote: (stringNumber, fretNumber) =>
                    set((state) => {
                        const updatedString = R.modifyPath(
                            [stringNumber, 'fret', fretNumber, 'pressed'],
                            R.not,
                            state.strings,
                        );
                        const baseNote = state.strings[stringNumber].fret[fretNumber].baseNote;

                        const updatedHighlightedNotes = {
                            ...state.highlightedNotes,
                            [baseNote]: {
                                ...state.highlightedNotes[baseNote],
                                display: !state.highlightedNotes[baseNote].display,
                            },
                        };

                        get().updateFilteredScale(get().selectedScale.isFiltered);

                        const pressedNote = {
                            baseNote,
                            pressedPlace: {
                                stringNumber,
                                fretNumber,
                            },
                        };

                        return {
                            selectedNotes: toggleInArray(state.selectedNotes, pressedNote),
                            highlightedNotes: {
                                ...updatedHighlightedNotes,
                            },
                            strings: {
                                ...updatedString,
                            },
                        };
                    }),
                addHoverNote: (baseNote: string) =>
                    set((state) => {
                        const updatedHighlightedNotes = R.modifyPath<IHighlightNotesState['highlightedNotes']>(
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
                removeHoverNote: (baseNote: string) =>
                    set((state) => {
                        const updatedHighlightedNotes = R.modifyPath<IHighlightNotesState['highlightedNotes']>(
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
        },
        { name: 'fretboard-storage', partialize: (state) => ({ strings: state.strings }) },
    ),
);
