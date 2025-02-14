export function canvasToArrayBuffer(
  canvas: HTMLCanvasElement
): Promise<ArrayBuffer> {
  return new Promise(
    (resolve: (data: ArrayBuffer) => void, reject: (error: Error) => void) => {
      canvas.toBlob(
        (blob: Blob | null) => {
          if (!blob) {
            reject(new Error());

            return;
          }

          const fileReaderBlob: FileReader = new FileReader();

          fileReaderBlob.onload = () => {
            if (!fileReaderBlob.result) {
              reject(new Error());

              return;
            }

            resolve(fileReaderBlob.result as ArrayBuffer);
          };

          fileReaderBlob.readAsArrayBuffer(blob);
        },
        "image/png",
        1
      );
    }
  );
}

export function cropCanvas(
  htmlCanvasElement: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const result = document.createElement("canvas");

  const ctx = result.getContext("2d");

  if (!ctx) {
    throw new Error();
  }

  result.width = width;
  result.height = height;

  ctx.drawImage(htmlCanvasElement, x, y, width, height, 0, 0, width, height);

  return result;
}
