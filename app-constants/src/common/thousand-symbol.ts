export const thousandSymbol = (value: string | number): string => {
    let str = String(value);
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev;
    });
}
