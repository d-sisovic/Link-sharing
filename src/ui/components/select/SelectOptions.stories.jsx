import SelectOptions from './SelectOptions';
import { action } from '@storybook/addon-actions';
import linkedinSvg from '../../../assets/images/icon-linkedin.svg';
import { AvailablePlatform } from "../../../ts/enums/available-platform.enum";

const options = [{
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
}];

export default {
    tags: ['autoclose'],
    title: 'SelectOptions',
    component: SelectOptions
}

export const SelectOptionsInitial = {
    args: {
        options,
        activeOption: AvailablePlatform.LINKEDIN,

        onChange: () => { action('Change event')(); },
        onSelectOption: () => { action('Change event')(); }
    }
};
