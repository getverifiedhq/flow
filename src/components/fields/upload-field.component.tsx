import { useRef, useState } from "react";
import { CameraAlt as Camera } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { fileToArrayBuffer, IUploadField, uploadArrayBuffer } from "../../core";

export function UploadFieldComponent(props: {
  field: IUploadField;
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
        &nbsp;Upload files
      </Button>

      <input
        accept="image/*"
        capture="environment"
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
