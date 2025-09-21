import { Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="footer p-4 text-gray-800/25 text-center justify-center">
            <div className="flex items-center justify-center gap-2">
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
