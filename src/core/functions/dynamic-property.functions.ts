export function parseDynamicProperty<T>(
  value: any,
  data: any,
  resultType: "string" | "number" | "boolean" | "object"
): T {
  if (typeof value === "string") {
    let result: string = "";

    let index: number = 0;

    let c: string = "";

    while (index < value.length) {
      c = value[index];

      if (c === "{" && value[index + 1] === "{") {
        let buffer: string = "";

        index++;
        index++;

        while (true) {
          c = value[index];

          if (c === "}" && value[index + 1] === "}") {
            index++;
            index++;

            break;
          }

          buffer += c;

          index++;
        }

        result += code(buffer, data);

        continue;
      }

      result += c;

      index++;
    }

    return toType(result, resultType);
  }

  return value;
}

export function toType(
  value: any,
  resultType: "string" | "number" | "boolean" | "object"
) {
  if (typeof value === "string") {
    if (resultType === "string" || resultType === "object") {
      return value;
    }

    if (resultType === "number") {
      return parseFloat(value);
    }

    if (resultType === "boolean") {
      return value.toLowerCase() === "true";
    }
  }

  return value;
}

export function code(value: string, data: any) {
  return new Function("data", value)(data);
}
