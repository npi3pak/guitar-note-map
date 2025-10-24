import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App global snapshot', () => {
    it('matches the root snapshot for App', () => {
        const { container } = render(<App />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
