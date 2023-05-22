import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Position from '../src/snake-game/Position';

export const getButton = (buttonName : string) => {
    return screen.getByRole('button', { name: buttonName });
}
export const clickButton = (buttonName : string) => {
    userEvent.click(screen.getByRole('button', { name: buttonName }));
}

declare global {
    interface HTMLElement{
        getChildAt(position: Position);
    }
}

HTMLElement.prototype.getChildAt = function(position: Position) {
    const row = this.childNodes[position.y];
    return row.childNodes[position.x];
}