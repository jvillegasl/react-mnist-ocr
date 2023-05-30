export function getCoordinates<T extends HTMLElement>(
    event: React.MouseEvent<T> | React.TouchEvent<T>
) {
    var offsetX = 0;
    var offsetY = 0;

    const nativeEvent = event.nativeEvent;
    if (nativeEvent instanceof MouseEvent) {
        const { offsetX: x, offsetY: y } = nativeEvent;

        offsetX = x;
        offsetY = y;
    } else if (nativeEvent instanceof TouchEvent) {
        const rect = (event.target as T).getBoundingClientRect();

        offsetX = nativeEvent.targetTouches[0].pageX - rect.left;
        offsetY = nativeEvent.targetTouches[0].pageY - rect.top;
    }

    return { offsetX, offsetY };
}
