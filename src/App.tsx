import { Fretboard } from 'components/Fretboard';
import { Footer } from 'components/Footer';
import { TopPanels } from 'components/TopPanels';
import { NavBar } from './components/Navbar';
import { MobileTopMenu } from './components/MobileTopMenu';

const COLORS = {
    MAIN_BG: 'bg-base-200',
};

function App() {
    return (
        <div className={`flex flex-col min-h-screen min-h-[100dvh] ${COLORS.MAIN_BG}`} data-theme="pastel2">
            <MobileTopMenu />
            <NavBar />
            <main className="flex-grow flex flex-col mt-4">
                <TopPanels />
                <Fretboard />
            </main>
            <Footer />
        </div>
    );
}

export default App;
