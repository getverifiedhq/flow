import axios from "axios";

export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve: (data: ArrayBuffer) => void) => {
    const fileReader: FileReader = new FileReader();

    fileReader.onload = async () => {
      if (!fileReader.result) {
        return;
      }

      resolve(fileReader.result as ArrayBuffer);
    };

    fileReader.readAsArrayBuffer(file);
  });
}

export function fileToCanvas(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<HTMLCanvasElement> {
  return new Promise(
    (
      resolve: (data: HTMLCanvasElement) => void,
      reject: (error: Error) => void
    ) => {
      const fileReader: FileReader = new FileReader();

      fileReader.onload = () => {
        if (!fileReader.result) {
          reject(new Error());

          return;
        }

        const htmlImageElement: HTMLImageElement = new Image();

        htmlImageElement.onload = () => {
          const canvas = document.createElement("canvas");

          canvas.width =
            htmlImageElement.width > htmlImageElement.height
              ? maxWidth
              : maxHeight * (htmlImageElement.width / htmlImageElement.height);

          canvas.height =
            htmlImageElement.width > htmlImageElement.height
              ? maxWidth / (htmlImageElement.width / htmlImageElement.height)
              : maxHeight;

          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error());

            return;
          }

          ctx.drawImage(htmlImageElement, 0, 0, canvas.width, canvas.height);

          resolve(canvas);
        };

        htmlImageElement.src = fileReader.result as string;
      };

      fileReader.readAsDataURL(file);
    }
  );
}

export async function uploadArrayBuffer(
  arrayBuffer: ArrayBuffer,
  contentType: string
): Promise<{ tags: Array<string>; url: string }> {
  const response = await axios.post<{ tags: Array<string>; url: string }>(
    `https://api.getverified.co.za/api/v1/storage`,
    arrayBuffer,
    {
      headers: {
        "Content-Type": contentType,
      },
    }
  );

  return response.data;
}
