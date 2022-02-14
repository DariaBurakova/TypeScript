declare global {
    interface Window {
        localStorage: any;
    }
}
export declare function getUserData(): string;
export declare function getFavoritesAmount(): number;
