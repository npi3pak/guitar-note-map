import { FretboardM4LContainer } from 'components/Fretboard';
import { M4lMenu } from './components/M4lMenu';

const App = () => (
    <div className="flex flex-row bg-ableton-gray items-center" data-theme="m4l">
        <M4lMenu />
        <FretboardM4LContainer />
    </div>
);

export default App;
