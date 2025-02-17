import { useState } from "react";
import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { IForm } from "../core";
import { SectionComponent } from "./section.component";

export function FormComponent(props: {
  data: { [key: string]: string };
  form: IForm;
  onSubmit: (data: { [key: string]: string }, submit: boolean) => Promise<void>;
}) {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <img height={40} src={props.form.image} />
        </Box>

        <Stepper activeStep={activeStep} orientation="vertical">
          {props.form.sections.map((section, index: number) => (
            <Step key={index}>
              <StepLabel
                optional={section.description || undefined}
                onClick={() =>
                  index < activeStep ? setActiveStep(index) : null
                }
              >
                {section.title}
              </StepLabel>
              <StepContent>
                <SectionComponent
                  data={props.data}
                  onSubmit={async (x) => {
                    setActiveStep(activeStep + 1);

                    await props.onSubmit(
                      {
                        ...props.data,
                        ...x,
                      },
                      false
                    );
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
