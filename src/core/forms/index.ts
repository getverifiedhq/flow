import { IForm } from "../types";
import { FORM_REVO_PROPERTY_GUARANTOR } from "./revo-property-guarantor.form";
import { FORM_REVO_PROPERTY_INDIVIDUAL } from "./revo-property-individual.form";
import { FORM_REVO_PROPERTY_INDIVIDUAL_GUARANTOR } from "./revo-property-individual-guarantor.form";
import { FORM_REVO_PROPERTY_COMPANY } from "./revo-property-company.form";

export const FORMS: Array<IForm> = [
  FORM_REVO_PROPERTY_COMPANY,
  FORM_REVO_PROPERTY_INDIVIDUAL,
  FORM_REVO_PROPERTY_INDIVIDUAL_GUARANTOR,
  FORM_REVO_PROPERTY_GUARANTOR,
];
