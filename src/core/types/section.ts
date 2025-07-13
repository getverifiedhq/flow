import { FormikErrors } from "formik";
import { IField } from "./field";

export type ISection = {
  description: string | null;

  enabled: string | boolean;

  fields: Array<IField>;

  onChange?: (
    obj: { [key: string]: any },
    formik: {
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
      ) => Promise<FormikErrors<any>> | Promise<void>;
    }
  ) => void | undefined;

  title: string;
};
