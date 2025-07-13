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
    } else if (x.type === "file" || x.type === "photo") {
      dict[x.name] = data[x.name] || [];
    } else if (x.type === "multiple") {
      dict[x.name] = data[x.name] || [buildInitialValues(x.fields, {})]; // TODO
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

        dict[x.name] = buildCustomValidationSchema(schema, x);

        return dict;
      }

      if (x.type === "file" || x.type === "multiple" || x.type === "photo") {
        let schema = Yup.array();

        schema = schema.test("custom", function (value) {
          if (x.isRequired && (!value || value.length < 1)) {
            return this.createError({ message: "required" });
          }

          return true;
        });

        dict[x.name] = buildCustomValidationSchema(schema, x);

        return dict;
      }

      if (x.type === "signature-pad") {
        let schema = Yup.string();

        dict[x.name] = buildCustomValidationSchema(schema, x);

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

        dict[x.name] = buildCustomValidationSchema(schema, x);

        return dict;
      }

      return dict;
    }, {} as { [key: string]: any })
  );
}

function buildCustomValidationSchema(
  schema: Yup.Schema,
  field: IField
): Yup.Schema {
  const fns = field.validators
    ?.filter((validator) => validator.type === "code")
    .map((validator) => new Function("data", validator.value));

  schema = schema.test("custom", function (value) {
    if (field.isRequired && !value) {
      return this.createError({ message: "required" });
    }

    for (const fn of fns || []) {
      const result = fn({
        data: this.options.context,
        value,
      });

      if (!result) {
        return result;
      }
    }

    return true;
  });

  return schema;
}
