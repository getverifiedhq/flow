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
import { Close, FileDownload } from "@mui/icons-material";
import { fileToArrayBuffer, IFileField, uploadArrayBuffer } from "../../core";

export function UploadFieldComponent(props: {
  field: IFileField;
  onChange: (
    files: Array<{
      id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    }>
  ) => void;
  value: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}) {
  const inputElementFile = useRef(null as HTMLInputElement | null);

  const [state, setState] = useState({
    files: props.value.map((x) => {
      return {
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
      isLoading: boolean;
      name: string;
      size: number;
      type: string;
      url: string;
    }>;
    isLoading: boolean;
  });

  useEffect(() => {
    props.onChange(
      state.files
        .filter((x) => !x.isLoading)
        .map((x) => {
          return {
            id: x.id,
            name: x.name,
            size: x.size,
            type: x.type,
            url: x.url,
          };
        })
    );
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
              .then((url) =>
                setState((previousState) => {
                  return {
                    files: previousState.files.map((x) => {
                      if (x.id === id) {
                        x.isLoading = false;
                        x.url = url;
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
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "white" }}>
                  <FileDownload />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={x.name}
                secondary={`${(x.size / 1_000_000).toFixed(2)}MB`}
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
