import { Theme } from "@mui/material";
import { THEME_POCKET_PROPERTY } from "./pocket-property.theme";
import { THEME_QUAY_1_INTERNATIONAL_REALTY } from "./quay-1-international-realty.theme";
import { THEME_TRAFALGAR } from "./trafalgar.theme";

export const THEMES: { [key: string]: Theme } = {
  "pocket-property": THEME_POCKET_PROPERTY,
  "pocket-property-staging": THEME_POCKET_PROPERTY,
  "quay-1-international-realty": THEME_QUAY_1_INTERNATIONAL_REALTY,
  trafalgar: THEME_TRAFALGAR,
};

export * from "./get-verified.theme";
