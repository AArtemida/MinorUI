declare const _default: import("vue").DefineComponent<{
    imgList: ArrayConstructor;
    showLabel: BooleanConstructor;
    width: {
        type: NumberConstructor;
        default: number;
    };
}, {
    imagesBoxRef: import("vue").Ref<HTMLDivElement | null>;
    width: number;
    next: () => void;
    prev: () => void;
    marginLeft: import("vue").ComputedRef<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    imgList?: unknown;
    showLabel?: unknown;
    width?: unknown;
} & {
    showLabel: boolean;
    width: number;
} & {
    imgList?: unknown[] | undefined;
}>, {
    showLabel: boolean;
    width: number;
}>;
export default _default;
