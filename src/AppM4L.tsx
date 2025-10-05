import { Fretboard } from 'components/Fretboard';
import { M4lMenu } from './components/M4lMenu';

function App() {
    return (
        <div className="flex flex-row bg-ableton-gray">
            <M4lMenu />
            <Fretboard m4l />
        </div>
    );
}

export default App;
