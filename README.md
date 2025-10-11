# Guitar Note Map

An interactive guitar fretboard visualization tool with scales, notes, and chord reference. Perfect for guitarists of all levels to learn and practice.

## Features

- **Interactive fretboard** with customizable string count (4-8 strings)
- **Scale visualization** with support for various modes (major, minor, pentatonic, blues, etc.)
- **Tuning options** with individual string pitch adjustment
- **Note search** across the entire fretboard
- **Piano integration** for note reference

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development
- **Tailwind CSS** + **DaisyUI** for styling
- **Zustand** for state management
- **Framer Motion** for animations
- **Lucide React** for icons

## Project Structure

```
src/
├── components/           # React components
│   ├── Fretboard/       # Main fretboard component
│   ├── String/          # String component
│   ├── ScaleSelector/   # Scale selection
│   ├── NoteSelector/    # Note selection
│   ├── Piano/           # Virtual piano
│   └── ...
├── store/               # Zustand store
│   ├── scalesSlice.ts   # Scale state management
│   ├── stringsSlice.ts  # String state management
│   └── interfaces.ts    # TypeScript interfaces
├── hooks/               # Custom hooks
│   └── useTheme/        # Theme management
├── constants.ts         # Constants (notes, scales)
└── App.tsx             # Main application
```

## 🎵 Supported Scales

- **Major and minor** (natural, harmonic, melodic)
- **Pentatonic** (major and minor)
- **Blues scale**
- **Church modes** (dorian, phrygian, lydian, mixolydian, locrian)

## Configuration

### String Count
- Support for 4 to 8 strings
- Standard tuning: E4, B3, G3, D3, A2, E2, B1, F#1

### Tuning Options
- Individual string tuning
- Half-step up/down adjustment
- Reset to standard tuning

### Themes
Themes are configured in `src/hooks/useTheme/colors.ts`:
- `webColors` - for web version
- `m4lColors` - for M4L version

### Scales
Add new scales in `src/constants.ts` in the `BASE_SCALES` object.

### Linting
```bash
npm run lint        # ESLint
npm run lint:ts     # TypeScript check
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

*Note: This project also supports an M4L (Max for Live) plugin version for Ableton Live integration.*