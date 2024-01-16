import Select from './Select';
import { useForm } from 'react-hook-form';
import { renderHook } from '@testing-library/react';
import linkedinSvg from "../../../assets/images/icon-linkedin.svg";
import { AvailablePlatform } from '../../../ts/enums/available-platform.enum';

const options = [{
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
}];

const { result } = renderHook(() => useForm());

export default {
    tags: ['UI'],
    title: 'Select',
    component: Select
}

export const SelectInitial = {
    args: {
        options,
        name: 'platform',
        label: 'Platform',
        control: result.current.control,
        active: AvailablePlatform.LINKEDIN
    }
};