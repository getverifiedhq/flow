import { IForm } from "../types";
import { FORM_GET_VERIFIED } from "./get-verified.form";
import { FORM_POCKET_PROPERTY } from "./pocket-property.form";
import { FORM_POCKET_PROPERTY_STAGING } from "./pocket-property-staging.form";
import { FORM_REVO_PROPERTY_GUARANTOR } from "./revo-property-guarantor.form";
import { FORM_REVO_PROPERTY_INDIVIDUAL_GUARANTOR } from "./revo-property-individual-guarantor.form";
import { FORM_REVO_PROPERTY_INDIVIDUAL } from "./revo-property-individual.form";
import { FORM_SAMPLE } from "./sample.form";

export const FORMS: Array<IForm> = [
  FORM_GET_VERIFIED,
  FORM_POCKET_PROPERTY,
  FORM_POCKET_PROPERTY_STAGING,
  FORM_REVO_PROPERTY_INDIVIDUAL,
  FORM_REVO_PROPERTY_INDIVIDUAL_GUARANTOR,
  FORM_REVO_PROPERTY_GUARANTOR,
  FORM_SAMPLE,
];
