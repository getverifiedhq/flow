import { useRef, useState } from "react";
import { CameraAlt as Camera } from "@mui/icons-material";
import { Alert, Button, Typography } from "@mui/material";
import * as tf from "@tensorflow/tfjs";
import * as faceDetection from "@tensorflow-models/face-detection";
import {
  canvasToArrayBuffer,
  cropCanvas,
  fileToCanvas,
  IFileField,
  uploadArrayBuffer,
} from "../../core";

export async function detectFace(htmlCanvasElement: HTMLCanvasElement) {
  const faceDetector = await faceDetection.createDetector(
    faceDetection.SupportedModels.MediaPipeFaceDetector,
    {
      runtime: "tfjs",
    }
  );

  const input: any = await tf.browser.fromPixelsAsync(htmlCanvasElement);

  const faces = await faceDetector.estimateFaces(input);

  const face = faces.length === 1 ? faces[0] : null;

  if (!face) {
    return null;
  }

  return face;
}

export function UploadPhotoFieldComponent(props: {
  field: IFileField;
  onChange: (url: string) => void;
}) {
  const inputElementFile = useRef(null as HTMLInputElement | null);

  const [state, setState] = useState({
    error: null,
    file: null,
    isLoading: false,
  } as {
    error: string | null;
    file: {
      url: string;
    } | null;
    isLoading: boolean;
  });

  return (
    <>
      <Typography sx={{ mb: 1 }}>{props.field.title}</Typography>

      <Button
        disabled={state.isLoading}
        fullWidth
        onClick={() => inputElementFile.current?.click()}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        <Camera />
        &nbsp;Take a photo
      </Button>

      {state.error ? (
        <Alert severity="warning" sx={{ mb: 4 }}>
          We couldn&apos;t detect your face. Please make sure your face is
          clearly visible and close to the camera, then try again.
        </Alert>
      ) : null}

      <input
        accept="image/*"
        capture="user"
        onChange={async (event: any) => {
          setState({
            error: null,
            file: null,
            isLoading: true,
          });

          if (!event.target) {
            return null;
          }

          const htmlInputElement: HTMLInputElement =
            event.target as HTMLInputElement;

          if (!htmlInputElement.files || !htmlInputElement.files.length) {
            return null;
          }

          const file: File | null =
            htmlInputElement.files.length === 1
              ? htmlInputElement.files[0]
              : null;

          if (!file) {
            setState({
              error: "ERROR", // TODO
              file: null,
              isLoading: false,
            });

            return;
          }

          let htmlCanvasElement: HTMLCanvasElement = await fileToCanvas(
            file,
            600,
            600
          );

          const face: faceDetection.Face | null = await detectFace(
            htmlCanvasElement
          );

          if (!face) {
            setState({
              error: "Failed to detect face",
              file: null,
              isLoading: false,
            });

            return;
          }

          const paddingX: number = htmlCanvasElement.width * 0.25;
          const paddingY: number = htmlCanvasElement.height * 0.25;

          const x: number = Math.max(face.box.xMin - paddingX, 0);

          const y: number = Math.max(face.box.yMin - paddingY, 0);

          htmlCanvasElement = await cropCanvas(
            htmlCanvasElement,
            x,
            y,
            Math.min(
              face.box.width + 2 * paddingX,
              htmlCanvasElement.width - x
            ),
            Math.min(
              face.box.height + 2 * paddingY,
              htmlCanvasElement.height - y
            )
          );

          if (htmlCanvasElement.height < 375 || htmlCanvasElement.width < 375) {
            setState({
              error: "Failed to detect face",
              file: null,
              isLoading: false,
            });

            return;
          }

          const arrayBuffer: ArrayBuffer = await canvasToArrayBuffer(
            htmlCanvasElement
          );

          const url: string = await uploadArrayBuffer(arrayBuffer, file.type);

          setState({
            error: null,
            file: {
              url,
            },
            isLoading: false,
          });

          props.onChange(url);
        }}
        ref={inputElementFile}
        style={{ display: "none" }}
        type="file"
      />
    </>
  );
}
