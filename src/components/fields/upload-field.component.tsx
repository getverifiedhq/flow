import { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fileToArrayBuffer, IFileField, uploadArrayBuffer } from "../../core";

export function UploadFieldComponent(props: {
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
        // accept="image/*"
        // capture="environment"
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

          const url: string = await uploadArrayBuffer(
            await fileToArrayBuffer(file),
            file.type
          );

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
