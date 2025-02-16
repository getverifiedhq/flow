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

export type ISignaturePadField = {
  type: "signaturepad";
  name: string;
  title: string;
  description: string;
  isRequired: boolean;
  signatureAutoScaleEnabled: boolean;
  penMinWidth: number;
  penMaxWidth: number;
  placeholder: string;
  placeholderReadOnly: string;
  penColor: string;
  dataFormat: "jpg" | "png";
  waitForUpload: boolean;
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
