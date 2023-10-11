import { AvailablePlatform } from "../enums/available-platform.enum";

export interface IPlatform {
    img: string;
    label: string;
    value: AvailablePlatform;
}