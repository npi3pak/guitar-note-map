import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppM4L from './AppM4L';

describe('App global snapshot', () => {
    it('matches the root snapshot for m4l App', () => {
        const { container } = render(<AppM4L />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
