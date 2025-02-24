import * as Yup from "yup";
import { IField } from "../types";

export function buildInitialValues(
  fields: Array<IField>,
  data: { [key: string]: any }
) {
  return fields.reduce((dict, x) => {
    if (x.type === "dropdown") {
      if (x.choicesByUrl) {
        dict[x.name] = data[x.name] || null;
      } else {
        dict[x.name] = data[x.name] || "";
      }
    } else if (x.type === "file") {
      dict[x.name] = data[x.name] || [];
    } else {
      dict[x.name] = data[x.name] || "";
    }

    return dict;
  }, {} as { [key: string]: any });
}

export function buildValidationSchema(fields: Array<IField>) {
  return Yup.object().shape(
    fields.reduce((dict, x) => {
      if (x.type === "dropdown") {
        if (x.choicesByUrl) {
          let schema = Yup.object();

          dict[x.name] = schema;

          return dict;
        }

        let schema = Yup.string();

        if (x.isRequired) {
          schema = schema.required();
        } else {
          schema = schema.optional();
        }

        dict[x.name] = schema;

        return dict;
      }

      if (x.type === "file") {
        let schema = Yup.array();

        if (x.isRequired) {
          schema = schema.min(1);
        } else {
          schema = schema.min(0);
        }

        dict[x.name] = schema;

        return dict;
      }

      if (x.type === "signature-pad") {
        let schema = Yup.string();

        if (x.isRequired) {
          schema = schema.required();
        } else {
          schema = schema.optional();
        }

        dict[x.name] = schema;

        return dict;
      }

      if (x.type === "text") {
        let schema = Yup.string();

        if (x.inputType === "email") {
          schema = schema.email();
        }

        if (x.inputType === "number") {
          schema = schema.matches(/^\d*$/);
        }

        if (x.inputType === "tel") {
          schema = schema.matches(/^\d*$/);
        }

        if (x.isRequired) {
          schema = schema.required();
        } else {
          schema = schema.optional();
        }

        dict[x.name] = schema;

        return dict;
      }

      return dict;
    }, {} as { [key: string]: any })
  );
}
