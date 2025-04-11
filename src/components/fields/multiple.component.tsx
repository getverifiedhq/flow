import { Box } from "@mui/material";
import { useEffect } from "react";
import { useFormik } from "formik";
import {
  buildInitialValues,
  buildValidationSchema,
  IField,
  IFieldProps,
  IMultipleField,
} from "../../core";
import { FieldComponent } from "../field.component";

export function MultipleComponent(props: IFieldProps<IMultipleField>) {
  const formik = useFormik({
    initialValues: buildInitialValues(props.field.fields, props.value),
    onSubmit: async (values) => {
      props.handleChange(values); // TODO
    },
    validationSchema: buildValidationSchema(props.field.fields),
  });

  useEffect(() => {
    formik.setValues(buildInitialValues(props.field.fields, props.value));
  }, [props.value]);

  return (
    <>
      {props.value.map((_: any, index: number) => (
        <Box key={index}>
          {/* <Typography sx={{ mb: 2 }} variant="body1">
          {props.field.title}
        </Typography> */}

          {props.field.fields.map((field: IField, index: number) => (
            <FieldComponent
              disabled={props.disabled || formik.isSubmitting}
              error={
                formik.touched[field.name] && formik.errors[field.name]
                  ? true
                  : false
              }
              field={field}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
              key={index}
              value={formik.values[field.name]}
            />
          ))}
        </Box>
      ))}
    </>
  );
}
