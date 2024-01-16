import SelectInput from './SelectInput';
import { screen, render } from '@testing-library/react';
import linkedinSvg from '../../../assets/images/icon-linkedin.svg';
import { AvailablePlatform } from '../../../ts/enums/available-platform.enum';

const activeItem = {
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
};

const onToggleExpand = vi.fn();
const setDropdownVisible = vi.fn();

describe('SelectInput component', () => {
    it('should render initial state', () => {
        render(<SelectInput dropdownVisible={true} activeItem={activeItem}
            setDropdownVisible={setDropdownVisible} onToggleExpand={onToggleExpand}>
        </SelectInput>);

        const chevronElement = screen.getByTestId('chevron');

        expect(chevronElement.className.includes('chevron--up')).toBe(true);
    });
});