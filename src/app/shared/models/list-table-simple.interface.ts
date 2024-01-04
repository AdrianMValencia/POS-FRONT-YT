export interface TableColumnSimple<T> {
    label: string
    cssLabel?: string[],
    property: keyof T | string;
    cssProperty: string[]
    type: "text" | "number" | "currency"
    visible?: boolean
}