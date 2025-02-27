import { useState } from "react";
import {
  Box,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { IForm } from "../core";
import { SectionComponent } from "./section.component";

export function FormComponent(props: {
  data: { [key: string]: string };
  disabled: boolean;
  form: IForm;
  onSubmit: (data: { [key: string]: string }, submit: boolean) => Promise<void>;
}) {
  const [activeStep, setActiveStep] = useState(6);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        {props.form.image ? (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img height={40} src={props.form.image} />
          </Box>
        ) : null}

        {props.form.title ? (
          <Typography sx={{ mb: 4, textAlign: "center" }} variant="h5">
            {props.form.title}
          </Typography>
        ) : null}

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{ mb: 6, mt: props.form.title ? 0 : 4 }}
        >
          {props.form.sections.map((section, index: number) => (
            <Step key={index}>
              <StepLabel
                optional={section.description || undefined}
                onClick={() =>
                  index < activeStep || props.disabled
                    ? setActiveStep(index)
                    : null
                }
              >
                {section.title}
              </StepLabel>
              <StepContent>
                <SectionComponent
                  data={props.data}
                  disabled={props.disabled}
                  onSubmit={async (x) => {
                    if (!props.disabled) {
                      await props.onSubmit(
                        {
                          ...props.data,
                          ...x,
                        },
                        index + 1 >= props.form.sections.length
                      );
                    }

                    setActiveStep(activeStep + 1);
                  }}
                  section={section}
                />
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/* <Typography sx={{ color: "#b0bec5" }} variant="body2">
          By opting-in/entering into any agreement via any opt-in provision with
          any of the above-mentioned subsidiaries and /or companies, you hereby
          agree and consent to, that the requested service(s) be provided by
          Revo (Pty) Ltd, its subsidiaries or affiliates (“Revo”). At no stage
          shall any provision of service, agreed and consented to via any opt-in
          provision, constitute an agreement for the provision of services
          between yourself and the relevant subsidiary or affiliate. By agreeing
          to the opt-in provision, you hereby consent to engage with Revo only
          and share your personal information with the relevant subsidiary and
          affiliates for the provision of services, as requested. Such
          information shall only be used in line with the provisions of the
          Protection of Personal Information Act 4 of 2013 (“POPIA”) and you
          hereby consent to your information being processed in line with the
          provisions set out in POPIA, by both the subsidiary and affiliates
          concerned.
        </Typography> */}
      </Box>
    </>
  );
}
