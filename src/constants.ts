export const Note = {
    E: 'e',
    F: 'f',
    F_sharp: 'f#',
    G: 'g',
    G_sharp: 'g#',
    A: 'a',
    A_sharp: 'a#',
    B: 'b',
    C: 'c',
    D: 'd',
} as const;

export const ALL_NOTES = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];

export type Note = (typeof Note)[keyof typeof Note];
