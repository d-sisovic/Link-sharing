import { AvailablePlatform } from "../enums/available-platform.enum";

export interface IFirebaseLink {
    id: string;
    value: string;
    platform: AvailablePlatform;
}
