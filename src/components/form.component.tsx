import { useEffect, useState } from "react";
import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { IForm } from "../core";
import { SectionComponent } from "./section.component";

export function FormComponent(props: {
  form: IForm;
  onSubmit: (data: { [key: string]: string }) => Promise<void>;
}) {
  const [state, setState] = useState({
    activeStep: 0,
    data: {} as { [key: string]: string },
  });

  useEffect(() => {}, [state]);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <img height={24} src={props.form.image} />
        </Box>

        <Stepper activeStep={state.activeStep} orientation="vertical">
          {props.form.sections.map((section, index: number) => (
            <Step key={index}>
              <StepLabel
                optional={section.description || undefined}
                onClick={() =>
                  setState({
                    activeStep: index,
                    data: state.data,
                  })
                }
              >
                {section.title}
              </StepLabel>
              <StepContent>
                <SectionComponent
                  onSubmit={async (x) =>
                    setState({
                      activeStep: state.activeStep + 1,
                      data: {
                        ...state.data,
                        ...x,
                      },
                    })
                  }
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
