import Button from './Button';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Button',
    component: Button,
    tags: ['UI']
}

export const InitialButton = {
    args: {
        disabled: false,
        outlineMode: false,
        label: 'Test Button',
        clickHandler: () => action('Click')('')
    }
}

export const DisabledButton = {
    args: {
        disabled: true,
        outlineMode: false,
        label: 'Disabled Button',
        clickHandler: () => action('Disabled button shouldn\'t click')('')
    }
}