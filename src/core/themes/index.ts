import { Theme } from "@mui/material";
import { THEME_REVO_PROPERTY } from "./revo-property.theme";
import { THEME_POCKET_PROPERTY } from "./pocket-property.theme";
import { THEME_QUAY_1_INTERNATIONAL_REALTY } from "./quay-1-international-realty.theme";
import { THEME_TRAFALGAR } from "./trafalgar.theme";

export const THEMES: { [key: string]: Theme } = {
  "pocket-property": THEME_POCKET_PROPERTY,
  "quay-1-international-realty": THEME_QUAY_1_INTERNATIONAL_REALTY,
  "revo-property": THEME_REVO_PROPERTY,
  "revo-property-individual": THEME_REVO_PROPERTY,
  "revo-property-individual-guarantor": THEME_REVO_PROPERTY,
  "revo-property-guarantor": THEME_REVO_PROPERTY,
  trafalgar: THEME_TRAFALGAR,
};

export * from "./get-verified.theme";
