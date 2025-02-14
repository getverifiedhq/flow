export type IAgreementField = {
  name: string;

  required: boolean;

  text: string;

  type: "agreement";
};

export type IDropdown = {
  name: string;

  options: Array<any>;

  placeholder: string | null;

  required: boolean;

  title: string;

  type: "dropdown";
};

export type IDropdownAsync = {
  name: string;

  required: boolean;

  title: string;

  type: "dropdown_async";

  url: string;
};

export type ITextField = {
  format:
    | "date"
    | "email"
    | "mobile_number"
    | "numeric"
    | "south_african_identity_number"
    | null;

  name: string;

  placeholder: string | null;

  required: boolean;

  title: string;

  type: "text";
};

export type IUploadField = {
  format: "photo" | null;

  name: string;

  required: boolean;

  title: string;

  type: "upload";
};

export type IField =
  | IAgreementField
  | IDropdown
  | IDropdownAsync
  | ITextField
  | IUploadField;
