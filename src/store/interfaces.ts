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

export type TuneDirection = 1 | -1 | 0;

export interface IScaleState {
    scales: IScales;
    selectedScale: ISelectedScale;
}

export interface IScaleActions {
    getScale: () => ISelectedScale;
    getScales: () => IScales;
    getScaleNotesByKeyName: () => string[] | [];
    setScaleKey: (selectedKey: string | null) => void;
    setScaleName: (selectedScaleName: string | null) => void;
    resetScale: () => void;
    toggleScaleFilter: () => void;
    updateFilteredScale: () => void;
}

export type TScaleSlice = IScaleActions & IScaleState;

export interface IFretBoardState {
    strings: Record<number, IGuitarString>;
}

export interface IStringActions {
    updateNotesInScale: () => void;
    resetPressedNotes: () => void;
    resetStringNotesByBaseNote: (baseNote: string) => void;
    getByString: (stringNumber: number) => {
        note: string;
        baseNote: string;
        pressed: boolean;
        isNoteInScale: boolean;
        animationType: string | null;
    }[];
    getStringsCount: () => number;
    incStrings: () => void;
    decStrings: () => void;
    tuneToStandard: () => void;
    tuneUpAll: () => void;
    tuneDownAll: () => void;
    tuneUpNoteByString: (stringNumber: number) => void;
    tuneDownNoteByString: (stringNumber: number) => void;
    pressNote: (stringNumber: number, fretNumber: number) => void;
}

export type TStringSlice = IStringActions & IFretBoardState;

export interface ISettings {
    settings: {
        isLocked: boolean;
    };
}

export interface IRootState {
    selectedNotes: ISelectedNote[];
    highlightedNotes: IHighlightNotesState['highlightedNotes'];
}

export interface IRootActions {
    resetHighlightedNotes: () => void;
    resetNotes: () => void;
    setLock: () => void;
    getIsLocked: () => { isLocked: boolean };
    getHighlightNotes: () => IHighlightNotesState['highlightedNotes'];
    getSelectedNotes: () => ISelectedNote[];
    getUniqSelectedNotes: () => string[];
    removeHighlightNoteByBaseNote: (baseNote: string) => void;
    addHoverNote: (baseNote: string) => void;
    removeHoverNote: (baseNote: string) => void;
}

export type TRootSlice = IRootActions & IRootState & ISettings;

export type TStore = TScaleSlice & TStringSlice & TRootSlice;
