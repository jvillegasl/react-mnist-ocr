import "./Canvas.scss";

import {
    useEffect,
    useRef,
    useState,
    MouseEvent,
    useMemo,
    forwardRef,
} from "react";

export const Canvas = forwardRef<HTMLCanvasElement>((props, ref) => {
    const defaultRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const canvasRef = useMemo(() => {
        if (ref && typeof ref !== "function") return ref;

        return defaultRef;
    }, [defaultRef, ref]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
    }, []);

    function startDrawing(event: MouseEvent<HTMLCanvasElement>) {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const { offsetX, offsetY } = event.nativeEvent;

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    function finishDrawing(event: MouseEvent<HTMLCanvasElement>) {
        if (!isDrawing) return;

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.closePath();
        setIsDrawing(false);
    }

    function draw(event: MouseEvent<HTMLCanvasElement>) {
        if (!isDrawing) return;

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const { offsetX, offsetY } = event.nativeEvent;

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }

    return (
        <canvas
            ref={canvasRef}
            className="c-canvas"
            width={300}
            height={300}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
        />
    );
});
