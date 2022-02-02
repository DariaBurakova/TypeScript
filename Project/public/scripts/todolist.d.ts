export interface List {
    title: string;
    completed: boolean;
}
export declare function getTodosByCount(count: number): Promise<void>;
