import { FormComponent } from "../components/form.component";
import { IForm } from "../core";

const FORM: IForm = {
  image: "https://secure.getverified.co.za/logo.png",
  sections: [
    {
      description: null,
      fields: [
        {
          name: "listing",
          options: ["14 Milton Rd, Sea Point, Cape Town, 8060, South Africa"],
          placeholder: null,
          required: true,
          title: "Which property are you applying for?",
          type: "dropdown",
        },
        {
          format: "date",
          name: "move_in_date",
          placeholder: null,
          required: true,
          title: "When yould you like to move-in?",
          type: "text",
        },
      ],
      title: "Rental Information",
    },
    {
      description: null,
      fields: [
        {
          format: null,
          name: "applicant_first_name",
          placeholder: null,
          required: true,
          title: "First Name",
          type: "text",
        },
        {
          format: null,
          name: "applicant_last_name",
          placeholder: null,
          required: true,
          title: "Last Name",
          type: "text",
        },
        {
          format: null,
          name: "applicant_date_of_birth",
          placeholder: null,
          required: true,
          title: "Date of Birth",
          type: "text",
        },
        {
          format: null,
          name: "applicant_identity_number",
          placeholder: null,
          required: true,
          title: "Identity Number",
          type: "text",
        },
        {
          name: "applicant_marital_status",
          options: ["Single", "Married", "Divorced", "Other"],
          placeholder: null,
          required: true,
          title: "Marital Status",
          type: "dropdown",
        },
        {
          format: "email",
          name: "applicant_email_address",
          placeholder: null,
          required: true,
          title: "Email Address",
          type: "text",
        },
        {
          format: "mobile_number",
          name: "applicant_mobile_number",
          placeholder: null,
          required: true,
          title: "Mobile Number",
          type: "text",
        },
      ],
      title: "Personal Information",
    },
    // {
    //   description: null,
    //   fields: [
    //     {
    //       format: "photo",
    //       name: "applicant_documents_photo",
    //       required: true,
    //       title: "Photo",
    //       type: "upload",
    //     },
    //     {
    //       format: null,
    //       name: "applicant_documents_identity_document",
    //       required: true,
    //       title: "Identity Document",
    //       type: "upload",
    //     },
    //   ],
    //   title: "Identity Verification",
    // },
    {
      description: null,
      fields: [
        {
          format: null,
          name: "applicant_employment_employer_name",
          placeholder: "Mister Spex (Pty) Ltd",
          required: true,
          title: "Employer Name",
          type: "text",
        },
        {
          format: null,
          name: "applicant_employment_occupation",
          placeholder: "Supervisor",
          required: true,
          title: "Occupation",
          type: "text",
        },
        {
          format: "numeric",
          name: "applicant_employment_salary",
          placeholder: null,
          required: true,
          title: "Salary",
          type: "text",
        },
      ],
      title: "Employment Information",
    },
  ],
};

export function FormRoute() {
  return (
    <>
      <FormComponent form={FORM} onSubmit={async () => {}} />
    </>
  );
}
