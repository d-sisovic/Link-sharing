import SelectOptions from "./SelectOptions";
import { render, screen } from '@testing-library/react';
import linkedinSvg from '../../../assets/images/icon-linkedin.svg';
import { AvailablePlatform } from "../../../ts/enums/available-platform.enum";

const onChange = vi.fn();
const onSelectOption = vi.fn();

const options = [{
    img: linkedinSvg,
    label: "LinkedIn",
    value: AvailablePlatform.LINKEDIN
}];

describe('SelectOptions component', () => {
    it('should render 1 options', () => {
        render(<SelectOptions options={options} activeOption={AvailablePlatform.LINKEDIN}
            onChange={onChange} onSelectOption={onSelectOption}></SelectOptions>);

        const linkItems = screen.getAllByTestId('option');

        expect(linkItems.length === 1);
    });
});