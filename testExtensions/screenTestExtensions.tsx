import { screen } from '@testing-library/react';

export const getButton = (buttonName : string) => {
    return screen.getByRole('button', { name: buttonName });
}