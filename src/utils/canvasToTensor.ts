import { Tensor } from "onnxruntime-web";
import { imageDataToRGB } from "./imageDataToRGB";
import { imageDataToGrayscale } from "./imageDataToGrayscale";

export function canvasToTensor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")!;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const grayData = imageDataToGrayscale(imageData);

    const float32Data = Float32Array.from(grayData).map((x) => x / 255);

    const tensor = new Tensor("float32", float32Data, [
        1,
        1,
        canvas.width,
        canvas.height,
    ]);

    return tensor;
}
