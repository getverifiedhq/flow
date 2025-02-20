import axios from "axios";
import { useParams } from "react-router-dom";
import { FormComponent } from "../components/form.component";
import { FORM_REVO_PROPERTY, IForm, IRecord } from "../core";
import { useFetch } from "../hooks";

const FORM: IForm = FORM_REVO_PROPERTY;

export function MainRoute() {
  const params = useParams();

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
            }
          );

      return response.data;
    },
  });

  if (!fetch.result) {
    return <></>;
  }

  return (
    <>
      <FormComponent
        disabled={fetch.result.disabled}
        data={fetch.result.data}
        form={FORM}
        onSubmit={async (data, submit: boolean) => {
          await fetch.fetch(data);

          if (fetch.result && submit) {
            if (fetch.result.paystack) {
              window.location.href = `${window.location.origin}`;

              return;
            }

            const response = await axios.post(
              "https://api.paystack.co/transaction/initialize",
              {
                amount: 99500, // TODO
                channels: ["card"],
                email: data["applicant_email_address"],
                callback_url: `${window.location.origin}`,
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
          }
        }}
      />
    </>
  );
}
