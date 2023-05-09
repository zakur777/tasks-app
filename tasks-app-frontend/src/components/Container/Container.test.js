import React from 'react';
import { render } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
    it('should render children', () => {
        const { getByText } = render(
            <Container>
                <div>Hello World!</div>
            </Container>
        );
        expect(getByText('Hello World!')).toBeInTheDocument();
    });

    it('should have a class of "container"', () => {
        const { container } = render(
            <Container>
                <div>Hello World!</div>
            </Container>
        );
        expect(container.firstChild).toHaveClass('container');
    });
});
