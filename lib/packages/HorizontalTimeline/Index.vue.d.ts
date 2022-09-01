declare const _default: import("vue").DefineComponent<{
    list: {
        type: ObjectConstructor;
        default: () => void;
    };
}, {
    setTimeItemRef: (el: HTMLElement) => void;
    timeLineBox: import("vue").Ref<HTMLDivElement | null>;
    timeList: import("vue").ComputedRef<any[]>;
    boxRate: import("vue").ComputedRef<string>;
    getAllWidth: () => void;
    getLineFlex: (len: number) => string;
    mousedown: (e: any) => void;
    silderMousedown: (e: any) => void;
    changeSliderPosition: (e: any) => void;
    scroll: () => void;
    allWidth: any;
    sliderLeft: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    list?: unknown;
} & {
    list: Record<string, any>;
} & {}>, {
    list: Record<string, any>;
}>;
export default _default;
