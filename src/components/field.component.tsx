import { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format, parseISO } from "date-fns";
import SignatureCanvas from "react-signature-canvas";
import { IField } from "../core";
import { UploadFieldComponent } from "./fields/upload-field.component";
import { SearchableDropdownAsync } from "./fields/searchable-dropdown-async.component";

export function FieldComponent(props: {
  disabled: boolean;
  error: boolean;
  field: IField;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  value: any;
}) {
  if (props.field.type === "dropdown") {
    if (props.field.choicesByUrl) {
      return (
        <SearchableDropdownAsync
          disabled={props.disabled}
          error={props.error}
          field={props.field}
          handleBlur={props.handleBlur}
          handleChange={props.handleChange}
          value={props.value}
        />
      );
    }

    return (
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>{props.field.title}</InputLabel>
        <Select
          disabled={props.disabled}
          error={props.error}
          id={props.field.name}
          label={props.field.title}
          name={props.field.name}
          notched
          onBlur={props.handleBlur}
          onChange={props.handleChange}
          value={props.value}
        >
          {(props.field.choicesOrder
            ? props.field.choices.sort()
            : props.field.choices
          ).map((x, index: number) => (
            <MenuItem key={index} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (props.field.type === "file") {
    return (
      <UploadFieldComponent
        field={props.field}
        onChange={(files) =>
          props.handleChange({
            target: {
              name: props.field.name,
              value: files,
            },
          })
        }
        value={props.value}
      />
    );
  }

  if (props.field.type === "signaturepad") {
    const refBox = useRef(null as HTMLDivElement | null);

    const refSignatureCanvas = useRef(null as SignatureCanvas | null);

    const [_, setState] = useState(false);

    useEffect(() => {
      setState(true);
    }, [refBox]);

    return (
      <>
        <Typography component="div" sx={{ mb: 2 }} variant="body1">
          <article
            dangerouslySetInnerHTML={{ __html: props.field.description || "" }}
          ></article>
        </Typography>
        <Box ref={refBox} sx={{ mb: 2 }}>
          {refBox && refBox.current ? (
            <SignatureCanvas
              backgroundColor="#f9f9f9"
              canvasProps={{
                height: Math.floor(refBox.current.clientWidth / 2),
                style: { borderRadius: "0.5rem" },
                width: refBox.current.clientWidth,
              }}
              onEnd={() =>
                props.handleChange({
                  target: {
                    name: props.field.name,
                    value: refSignatureCanvas.current?.isEmpty()
                      ? ""
                      : refSignatureCanvas.current?.toDataURL("image/png"),
                  },
                })
              }
              penColor="black"
              ref={refSignatureCanvas}
            />
          ) : null}
        </Box>
      </>
    );
  }

  if (props.field.type === "text") {
    if (props.field.inputType === "currency") {
      return (
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel shrink>{props.field.title}</InputLabel>
          <OutlinedInput
            disabled={props.disabled}
            error={props.error}
            fullWidth
            // helperText={props.field.description}
            id={props.field.name}
            label={props.field.title}
            name={props.field.name}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") {
            //     formik.submitForm();
            //   }
            // }}
            placeholder={props.field.placeholder}
            slotProps={{
              input: {
                inputMode: "numeric",
              },
            }}
            startAdornment={<InputAdornment position="start">R</InputAdornment>}
            sx={{ mb: 2 }}
            type="text"
            value={props.value}
          />
        </FormControl>
      );
    }

    if (props.field.inputType === "date" || props.field.inputType === "month") {
      return (
        <DatePicker
          disabled={props.disabled}
          label={props.field.title}
          maxDate={props.field.max ? new Date(props.field.max) : undefined}
          minDate={props.field.min ? new Date(props.field.min) : undefined}
          name={props.field.name}
          onChange={(value: Date | null) =>
            props.handleChange({
              target: {
                name: props.field.name,
                value: value ? format(value, "yyyy-MM-dd HH:mm:ss") : undefined,
              },
            })
          }
          onOpen={() =>
            props.handleBlur({ target: { name: props.field.name } })
          }
          slotProps={{
            textField: {
              error: props.error,
              fullWidth: true,
              helperText: props.field.description,
              id: props.field.name,
              slotProps: {
                input: {
                  notched: true,
                },
                inputLabel: {
                  shrink: true,
                },
              },
              variant: "outlined",
            },
          }}
          sx={{ mb: 2 }}
          timezone="UTC"
          value={props.value ? parseISO(props.value) : null}
          views={
            props.field.inputType === "month" ? ["month", "year"] : undefined
          }
        />
      );
    }

    return (
      <TextField
        disabled={props.disabled}
        error={props.error}
        fullWidth
        helperText={props.field.description}
        id={props.field.name}
        label={props.field.title}
        name={props.field.name}
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        // onKeyUp={(e) => {
        //   if (e.key === "Enter") {
        //     formik.submitForm();
        //   }
        // }}
        placeholder={props.field.placeholder}
        slotProps={{
          htmlInput: {
            inputMode: props.field.inputType
              ? { email: "email", number: "numeric", tel: "tel" }[
                  props.field.inputType
                ]
              : undefined,
          },
          inputLabel: {
            shrink: true,
          },
        }}
        sx={{ mb: 2 }}
        type="text"
        value={props.value}
      />
    );
  }

  return <></>;
}
