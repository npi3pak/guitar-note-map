import { Fretboard } from 'components/Fretboard';
import { Footer } from 'components/Footer';
import { TopPanels } from 'components/TopPanels';
import { NavBar } from './components/Navbar';
import { MobileTopMenu } from './components/MobileTopMenu';
import { ThemeProvider } from './hooks/useTheme/ThemeProvider';
import { webColors } from './hooks/useTheme/colors.ts';

const COLORS = {
    MAIN_BG: 'bg-base-200',
};

function App() {
    return (
        <ThemeProvider theme={webColors}>
            <div className={`flex flex-col min-h-[100dvh] ${COLORS.MAIN_BG}`} data-theme="pastel2">
                <MobileTopMenu />
                <NavBar />
                <main className="flex-grow flex flex-col mt-4">
                    <TopPanels />
                    <Fretboard />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
