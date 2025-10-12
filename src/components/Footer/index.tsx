import { Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="footer p-4 text-gray-800/25 text-center justify-around">
            <div className="flex items-center justify-center gap-2 mx-4">
                <a
                    href="https://acidvoid.gumroad.com/l/guitar-note-map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                >
                    <span className="hover:text-red-300 bold text-red-400">Try Max For Live Plugin</span>
                </a>
                <span>Ivan Void 2025</span>
                <a
                    href="https://github.com/npi3pak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-gray-300"
                >
                    <Github size={18} />
                    <span>GitHub</span>
                </a>
            </div>
        </footer>
    );
};
