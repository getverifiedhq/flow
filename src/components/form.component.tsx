import { useState } from "react";
import {
  Box,
  Link,
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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        {props.form.image ? (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <img height={24} src={props.form.image} />
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

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", pb: 2 }}>
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
    </>
  );
}
