export interface IScales {
    [key: string]: Record<
        string,
        {
            name: string;
            notes: string[];
        }
    >;
}
export interface ISelectedScale {
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
export interface IGuitarString {
    number: number;
    animationType: EAnimationType | null;
    fret: Record<number, IFret>;
}
export interface IFretBoardState {
    strings: Record<number, IGuitarString>;
}

export interface IHighlightNotesState {
    highlightedNotes: Record<string, { display: boolean; colorNum: number }>;
}

export interface ISettings {
    settings: { isLocked: boolean };
}

export interface ISelectedNote {
    baseNote: string;
    pressedPlace: {
        stringNumber: number;
        fretNumber: number;
    };
}
export interface ISelectedNotes {
    selectedNotes: ISelectedNote[];
}
export interface IFretBoardActions {
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
export type TuneDirection = 1 | -1 | 0;

export type TStore = IFretBoardState &
    IHighlightNotesState &
    IFretBoardActions &
    ISettings &
    ISelectedNotes & {
        selectedScale: ISelectedScale;
        scales: IScales;
    };
