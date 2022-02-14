export declare class Users {
    name: string;
    url: string | null;
    favoriteItemsAmount?: number | null;
    constructor(name: string, url: string, favoriteItemsAmount?: number);
}
export declare const users: Users[];
