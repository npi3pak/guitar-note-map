import { Menu } from 'lucide-react';
import { useTopDrawer } from 'src/store/useTopDrawer';

export const NavBar = () => {
    const { open } = useTopDrawer();

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <h1 className="pl-4 text-xl md:text-4xl text-red-500/50 font-bold">Guitar Note Map</h1>
            </div>
            <div className="flex-none pr-4">
                <button className="btn btn-ghost flex md:hidden" onClick={open}>
                    <Menu size={24} className="text-neutral" />
                </button>
            </div>
        </div>
    );
};
