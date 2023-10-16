import { AvailablePlatform } from "../enums/available-platform.enum";

export interface IFirebaseLink {
    id: string;
    value: string;
    index: number;
    platform: AvailablePlatform;
}
