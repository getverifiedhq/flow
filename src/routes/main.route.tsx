import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FormComponent } from "../components/form.component";
import { FORMS, IForm, IRecord, THEMES } from "../core";
import { useFetch } from "../hooks";

export function MainRoute() {
  const params = useParams();

  const navigate = useNavigate();

  const form = useFetch({
    auto: true,
    dependencies: [params.formId],
    fn: async (): Promise<IForm | null> => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      return (
        FORMS.find((x) => x.id === params.formId) ||
        FORMS.find((x) => x.id === "get-verified") ||
        null
      );
    },
  });

  const fetch = useFetch({
    auto: true,
    dependencies: [params.id],
    fn: async (data: { [key: string]: any } | null): Promise<IRecord> => {
      if (params.id) {
        if (!data) {
          const response = await axios.get<IRecord>(
            `https://api.getverified.co.za/api/v1/records/${params.id}`
          );

          return response.data;
        }

        const response = await axios.put<IRecord>(
          `https://api.getverified.co.za/api/v1/records/${params.id}`,
          {
            data,
          }
        );

        return response.data;
      }

      const response = fetch.result
        ? await axios.put<IRecord>(
            `https://api.getverified.co.za/api/v1/records/${fetch.result.id}`,
            {
              data: data || {},
            }
          )
        : await axios.post<IRecord>(
            "https://api.getverified.co.za/api/v1/records",
            {
              data: data || {},
              metadata: {
                formId: params.formId,
              },
            }
          );

      return response.data;
    },
  });

  if (!form.result) {
    return <></>;
  }

  if (!fetch.result) {
    return <></>;
  }

  return (
    <>
      <ThemeProvider theme={THEMES[form.result.id]}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormComponent
            disabled={fetch.result.disabled}
            data={fetch.result.data}
            form={form.result}
            onSubmit={async (data, submit: boolean) => {
              await fetch.fetch(data);

              if (!form.result) {
                return;
              }

              if (fetch.result && submit) {
                if (fetch.result.payment) {
                  await axios.post<IRecord>(
                    `https://api.getverified.co.za/api/v1/webhooks/paystack`,
                    {
                      data: {
                        metadata: {
                          reference: fetch.result.id,
                          url: `${window.location.origin}/${form.result.id}/${fetch.result.id}`,
                          workflow: form.result.id,
                        },
                        reference: fetch.result.payment.transaction.reference,
                        status: "success",
                      },
                    }
                  );

                  navigate(`/${form.result.id}/${fetch.result.id}/thank-you`);

                  return;
                }

                if (form.result.payment) {
                  const response = await axios.post(
                    "https://api.paystack.co/transaction/initialize",
                    {
                      amount: form.result.payment.amount,
                      channels: ["card"],
                      email: data["applicant_email_address"],
                      callback_url: `${window.location.origin}/${form.result.id}/${fetch.result.id}/thank-you`,
                      metadata: {
                        reference: fetch.result.id,
                        url: `${window.location.origin}/${form.result.id}/${fetch.result.id}`,
                        workflow: form.result.id,
                      },
                    },
                    {
                      headers: {
                        authorization: `Bearer ${
                          import.meta.env.PROD
                            ? "sk_live_6280b04e712004355bb26155e3494011c2196fd6"
                            : "sk_test_8809a4e2627f05d5106219d51ebaef49aa1a0993"
                        }`,
                        // authorization: `Bearer ${"sk_test_8809a4e2627f05d5106219d51ebaef49aa1a0993"}`,
                      },
                    }
                  );

                  window.location.href = response.data.data.authorization_url;

                  return;
                }

                await axios.post<IRecord>(
                  `https://api.getverified.co.za/api/v1/webhooks/paystack`,
                  {
                    data: {
                      metadata: {
                        reference: fetch.result.id,
                        url: `${window.location.origin}/${form.result.id}/${fetch.result.id}`,
                        workflow: form.result.id,
                      },
                      reference: null,
                      status: "success",
                    },
                  }
                );

                navigate(`/${form.result.id}/${fetch.result.id}/thank-you`);
              }
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
