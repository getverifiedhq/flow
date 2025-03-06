import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { THEMES } from "../core";

const options = [
  {
    title: "Apply as an Individual",
    description:
      "Apply in your own name and take full responsibility for the lease, including rental payments and obligations.",
  },
  {
    title:
      "Apply as an Individual with a Family Member or Guardian as a Guarantor",
    description:
      "Apply in your name with financial support from a family member or guardian who will act as a guarantor.",
  },
  {
    title:
      "Apply as an Individual with a Company, Bursary, or Sponsor as a Guarantor",
    description:
      "Apply in your name with financial support from a company, bursary, or sponsor acting as a guarantor",
  },
  {
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
      <ThemeProvider theme={THEMES["revo-property"]}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
            {image ? (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <img height={24} src={image} />
              </Box>
            ) : null}

            <Typography sx={{ mb: 2, textAlign: "center" }} variant="h5">
              Select a Rental Application
            </Typography>

            {options.map((x, index) => (
              <Card sx={{ mb: 2 }}>
                <CardContent key={index}>
                  <Typography gutterBottom variant="h6" component="div">
                    {x.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {x.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="primary" href="/revo-property" size="small">
                    Continue
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
