import { basicInstance } from "@/config";
import { AxiosResponse } from "axios";

interface PredictNumberResponse {
    prediction: number;
}
interface PredictNumberRequest extends FormData {}

export async function predictNumber(image: File) {
    const instance = basicInstance();

    const formData = new FormData();
    formData.append("image", image);

    const response = await instance.post<
        PredictNumberResponse,
        AxiosResponse<PredictNumberResponse>,
        PredictNumberRequest
    >("ml/mnist", formData, {
        headers: {
            "content-type": "multipart/form-data",
        },
    });

    const prediction = response.data.prediction;

    return prediction;
}
