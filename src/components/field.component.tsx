import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format, parseISO } from "date-fns";
import { IField, IFieldProps } from "../core";
import { UploadFieldComponent } from "./fields/upload-field.component";
import { DropdownComponent } from "./fields/dropdown.component";
import { SignaturePadComponent } from "./fields/signature-pad.component";

export function FieldComponent(props: IFieldProps<IField>) {
  if (props.field.type === "dropdown") {
    return (
      <DropdownComponent
        disabled={props.disabled}
        error={props.error}
        field={props.field}
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        value={props.value}
      />
    );
  }

  if (props.field.type === "file") {
    return (
      <UploadFieldComponent
        disabled={props.disabled}
        error={props.error}
        field={props.field}
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        value={props.value}
      />
    );
  }

  if (props.field.type === "signature-pad") {
    return (
      <SignaturePadComponent
        disabled={props.disabled}
        error={props.error}
        field={props.field}
        handleBlur={props.handleBlur}
        handleChange={props.handleChange}
        value={props.value}
      />
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
