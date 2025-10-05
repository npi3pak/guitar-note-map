import { create } from 'zustand';
import * as R from 'ramda';
import { persist } from 'zustand/middleware';
import type { TStore, IHighlightNotesState } from './interfaces';
import { scalesSlice } from './scalesSlice';
import { stringsSlice } from './stringsSlice';

(window as any).m4l = {
    addHoverNote: (baseNote: string) => {
        const { addHoverNote } = useFretBoardStore.getState();
        addHoverNote(baseNote);
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
