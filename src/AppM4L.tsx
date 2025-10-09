import { Fretboard } from 'components/Fretboard';
import { M4lMenu } from './components/M4lMenu';
import { ThemeProvider } from './hooks/useTheme/ThemeProvider';
import { m4lColors } from './hooks/useTheme/colors.ts';

function App() {
    return (
        <ThemeProvider theme={m4lColors}>
            <div className="flex flex-row bg-ableton-gray items-center">
                <M4lMenu />
                <Fretboard m4l />
            </div>
        </ThemeProvider>
    );
}

export default App;
