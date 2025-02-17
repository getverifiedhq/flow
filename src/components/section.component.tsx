import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IField, ISection } from "../core";
import { FieldComponent } from "./field.component";

export function SectionComponent(props: {
  data: { [key: string]: any };
  onSubmit: (data: { [key: string]: any }) => Promise<void>;
  section: ISection;
}) {
  const formik = useFormik({
    initialValues: props.section.fields.reduce((dict, x) => {
      if (x.type === "file") {
        dict[x.name] = props.data[x.name] || [];
      } else {
        dict[x.name] = props.data[x.name] || "";
      }

      return dict;
    }, {} as { [key: string]: any }),
    onSubmit: async (values) => {
      props.onSubmit(values);
    },
    validationSchema: Yup.object().shape(
      props.section.fields.reduce((dict, x) => {
        let schema = x.type === "file" ? Yup.array() : Yup.string();

        if (x.isRequired) {
          schema = schema.required();
        } else {
          schema = schema.optional();
        }

        dict[x.name] = schema;

        return dict;
      }, {} as { [key: string]: any })
    ),
  });

  return (
    <Box sx={{ my: 2 }}>
      {props.section.fields.map((field: IField, index: number) => (
        <FieldComponent
          disbaled={formik.isSubmitting}
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
