import PreviewLinkList from './PreviewLinkList';
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

describe('PreviewLinkList component', () => {
    it('should render 2 links', () => {
        render(<PreviewLinkList links={links} previewMode={false}></PreviewLinkList>);

        const platformLabelElements = screen.getAllByTestId('platform-label');

        expect(platformLabelElements).toHaveLength(2);
    });
});