import { Theme } from "@mui/material";
import { THEME_REVO_PROPERTY } from "./revo-property.theme";
import { THEME_SAMPLE } from "./sample.theme";
// import { THEME_QUAY_1_INTERNATIONAL_REALTY } from "./quay-1-international-realty.theme";

export const THEMES: { [key: string]: Theme } = {
  "get-verified": THEME_SAMPLE,
  // "get-verified": THEME_QUAY_1_INTERNATIONAL_REALTY,
  "revo-property": THEME_REVO_PROPERTY,
  "revo-property-individual": THEME_REVO_PROPERTY,
  "revo-property-individual-guarantor": THEME_REVO_PROPERTY,
  "revo-property-guarantor": THEME_REVO_PROPERTY,
  sample: THEME_SAMPLE,
};
