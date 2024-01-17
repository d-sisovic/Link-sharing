import PreviewLink from './PreviewLink';
import { render, screen } from '@testing-library/react';
import { AvailablePlatform } from '../../ts/enums/available-platform.enum';

const links = [
    {
        id: '1',
        value: 'https://www.linkedin.com/in/daniel-sisovic-0838a617b/',
        index: 0,
        platform: AvailablePlatform.LINKEDIN
    },
    {
        id: '2',
        value: 'https://github.com/d-sisovic',
        index: 1,
        platform: AvailablePlatform.GITHUB
    }
];

describe('PreviewLink component', () => {
    it('should render passed link', () => {
        render(<PreviewLink link={links[0]} previewMode={false}></PreviewLink>);

        const platformLabelElement = screen.getByTestId('platform-label');

        expect(platformLabelElement).toBeVisible();
    });
});