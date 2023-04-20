import Pica from "pica";

export async function resizeCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
) {
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = width;
    resizedCanvas.height = height;

    const pica = new Pica();
    await pica.resize(canvas, resizedCanvas);

    // const resizedCtx = resizedCanvas.getContext("2d")!;
    // resizedCtx.imageSmoothingEnabled = false;
    // // resizedCtx.scale(width / canvas.width, height / canvas.height);
    // resizedCtx.drawImage(canvas, 0, 0, width, height);

    return resizedCanvas;
}
