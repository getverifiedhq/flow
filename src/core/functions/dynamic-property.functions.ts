export function parseDynamicProperty<T>(
  value: any,
  data: any,
  resultType: "string" | "number" | "boolean" | "object"
): T {
  if (typeof value !== "string") {
    return value as T;
  }

  const interpolated = value.replace(/\{\{(.*?)\}\}/g, (_, expression) => {
    return safeExecute(expression.trim(), data);
  });

  return convertType<T>(interpolated, resultType);
}

function convertType<T>(
  value: any,
  resultType: "string" | "number" | "boolean" | "object"
): T {
  if (typeof value !== "string") {
    return value as T;
  }

  switch (resultType) {
    case "string":
      return value as unknown as T;
    case "number":
      const num = parseFloat(value);
      return (isNaN(num) ? 0 : num) as unknown as T;
    case "boolean":
      return (value.toLowerCase() === "true") as unknown as T;
    case "object":
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
  }
}

function safeExecute(expression: string, data: any): string {
  try {
    return new Function("data", `with(data) { return ${expression}; }`)(data);
  } catch (err) {
    console.error(`Error evaluating expression: ${expression}`, err);
    return "";
  }
}
