import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Canvas } from "@/components";
import { useRef, useState } from "react";
import { dataURLtoFile } from "@/utils";
import { predictNumber } from "@/services";

export function MnistOcr() {
    console.log(import.meta.env.VITE_BACKEND_URL);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [prediction, setPrediction] = useState<string>("???");

    async function handlePredict() {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dataURL = canvas.toDataURL();
        const imageFile = dataURLtoFile(dataURL, "image-test.png");

        predictNumber(imageFile).then((t) => setPrediction(t.toString()));
    }

    function handleReset() {
        setPrediction("???");

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return (
        <main>
            <h1 className="text-center">MNIST - OCR</h1>

            <h2 className="text-center">
                Character recognition through Artifical Neural Networks
            </h2>

            <hr />

            <p className="px-5 text-center">
                With the mouse cursor draw a number from <strong>0-9</strong> in
                the box below. Next, click on the 'Predict' button for the ANN
                to process the drawn number.
            </p>

            <div className="mb-3 d-flex align-items-center justify-content-center">
                <Card style={{ width: "fit-content" }}>
                    <Card.Body className="p-0">
                        <Canvas ref={canvasRef} />
                    </Card.Body>
                </Card>
            </div>

            <Container className="mx-auto" style={{ maxWidth: "540px" }}>
                <Row className="gy-3">
                    <Col xs="12" className="text-center">
                        <strong>Prediction: </strong> {prediction}
                    </Col>

                    <Col xs="12">
                        <Row className="gy-2">
                            <Button onClick={handlePredict}>Predict</Button>
                            <Button
                                variant="outline-secondary"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
