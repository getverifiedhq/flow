export type IBaseField = {
  name: string;
  title: string;
  description?: string;
  isRequired: boolean;
};

export type IDropdownField = IBaseField & {
  type: "dropdown";
  choices: Array<string>;
  choicesByUrl?: {
    url: string;
    path: string;
    valueName: string;
    titleName: string;
  };
  choicesOrder?: "asc" | "desc";
  placeholder?: string;
};

export type IFileField = IBaseField & {
  type: "file";
  allowMultiple: boolean;
  acceptedTypes: string;
  maxSize: number;
  sourceType: "camera" | "file" | "file-camera";
};

export type ISignaturePadField = IBaseField & {
  type: "signaturepad";
  placeholder: string;
  // penColor: string;
  // dataFormat: "jpg" | "png";
};

export type ITextField = IBaseField & {
  type: "text";
  inputType?: "date" | "email" | "number" | "tel";
  placeholder?: string;
  validators?: Array<{
    type: "regex";
    text: string;
    regex: string;
  }>;
};

export type IField =
  | IDropdownField
  | IFileField
  | ISignaturePadField
  | ITextField;
