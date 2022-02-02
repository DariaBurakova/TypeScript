export interface SearchFormData {
    start: string;
    end: string;
    price?: string;
}
export declare const search: (formData: SearchFormData) => void;
