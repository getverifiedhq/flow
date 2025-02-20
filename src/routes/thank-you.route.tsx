import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  FORM_GET_VERIFIED,
  FORM_QUAY1_INTERNATIONAL_REALTY,
  FORM_REVO_PROPERTY,
  IForm,
} from "../core";
import { useFetch } from "../hooks";

export function ThankYouRoute() {
  const params = useParams();

  const form = useFetch({
    auto: true,
    dependencies: [params.formId],
    fn: async (): Promise<IForm> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return (
        [
          FORM_GET_VERIFIED,
          FORM_REVO_PROPERTY,
          FORM_QUAY1_INTERNATIONAL_REALTY,
        ].find((x) => x.id === params.formId) || FORM_REVO_PROPERTY
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
