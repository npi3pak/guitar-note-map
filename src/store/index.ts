import { create } from 'zustand';
import * as R from 'ramda';
import { persist } from 'zustand/middleware';
import type { TStore, IHighlightNotesState } from './interfaces';
import { scalesSlice } from './scalesSlice';
import { stringsSlice } from './stringsSlice';
import { SORTED_ALL_NOTES } from 'src/constants';

const midiToNoteName = (midi) => {
    if (!Number.isFinite(midi) || !Number.isInteger(midi)) {
        throw new TypeError('midi must be an integer');
    }
    if (midi < 0 || midi > 127) {
        throw new RangeError('midi must be in range 0..127');
    }

    return SORTED_ALL_NOTES[midi % 12];
};

const getM4LScale = (rootNote, intervalString) => {
    if (rootNote === undefined || intervalString === undefined) {
        return [];
    }

    const intervals = intervalString.split(' ').map(Number);
    return intervals.map((i) => SORTED_ALL_NOTES[(rootNote + i) % 12]);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).m4l = {
    test: (testStr: string) => {
        console.log(`test ${testStr}`);
    },
    sendMidi: (midiNoteNum: string) => (velocity: string) => {
        const { removeHoverNote, addHoverNote } = useFretBoardStore.getState();

        const baseNote = midiToNoteName(midiNoteNum);

        if (Number(velocity) === 0) {
            removeHoverNote(baseNote);
        }

        if (Number(velocity) > 0) {
            addHoverNote(baseNote);
        }
    },
    setScale: (rootNote) => (intervalString: string) => {
        const { setM4lScaleNotes } = useFretBoardStore.getState();

        const scaledNoteList = getM4LScale(rootNote, intervalString);

        setM4lScaleNotes(scaledNoteList);
    },
};

// TODO: Remove selected notes abstraction

export const useFretBoardStore = create<TStore>()(
    persist(
        (set, get, store) => {
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

            return {
                ...stringsSlice(set, get, store),
                ...scalesSlice(set, get, store),
                selectedNotes: [],
                highlightedNotes: initialHighlightedNotes,
                settings: {
                    isLocked: true,
                },
                resetHighlightedNotes: () =>
                    set(() => ({
                        highlightedNotes: initialHighlightedNotes,
                    })),

                resetNotes: () => {
                    get().resetPressedNotes();
                    get().resetHighlightedNotes();
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
                removeHighlightNoteByBaseNote: (baseNote) => {
                    set((state) => {
                        const updatedHighlightedNotes = {
                            ...state.highlightedNotes,
                            [baseNote]: {
                                ...state.highlightedNotes[baseNote],
                                display: false,
                            },
                        };

                        return {
                            selectedNotes: state.selectedNotes.filter((item) => item.baseNote !== baseNote),
                            highlightedNotes: updatedHighlightedNotes,
                        };
                    });
                },
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
                removeHoverNote: (baseNote: string) => {
                    return set((state) => {
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
                    });
                },
            };
        },
        { name: 'fretboard-storage', partialize: (state) => ({ strings: state.strings }) },
    ),
);
