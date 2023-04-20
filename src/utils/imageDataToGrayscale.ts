export function imageDataToGrayscale(
    imageData: ImageData,
    invertColor: boolean = true
) {
    const { width, height, data } = imageData;
    const grayData = new Uint8ClampedArray(width * height);

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i];
        const b = data[i];

        const gray = (r + g + b) / 3;
        grayData[i / 4] = 255 - gray;
    }

    return grayData;
}
