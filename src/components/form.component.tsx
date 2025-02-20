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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img height={40} src={props.form.image} />
        </Box>

        <Typography sx={{ mb: 4, textAlign: "center" }} variant="h5">
          {props.form.title}
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
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
      </Box>
    </>
  );
}
