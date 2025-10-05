const colors = require('tailwindcss/colors');

module.exports = {
    theme: {
        extend: {
            colors: {
                'note-c': colors.blue[200],
                'note-c-diez': colors.red[200],
                'note-d': colors.green[200],
                'note-d-diez': colors.yellow[200],
                'note-e': colors.purple[200],
                'note-f': colors.pink[200],
                'note-f-diez': colors.indigo[200],
                'note-g': colors.teal[200],
                'note-g-diez': colors.orange[200],
                'note-a': colors.lime[200],
                'note-a-diez': colors.cyan[200],
                'note-b': colors.rose[200],

                'piano-white': colors.white,
                'piano-black': colors.black,
                'ableton-gray': '#a5a5a5',
                'ableton-gray-light': '#cfcfcf',
                'ableton-border-gray': '#6e6e6e',
                'ableton-accent-light': '#00cadb',
                'ableton-accent-light': '#07eeff',
                'ableton-black': '#242424',
                'ableton-orange': '#feb903',
            },
        },
    },
};
