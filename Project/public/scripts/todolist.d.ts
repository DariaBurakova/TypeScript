export interface List {
    title: string;
    completed: boolean;
    [key: number]: number | any;
}
export declare function getTodosByCount(count: number): Promise<void>;
