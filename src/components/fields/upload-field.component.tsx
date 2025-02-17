import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import {
  // fileToArrayBuffer,
  IFileField,
  // uploadArrayBuffer
} from "../../core";

export function UploadFieldComponent(props: {
  field: IFileField;
  onChange: (
    files: Array<{
      name: string;
      size: number;
      type: string;
      url: string;
    }>
  ) => void;
  value: Array<{
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}) {
  const inputElementFile = useRef(null as HTMLInputElement | null);

  const [state, setState] = useState({
    isLoading: false,
  } as {
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

          const files: Array<{
            name: string;
            size: number;
            type: string;
            url: string;
          }> = [];

          for (const file of htmlInputElement.files) {
            // const url: string = await uploadArrayBuffer(
            //   await fileToArrayBuffer(file),
            //   file.type
            // );

            files.push({
              name: file.name,
              size: file.size,
              type: file.type,
              url: "",
            });
          }

          setState({
            isLoading: false,
          });

          props.onChange([...props.value, ...files]);
        }}
        ref={inputElementFile}
        style={{ display: "none" }}
        type="file"
      />

      {props.value.length ? (
        <List sx={{ mb: 2 }}>
          {props.value.map((x) => (
            <ListItem
              divider
              // secondaryAction={
              //   <IconButton color="error" edge="end">
              //     <Delete />
              //   </IconButton>
              // }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "white" }}>
                  <FileDownload />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={x.name}
                secondary={`${(x.size / 1_000_000).toFixed(2)}MB`}
              />
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  );
}
