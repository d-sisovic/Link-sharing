import Select from './Select';
import { useForm } from 'react-hook-form';
import linkedinSvg from "../../../assets/images/icon-linkedin.svg";
import { screen, render, renderHook } from '@testing-library/react';
import { AvailablePlatform } from '../../../ts/enums/available-platform.enum';

const label = 'Platform';

const { result } = renderHook(() => useForm());

const options = [{
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
}];

describe('Select component', () => {
    it('should render initial state', async () => {
        render(<Select active='linkedin' name='platform' label='Platform' control={result.current.control} options={options}></Select>);

        const labelElement = screen.getByText(label);

        expect(labelElement).toBeVisible();
    });
});