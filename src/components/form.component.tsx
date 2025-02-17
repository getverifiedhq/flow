import { useEffect, useState } from "react";
import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { IForm } from "../core";
import { SectionComponent } from "./section.component";

export function FormComponent(props: {
  data: { [key: string]: string };
  form: IForm;
  onSubmit: (data: { [key: string]: string }) => Promise<void>;
}) {
  const [state, setState] = useState({
    activeStep: 2,
    data: props.data,
  });

  useEffect(() => {}, [state]);

  return (
    <>
      <Box sx={{ margin: "auto", maxWidth: "576px", px: 2, py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <img height={40} src={props.form.image} />
        </Box>

        <Stepper activeStep={state.activeStep} orientation="vertical">
          {props.form.sections.map((section, index: number) => (
            <Step key={index}>
              <StepLabel
                optional={section.description || undefined}
                onClick={() =>
                  index < state.activeStep
                    ? setState({
                        activeStep: index,
                        data: state.data,
                      })
                    : null
                }
              >
                {section.title}
              </StepLabel>
              <StepContent>
                <SectionComponent
                  data={state.data}
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
