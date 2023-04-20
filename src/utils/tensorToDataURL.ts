import { TypedTensor } from "onnxruntime-web";

export function tensorToDataURL(tensor: TypedTensor<"float32">) {
    const width = tensor.dims[2];
    const height = tensor.dims[3];
    const data = tensor.data as Float32Array;

    const pixels = new Uint8ClampedArray(width * height * 4);

    for (let i = 0, pixelsIndex = 0; i < data.length; i++) {
        pixels[pixelsIndex] = data[i];
        pixelsIndex++;

        if ((i + 1) % 3 === 0) {
            pixels[pixelsIndex] = 255;
            pixelsIndex++;
        }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    const imageData = new ImageData(pixels, width, height);
    ctx.putImageData(imageData, 0, 0);

    const dataURL = canvas.toDataURL();

    return dataURL;
}
