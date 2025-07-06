import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Link,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { THEME_REVO_PROPERTY } from "../core";

const options = [
  {
    id: "individual",
    title: "Apply as an Individual",
    description:
      "Apply in your own name and take full responsibility for the lease, including rental payments and obligations.",
  },
  {
    id: "individual-guarantor",
    title:
      "Apply as an Individual with a Family Member or Guardian as a Guarantor",
    description:
      "Apply in your name with financial support from a family member or guardian who will act as a guarantor.",
  },
  {
    id: null,
    title:
      "Apply as an Individual with a Company, Bursary, or Sponsor as a Guarantor",
    description:
      "Apply in your name with financial support from a company, bursary, or sponsor acting as a guarantor",
  },
  {
    id: null,
    title: "Apply as a Company",
    description:
      "Apply on behalf of a registered company, which will be responsible for the lease and rental payments.",
  },
];

const image: string =
  "https://www.jotform.com/uploads/RevoProperty/form_files/Screenshot%202023-08-01%20at%2007.10.28.64c8a8305d94d3.56571317.png";

export function SelectorRoute() {
  return (
    <>
      <ThemeProvider theme={THEME_REVO_PROPERTY}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, pt: 4, pb: 6 }}>
            {image ? (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img height={24} src={image} />
              </Box>
            ) : null}

            <Typography sx={{ mb: 4, textAlign: "center" }} variant="h5">
              Select a Rental Application
            </Typography>

            <Box sx={{ mb: 6 }}>
              {options.map((x) => (
                <Card sx={{ mb: 2 }}>
                  <CardContent key={x.id}>
                    <Typography gutterBottom variant="h6" component="div">
                      {x.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {x.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      disabled={x.id ? false : true}
                      href={x.id ? `/${x.id}` : "#"}
                      size="small"
                    >
                      Continue
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <img
                height={16}
                src="https://secure.getverified.co.za/images/get-verified-white.png"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                fontSize: "0.875rem",
                gap: 1,
                justifyContent: "center",
                pb: 2,
              }}
            >
              <Link
                color="inherit"
                href="https://app.termly.io/policy-viewer/policy.html?policyUUID=0d4ae206-f485-46bf-a3be-0ff5c855dcea"
                target="_blank"
                underline="none"
              >
                Terms &amp; Conditions
              </Link>
              <span>&#x2022;</span>
              <Link
                color="inherit"
                href="https://app.termly.io/policy-viewer/policy.html?policyUUID=f8de3869-e20f-4f83-bf4b-2cfc44b82f32"
                target="_blank"
                underline="none"
              >
                Privacy Policy
              </Link>
            </Box>
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
