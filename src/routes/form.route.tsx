import { FormComponent } from "../components/form.component";
import { IForm } from "../core";

const FORM: IForm = {
  image: "https://secure.getverified.co.za/logo.png",
  sections: [
    {
      description: null,
      fields: [
        {
          type: "dropdown",
          name: "listing",
          title: "Which property are you applying for?",
          isRequired: true,
          choices: ["14 Milton Rd, Sea Point, Cape Town, 8060, South Africa"],
        },
        {
          type: "text",
          name: "move_in_date",
          title: "When yould you like to move-in?",
          isRequired: true,
          inputType: "date",
        },
      ],
      title: "Rental Information",
    },
    {
      description: null,
      fields: [
        {
          type: "text",
          name: "applicant_first_name",
          title: "First Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "applicant_last_name",
          title: "Last Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "applicant_date_of_birth",
          title: "Date of Birth",
          isRequired: true,
          inputType: "date",
        },
        {
          type: "text",
          name: "applicant_identity_number",
          title: "Identity Number",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "applicant_marital_status",
          title: "Marital Status",
          isRequired: true,
          choices: ["Single", "Married", "Divorced", "Other"],
        },
        {
          type: "text",
          name: "applicant_email_address",
          title: "Email Address",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "text",
          name: "applicant_mobile_number",
          title: "Mobile Number",
          isRequired: true,
          inputType: "tel",
        },
      ],
      title: "Personal Information",
    },
    {
      description: null,
      fields: [
        // {
        //   format: "photo",
        //   name: "applicant_documents_photo",
        //   required: true,
        //   title: "Photo",
        //   type: "upload",
        // },
        {
          type: "file",
          name: "applicant_documents_identity_document",
          title: "Identity Document",
          description: "Upload a photo of your identity document",
          isRequired: true,
          allowMultiple: false,
          acceptedTypes: "image/png",
          maxSize: 10_000,
          sourceType: "camera",
        },
        // {
        //   format: null,
        //   name: "applicant_documents_identity_document",
        //   required: true,
        //   title: "Identity Document",
        //   type: "upload",
        // },
      ],
      title: "Identity Verification",
    },
    {
      description: null,
      fields: [
        {
          type: "text",
          name: "applicant_employment_employer_name",
          title: "Employer Name",
          isRequired: true,
          placeholder: "Mister Spex (Pty) Ltd",
        },
        {
          type: "text",
          name: "applicant_employment_occupation",
          title: "Occupation",
          isRequired: true,
          placeholder: "Supervisor",
        },
        {
          type: "text",
          name: "applicant_employment_salary",
          title: "Salary",
          isRequired: true,
          inputType: "number",
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
