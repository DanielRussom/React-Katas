import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const getButton = (buttonName : string) => {
    return screen.getByRole('button', { name: buttonName });
}
export const clickButton = (buttonName : string) => {
    userEvent.click(screen.getByRole('button', { name: buttonName }));
}