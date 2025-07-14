import { useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import {
  buildInitialValues,
  buildValidationSchema,
  IField,
  ISection,
} from "../core";
import { FieldComponent } from "./field.component";

export function SectionComponent(props: {
  data: Record<string, any>;
  disabled: boolean;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  section: ISection;
}) {
  const formik = useFormik({
    initialValues: buildInitialValues(props.section.fields, props.data),
    onSubmit: async (values) => {
      props.onSubmit(values);
    },
    validationSchema: buildValidationSchema(props.section.fields),
  });

  const formikValues = useRef(formik.values);

  useEffect(() => {
    const obj = Object.keys(formik.values).reduce((dict, key) => {
      if (formik.values[key] !== formikValues.current[key]) {
        dict[key] = formik.values[key];
      }
      return dict;
    }, {} as Record<string, any>);

    if (Object.keys(obj).length > 0) {
      if (props.section.onChange) {
        props.section.onChange(obj, formik);
      }

      formikValues.current = formik.values;
    }
  }, [formik.values]);

  useEffect(() => {
    formik.setValues(buildInitialValues(props.section.fields, props.data));
  }, [props.data]);

  return (
    <Box sx={{ my: 2 }}>
      {props.section.fields.map((field: IField, index: number) => (
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

      <Button
        disabled={formik.isSubmitting}
        fullWidth
        onClick={() => formik.submitForm()}
        variant="contained"
      >
        Continue
      </Button>
    </Box>
  );
}
