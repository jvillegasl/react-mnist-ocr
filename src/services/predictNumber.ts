import { dataURLtoFile, maxFromArray } from "@/utils";
import { InferenceSession, Tensor, TypedTensor } from "onnxruntime-web";

export async function predictNumber(image: string) {
    const image_file = dataURLtoFile(image, "image.png");
    let body = new FormData();
    body.append("image", image_file);
    const prediction = await fetch("http://127.0.0.1:8000/api/ml/mnist/", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body,
    })
        .then((data) => data.json())
        .then((response) => response.data.prediction);

    return prediction;
}

export async function runModel(input: TypedTensor<"float32">) {
    const session = await InferenceSession.create("/react-mnist-ocr/mnist05.onnx", {
        executionProviders: ["webgl"],
        graphOptimizationLevel: "all",
    });

    const prediction = await runInference(session, input);
    
    return prediction;
}

async function runInference(
    session: InferenceSession,
    input: TypedTensor<"float32">
) {
    const feeds: Record<string, Tensor> = {};
    feeds[session.inputNames[0]] = input;

    const outputData = await session.run(feeds);
    const output = outputData[session.outputNames[0]] as TypedTensor<"float32">;
    const results = maxFromArray(Array.from(output.data));

    return results;
}
