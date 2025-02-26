import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { FORMS, IForm } from "../core";
import { useFetch } from "../hooks";

export function ThankYouRoute() {
  const params = useParams();

  const form = useFetch({
    auto: true,
    dependencies: [params.formId],
    fn: async (): Promise<IForm | null> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return (
        FORMS.find((x) => x.id === params.formId) ||
        FORMS.find((x) => x.id === "revo-property") ||
        null
      );
    },
  });

  if (!form.result) {
    return <></>;
  }

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img height={40} src={form.result.image} />
        </Box>

        <Typography sx={{ mb: 2, textAlign: "center" }} variant="h5">
          Thank You!
        </Typography>

        <Typography sx={{ mb: 4, textAlign: "center" }} variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet
          enim nisi, fringilla mollis magna interdum ac. Suspendisse erat massa,
          mattis a convallis in, pharetra quis ante.
        </Typography>
      </Box>
    </>
  );
}
