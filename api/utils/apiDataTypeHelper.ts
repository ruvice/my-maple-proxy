export function toBool(val: string): boolean {
    return val === "true";
}

export function toNum(val: string | number): number {
    return typeof val === 'number' ? val : Number(val);
}