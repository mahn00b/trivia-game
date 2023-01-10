import { render } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
    it('should be defined', () => {
      expect(Button).toBeDefined();
    })

    it('should render a button', () => {
        const { getByTestId } = render(<Button data-testid="TEST">test</Button>)

        expect(getByTestId('TEST')).toBeDefined();
    });
});
