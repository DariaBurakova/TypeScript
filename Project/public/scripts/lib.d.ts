export declare function renderBlock(elementId: string, html: string): void;
export declare function renderToast(message: {
    text: string;
    type: string;
}, action: {
    handler: () => void;
    name: string;
}): void;
