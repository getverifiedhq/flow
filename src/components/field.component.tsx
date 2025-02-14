import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IField } from "../core";
import { UploadPhotoFieldComponent } from "./fields/upload-photo-field.component";
import { UploadFieldComponent } from "./fields/upload-field.component";

export function FieldComponent(props: {
  disbaled: boolean;
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
    return (
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel shrink>{props.field.title}</InputLabel>
        <Select
          disabled={props.disbaled}
          error={props.error}
          id={props.field.name}
          label={props.field.title}
          name={props.field.name}
          notched
          onBlur={props.handleBlur}
          onChange={props.handleChange}
          value={props.value}
        >
          {props.field.options.map((x, index: number) => (
            <MenuItem key={index} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (props.field.type === "upload") {
    if (props.field.format === "photo") {
      return (
        <UploadPhotoFieldComponent field={props.field} onChange={() => {}} />
      );
    }

    return <UploadFieldComponent field={props.field} onChange={() => {}} />;
  }

  if (props.field.type === "agreement") {
    return <></>;
  }

  if (props.field.type === "text") {
    return (
      <TextField
        disabled={props.disbaled}
        error={props.error}
        fullWidth
        //   helperText="Enter your first name as it appears on your ID."
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
        placeholder={props.field.placeholder || undefined}
        slotProps={{
          htmlInput: {
            inputMode: props.field.format === "numeric" ? "numeic" : undefined,
          },
          inputLabel: {
            // shrink: props.field.format === "date" ? true : false,
            shrink: true,
          },
        }}
        sx={{ mb: 2 }}
        type={props.field.format === "date" ? "date" : "text"}
        value={props.value}
      />
    );
  }

  return (
    <TextField
      //   disabled={applicant.result.status !== "pending"}
      //   error={formik.touched.firstName && formik.errors.firstName ? true : false}
      fullWidth
      //   helperText="Enter your first name as it appears on your ID."
      id={props.field.name}
      label={props.field.title}
      name={props.field.name}
      //   onBlur={formik.handleBlur}
      //   onChange={formik.handleChange}
      //   onKeyUp={(e) => {
      //     if (e.key === "Enter") {
      //       formik.submitForm();
      //     }
      //   }}
      sx={{ mb: 2 }}
      type="text"
      // value={formik.values.firstName}
    />
  );
}
