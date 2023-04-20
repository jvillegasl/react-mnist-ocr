export function maxFromArray(arr: number[]) {
    const maxValue = Math.max(...arr);
    const index = arr.indexOf(maxValue);

    return index;
}
