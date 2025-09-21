import { Fretboard } from 'components/Fretboard';
import { Piano } from 'components/Piano';
import { Footer } from 'components/Footer';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col">
                <Piano />
                <Fretboard />
            </main>
            <Footer />
        </div>
    );
}

export default App;
