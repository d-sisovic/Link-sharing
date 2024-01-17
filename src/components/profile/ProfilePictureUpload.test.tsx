import { render, screen } from '@testing-library/react';
import ProfilePictureUpload from './ProfilePictureUpload';

const handleImageUpload = vi.fn();

const imageState = {
    invalid: false,
    uploading: false,
    imageURL: 'https://firebasestorage.googleapis.com/v0/b/link-sharing-183d2.appspot.com/o/profile%2Fsiskoftn%40gmail.com%2FprofileImage?alt=media&token=4811cd55-3d41-4c43-ad70-52d868df558d'
};

const uploadingState = {
    ...imageState,
    uploading: true
};

describe('ProfilePictureUpload component', () => {
    it('should render initial state', () => {
        render(<ProfilePictureUpload imageState={imageState} handleImageUpload={handleImageUpload}></ProfilePictureUpload>);

        const changeImageElement = screen.getByText('Change image');

        expect(changeImageElement).toBeVisible();
    });

    it('should display spinner, if image is uploading', () => {
        render(<ProfilePictureUpload imageState={uploadingState} handleImageUpload={handleImageUpload}></ProfilePictureUpload>);

        const spinnerElement = screen.getByTestId('spinner');

        expect(spinnerElement).toBeVisible();
    });
}); 