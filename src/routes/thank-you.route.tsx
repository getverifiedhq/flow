import { Box, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { useParams } from "react-router-dom";
import { FORMS, IForm, THEME_GET_VERIFIED, THEMES } from "../core";
import { useFetch } from "../hooks";

export function ThankYouRoute() {
  const params = useParams();

  const form = useFetch({
    auto: true,
    dependencies: [params.formId],
    fn: async (): Promise<IForm | null> => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return (
        FORMS.find((x) => x.id === params.formId) ||
        FORMS.find((x) => x.id === "get-verified") ||
        null
      );
    },
  });

  if (!form.result) {
    return <></>;
  }

  return (
    <>
      <ThemeProvider theme={THEMES[form.result.id] || THEME_GET_VERIFIED}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
            {form.result.image ? (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img height={24} src={form.result.image} />
              </Box>
            ) : null}

            <Typography sx={{ mb: 2, textAlign: "center" }} variant="h5">
              Thank You!
            </Typography>

            <Typography sx={{ mb: 4, textAlign: "center" }} variant="body1">
              You&apos;ll receive an email shortly.
            </Typography>
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
