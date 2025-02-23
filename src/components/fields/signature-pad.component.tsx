import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { IFieldProps, ISignaturePadField } from "../../core";

export function SignaturePadComponent(props: IFieldProps<ISignaturePadField>) {
  const refBox = useRef(null as HTMLDivElement | null);

  const refSignatureCanvas = useRef(null as SignatureCanvas | null);

  const [_, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, [refBox]);

  return (
    <>
      <Typography component="div" sx={{ mb: 2 }} variant="body1">
        <article
          dangerouslySetInnerHTML={{ __html: props.field.description || "" }}
        ></article>
      </Typography>
      <Box ref={refBox} sx={{ mb: 2 }}>
        {refBox && refBox.current ? (
          <SignatureCanvas
            backgroundColor="#f9f9f9"
            canvasProps={{
              height: Math.floor(refBox.current.clientWidth / 2),
              style: { borderRadius: "0.5rem" },
              width: refBox.current.clientWidth,
            }}
            onEnd={() =>
              props.handleChange({
                target: {
                  name: props.field.name,
                  value: refSignatureCanvas.current?.isEmpty()
                    ? ""
                    : refSignatureCanvas.current?.toDataURL("image/png"),
                },
              })
            }
            penColor="black"
            ref={refSignatureCanvas}
          />
        ) : null}
      </Box>
    </>
  );
}
