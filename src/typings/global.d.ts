export { };

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: Function;
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
