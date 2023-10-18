import { IProfilePicture } from "./profile-picture.model";

export interface IProfilePictureUpload {
    imageState: IProfilePicture;

    handleImageUpload: () => void;
}
