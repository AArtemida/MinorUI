declare const _default: import("vue").DefineComponent<{
    list: {
        type: ArrayConstructor;
        default: () => never[];
    };
    height: (NumberConstructor | StringConstructor)[];
    itemHeight: NumberConstructor;
    rows: {
        type: NumberConstructor;
        default: number;
    };
}, {
    scrollWrapRef: import("vue").Ref<HTMLDivElement | null>;
    scrollUlRef: any;
    state: {
        start: number;
        end: number;
        initHeight: number;
        scrollTop: number;
        listHeight: number;
    };
    maxHeight: import("vue").ComputedRef<string | number>;
    listData: import("vue").ComputedRef<any[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    list?: unknown;
    height?: unknown;
    itemHeight?: unknown;
    rows?: unknown;
} & {
    list: unknown[];
    rows: number;
} & {
    height?: string | number | undefined;
    itemHeight?: number | undefined;
}>, {
    list: unknown[];
    rows: number;
}>;
export default _default;
