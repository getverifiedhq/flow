import { useEffect, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Close, FileDownloadOutlined, WarningAmber } from "@mui/icons-material";
import * as tf from "@tensorflow/tfjs";
import * as faceDetection from "@tensorflow-models/face-detection";
import {
  fileToArrayBuffer,
  fileToCanvas,
  IFieldProps,
  IPhotoField,
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

export function PhotoFieldComponent(props: IFieldProps<IPhotoField>) {
  const inputElementFile = useRef(null as HTMLInputElement | null);

  const [state, setState] = useState({
    files: (props.value as Array<any>).map((x) => {
      return {
        id: x.id,
        isError: false,
        isLoading: false,
        name: x.name,
        size: x.size,
        type: x.type,
        url: x.url,
      };
    }),
    isLoading: false,
  } as {
    files: Array<{
      id: string;
      isError: boolean;
      isLoading: boolean;
      name: string;
      size: number;
      type: string;
      url: string;
    }>;
    isLoading: boolean;
  });

  useEffect(() => {
    props.handleChange({
      target: {
        name: props.field.name,
        value: state.files
          .filter((x) => !x.isError && !x.isLoading)
          .map((x) => {
            return {
              id: x.id,
              name: x.name,
              size: x.size,
              type: x.type,
              url: x.url,
            };
          }),
      },
    });
  }, [state.files]);

  return (
    <>
      <Typography sx={{ mb: 1 }}>{props.field.title}</Typography>

      <Box
        onClick={() =>
          state.isLoading ? null : inputElementFile.current?.click()
        }
        sx={{
          alignItems: "center",
          backgroundColor: "#f9f9f9",
          border: "2px dashed rgba(18, 35, 69, .15)",
          borderColor: props.error ? "error.main" : undefined,
          borderRadius: 2,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mb: 2,
          px: 2,
          py: 6,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <img height={36} src="/images/file-upload-icon.svg" />
        </Box>
        {props.field.description ? (
          <Typography
            color="black"
            gutterBottom
            textAlign="center"
            variant="body1"
          >
            {props.field.description}
          </Typography>
        ) : null}
      </Box>

      <input
        accept="image/*"
        capture="user"
        multiple={false}
        onChange={async (event: any) => {
          setState({
            files: [...state.files],
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

          for (const file of htmlInputElement.files) {
            let htmlCanvasElement: HTMLCanvasElement = await fileToCanvas(
              file,
              600,
              600
            );

            const face: faceDetection.Face | null = await detectFace(
              htmlCanvasElement
            );

            const id: string = faker.string.alphanumeric({
              casing: "lower",
              length: 6,
            });

            setState((previousState) => {
              return {
                files: [
                  ...previousState.files,
                  {
                    id,
                    isError: face ? false : true,
                    isLoading: true,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: "",
                  },
                ],
                isLoading: true,
              };
            });

            fileToArrayBuffer(file)
              .then((arrayBuffer) => uploadArrayBuffer(arrayBuffer, file.type))
              .then((result) =>
                setState((previousState) => {
                  return {
                    files: previousState.files.map((x) => {
                      if (x.id === id) {
                        x.isLoading = false;
                        x.url = result.url;
                      }

                      return x;
                    }),
                    isLoading: previousState.files.some((x) => x.isLoading),
                  };
                })
              )
              .catch(() =>
                setState((previousState) => {
                  return {
                    files: previousState.files.map((x) => {
                      if (x.id === id) {
                        x.isError = true;
                        x.isLoading = false;
                      }

                      return x;
                    }),
                    isLoading: previousState.files.some((x) => x.isLoading),
                  };
                })
              );
          }
        }}
        ref={inputElementFile}
        style={{ display: "none" }}
        type="file"
      />

      {state.files.length ? (
        <List sx={{ mb: 2 }}>
          {state.files.map((x) => (
            <ListItem
              divider
              key={x.id}
              secondaryAction={
                x.isLoading ? (
                  <CircularProgress />
                ) : props.disabled ? null : x.isError ? (
                  <IconButton
                    color="warning"
                    onClick={() =>
                      setState({
                        files: state.files.filter((y) => y.id !== x.id),
                        isLoading: state.isLoading,
                      })
                    }
                  >
                    <WarningAmber />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      setState({
                        files: state.files.filter((y) => y.id !== x.id),
                        isLoading: state.isLoading,
                      })
                    }
                  >
                    <Close />
                  </IconButton>
                )
              }
            >
              <ListItemAvatar
                onClick={() => window.open(x.url, "_blank")}
                sx={{ cursor: "pointer" }}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <FileDownloadOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={x.name}
                secondary={
                  x.isError
                    ? `This doesn't look like a valid photo.`
                    : `${(x.size / 1_000_000).toFixed(2)}MB`
                }
                sx={{
                  overflow: "auto",
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  );
}
