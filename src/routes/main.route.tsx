import axios from "axios";
import { useParams } from "react-router-dom";
import { FormComponent } from "../components/form.component";
import {
  FORM_GET_VERIFIED,
  FORM_QUAY1_INTERNATIONAL_REALTY,
  FORM_REVO_PROPERTY,
  IForm,
  IRecord,
} from "../core";
import { useFetch } from "../hooks";

export function MainRoute() {
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

  const fetch = useFetch({
    auto: true,
    dependencies: [params.id],
    fn: async (data: { [key: string]: any } | null): Promise<IRecord> => {
      if (params.id) {
        if (!data) {
          const response = await axios.get<IRecord>(
            `https://staging.api.getverified.co.za/api/v1/records/${params.id}`
          );

          return response.data;
        }

        const response = await axios.put<IRecord>(
          `https://staging.api.getverified.co.za/api/v1/records/${params.id}`,
          {
            data,
          }
        );

        return response.data;
      }

      const response = fetch.result
        ? await axios.put<IRecord>(
            `https://staging.api.getverified.co.za/api/v1/records/${fetch.result.id}`,
            {
              data: data || {},
            }
          )
        : await axios.post<IRecord>(
            "https://staging.api.getverified.co.za/api/v1/records",
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
              // TODO: call webhook or submit document becuase it will be in edit mode
              // TODO: change to router
              window.location.href = `${window.location.origin}/${params.formId}/${fetch.result.id}/thank-you`;

              return;
            }

            if (form.result.payment) {
              const response = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                {
                  amount: form.result.payment.amount,
                  channels: ["card"],
                  email: data["applicant_email_address"],
                  callback_url: `${window.location.origin}/${params.formId}/${fetch.result.id}/thank-you`,
                  metadata: {
                    reference: fetch.result.id,
                  },
                },
                {
                  headers: {
                    authorization: `Bearer sk_test_8809a4e2627f05d5106219d51ebaef49aa1a0993`,
                  },
                }
              );

              window.location.href = response.data.data.authorization_url;

              return;
            }

            // TODO: call webhook or submit document becuase it will be in edit mode
            // TODO: change to router
            window.location.href = `${window.location.origin}/${params.formId}/${fetch.result.id}/thank-you`;
          }
        }}
      />
    </>
  );
}
