import { Fretboard } from 'components/Fretboard';
import { Footer } from 'components/Footer';
import { TopPanels } from 'components/TopPanels';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col">
                <TopPanels />
                <Fretboard />
            </main>
            <Footer />
        </div>
    );
}

export default App;
