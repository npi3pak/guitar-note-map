import { FretboardAppContainer } from 'components/Fretboard';
import { Footer } from 'components/Footer';
import { TopPanels } from 'components/TopPanels';
import { NavBar } from './components/Navbar';
import { MobileTopMenu } from './components/MobileTopMenu';

const App = () => (
    <div className="flex flex-col min-h-[100dvh] bg-base-200" data-theme="app">
        <MobileTopMenu />
        <NavBar />
        <main className="flex-grow flex flex-col mt-4">
            <TopPanels />
            <FretboardAppContainer />
        </main>
        <Footer />
    </div>
);

export default App;
