import SelectInput from './SelectInput';
import { action } from '@storybook/addon-actions';
import linkedinSvg from '../../../assets/images/icon-linkedin.svg';
import { AvailablePlatform } from '../../../ts/enums/available-platform.enum';

export default {
    tags: ['UI'],
    title: 'SelectInput',
    component: SelectInput
}

const activeItem = {
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
};

export const SelectInputState = {
    args: {
        activeItem,
        dropdownVisible: true,

        onToggleExpand: () => { action('Toggle event')(); },
        setDropdownVisible: () => { action('Set dropdown event')(); }
    }
};
