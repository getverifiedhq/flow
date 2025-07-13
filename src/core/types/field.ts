export type Validator = {
  text: string;
  type: "code" | "regex";
  value: string;
};

export interface IBaseField {
  name: string;

  title: string;

  description?: string;

  isRequired: boolean;

  validators?: Validator[];
}

export interface ICheckboxField extends IBaseField {
  type: "checkbox";
}

export interface IDropdownField extends IBaseField {
  type: "dropdown";

  choices?: string[];

  choicesByUrl?: {
    url: string;
    path: string; // JSON path to extract the array
    valueName: string; // Field in each item used as value
    titleName: string; // Field in each item used as label
  };

  choicesOrder?: "asc" | "desc";

  placeholder?: string;
}

export interface IFileField extends IBaseField {
  type: "file";

  sourceType: "camera" | "file" | "file-camera";

  tags?: string[];
}

export interface ILongTextField extends IBaseField {
  type: "long_text";

  placeholder?: string;
}

export interface IMultipleField extends IBaseField {
  type: "multiple";

  fields: IField[];
}

export interface IPhotoField extends IBaseField {
  type: "photo";
}

export interface ISignaturePadField extends IBaseField {
  type: "signature-pad";

  placeholder: string;
}

export interface ITextField extends IBaseField {
  type: "text";

  inputType?: "currency" | "date" | "email" | "month" | "number" | "tel";

  min?: string;

  max?: string;

  placeholder?: string;
}

export type IField =
  | ICheckboxField
  | IDropdownField
  | IFileField
  | ILongTextField
  | IMultipleField
  | IPhotoField
  | ISignaturePadField
  | ITextField;
