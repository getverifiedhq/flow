import { IForm } from "../types";
import { FORM_GET_VERIFIED } from "./get-verified.form";
import { FORM_REVO_PROPERTY_GUARANTOR } from "./revo-property-guarantor.form";
import { FORM_REVO_PROPERTY } from "./revo-property.form";
import { FORM_SAMPLE } from "./sample.form";

export const FORMS: Array<IForm> = [
  FORM_GET_VERIFIED,
  FORM_REVO_PROPERTY,
  FORM_REVO_PROPERTY_GUARANTOR,
  FORM_SAMPLE,
];
