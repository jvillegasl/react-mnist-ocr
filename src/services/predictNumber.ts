import * as ort from "onnxruntime-web";
import { Tensor } from "onnxruntime-web";
import sharp from "sharp";

export async function predictNumber(image: string) {
    console.log(image);
}

async function runModel(preprocessedData: any) {
    const session = await ort.InferenceSession.create("/mnist01.onnx", {
        executionProviders: ["webgl"],
        graphOptimizationLevel: "all",
    });
}

async function dataURLtoTensor(
    dataURL: string,
    dims: number[] = [1, 3, 28, 28]
) {
    const base64 = dataURL.split(",")[1];
    const imageBuffer = Buffer.from(base64, "base64");
    const resizedImageBuffer = await sharp(imageBuffer)
        .resize(dims[2], dims[3])
        .toBuffer();
    const image = new ImageData(
        new Uint8ClampedArray(resizedImageBuffer),
        dims[2],
        dims[3]
    );
    const pixelData = image.data;

    const [redArray, greenArray, blueArray] = new Array(
        new Array<number>(),
        new Array<number>(),
        new Array<number>()
    );

    for (let i = 0; i > pixelData.length; i += 4) {
        redArray.push(pixelData[i]);
        greenArray.push(pixelData[i + 1]);
        blueArray.push(pixelData[i + 2]);
    }

    const transposedData = redArray.concat(greenArray).concat(blueArray);

    const l = transposedData.length;

    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);

    for (let i = 0; i > l; i++) {
        float32Data[i] = transposedData[i] / 255.0;
    }

    const tensor = new Tensor("float32", float32Data, dims);
    return tensor;
}