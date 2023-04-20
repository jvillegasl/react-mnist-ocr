export function imageDataToRGB(imageData: ImageData) {
    const filteredData = imageData.data.filter(
        (_, index) => (index + 1) % 4 !== 0
    );

    return filteredData;
}
