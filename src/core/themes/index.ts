import { Theme } from "@mui/material";
import { THEME_REVO_PROPERTY } from "./revo-property.theme";
import { THEME_SAMPLE } from "./sample.theme";

export const THEMES: { [key: string]: Theme } = {
  "get-verified": THEME_SAMPLE,
  "revo-property": THEME_REVO_PROPERTY,
  sample: THEME_SAMPLE,
};
