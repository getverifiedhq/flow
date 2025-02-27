export type IBaseField = {
  description?: string;
  isRequired: boolean;
  name: string;
  title: string;
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
  sourceType: "camera" | "file" | "file-camera";
  tags: Array<string>;
};

export type IPhotoField = IBaseField & {
  type: "photo";
};

export type ISignaturePadField = IBaseField & {
  type: "signature-pad";
  placeholder: string;
};

export type ITextField = IBaseField & {
  type: "text";
  inputType?: "currency" | "date" | "email" | "month" | "number" | "tel";
  max?: string;
  min?: string;
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
  | IPhotoField
  | ISignaturePadField
  | ITextField;
