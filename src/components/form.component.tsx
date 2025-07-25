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
import { IForm, parseDynamicProperty } from "../core";
import { SectionComponent } from "./section.component";

export function FormComponent(props: {
  data: Record<string, string>;
  disabled: boolean;
  form: IForm;
  onSubmit: (data: Record<string, string>, submit: boolean) => Promise<void>;
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", pt: 4, pb: 6, px: 2 }}>
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
            <Step
              key={index}
              completed={
                activeStep > index &&
                parseDynamicProperty(section.enabled, props.data, "boolean")
              }
            >
              <StepLabel
                optional={section.description || undefined}
                onClick={() =>
                  (index < activeStep || props.disabled) &&
                  parseDynamicProperty(section.enabled, props.data, "boolean")
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

                    const nextActiveStep = props.form.sections.findIndex(
                      (x, index) =>
                        index > activeStep &&
                        parseDynamicProperty(x.enabled, props.data, "boolean")
                    );

                    setActiveStep(nextActiveStep);
                  }}
                  section={section}
                />
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <img height={16} src="/images/get-verified.png" />
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
    </>
  );
}
