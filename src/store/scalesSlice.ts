import * as R from 'ramda';
import { ALL_NOTES, BASE_SCALES } from 'src/constants';

export const generateNote = (scale, targetRoot) => {
    const baseIndex = ALL_NOTES.indexOf('C');
    const shift = ALL_NOTES.indexOf(targetRoot) - baseIndex;

    return scale.map((n) => ALL_NOTES[(ALL_NOTES.indexOf(n) + shift + ALL_NOTES.length) % ALL_NOTES.length]);
};

const availableScaleList = Object.keys(BASE_SCALES);

const buildScalesByNote = (note: string) =>
    availableScaleList.reduce((acc, item) => {
        return {
            ...acc,
            [item]: {
                name: item,
                notes: generateNote(BASE_SCALES[item], note),
                makeAsFiltered: false,
            },
        };
    }, {});

const containsAllNotesInScale = (scaleNotes, targetNotes) => targetNotes.every((el) => scaleNotes.includes(el));

export const scalesSlice = (set, get) => ({
    scales: {
        C: { ...buildScalesByNote('C') },
        'C#': { ...buildScalesByNote('C#') },
        D: { ...buildScalesByNote('D') },
        'D#': { ...buildScalesByNote('D#') },
        E: { ...buildScalesByNote('E') },
        F: { ...buildScalesByNote('F') },
        'F#': { ...buildScalesByNote('F#') },
        G: { ...buildScalesByNote('G') },
        'G#': { ...buildScalesByNote('G#') },
        A: { ...buildScalesByNote('A') },
        'A#': { ...buildScalesByNote('A#') },
        B: { ...buildScalesByNote('B') },
    },
    selectedScale: {
        selectedKey: null,
        selectedScaleName: null,
        isDisplayed: false,
        isFiltered: false,
    },
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
    setScaleKey: (selectedKey) => {
        set((state) => {
            const isDisplayed = !!selectedKey && !!state.selectedScale.selectedScaleName;

            return {
                selectedScale: {
                    ...state.selectedScale,
                    selectedKey,
                    isDisplayed: isDisplayed ? true : state.selectedScale.isDisplayed,
                },
            };
        });

        get().updateNotesInScale();
    },
    setScaleName: (selectedScaleName) => {
        set((state) => {
            const isDisplayed = !!selectedScaleName && !!state.selectedScale.selectedKey;

            return {
                selectedScale: {
                    ...state.selectedScale,
                    selectedScaleName,
                    isDisplayed: isDisplayed ? true : state.selectedScale.isDisplayed,
                },
            };
        });

        get().updateNotesInScale();
    },
    resetScale: () =>
        set((state) => {
            return {
                selectedScale: {
                    ...state.selectedScale,
                    selectedKey: null,
                    selectedScaleName: null,
                    isDisplayed: false,
                },
            };
        }),
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

            return { scales: updatedScales };
        }),
});
