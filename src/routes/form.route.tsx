import { FormComponent } from "../components/form.component";
import { IForm } from "../core";

const FORM: IForm = {
  image:
    "https://www.jotform.com/uploads/RevoProperty/form_files/Screenshot%202023-08-01%20at%2007.10.28.64c8a8305d94d3.56571317.png",
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
          title: "When would you like to move-in?",
          isRequired: true,
          inputType: "date",
        },
        {
          type: "text",
          name: "move_out_date",
          title: "When would you like to move-out?",
          isRequired: false,
          inputType: "date",
        },
        {
          type: "dropdown",
          name: "source",
          title: "How did you find this property?",
          isRequired: true,
          choices: [
            "Revo Property's Website",
            "Facebook",
            "Instagram",
            "Property24",
            "Private Property",
            "DigsConnect",
            "Word of Mouth",
          ],
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
          description: "Enter your first name as it appears on your ID.",
          isRequired: true,
        },
        {
          type: "text",
          name: "applicant_last_name",
          title: "Last Name",
          description: "Enter your last name as it appears on your ID.",
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
          description:
            "Please upload a photo of your identity document such as your South African Smart ID Card, Green ID Book or Passport.",
          isRequired: true,
          allowMultiple: false,
          acceptedTypes: "image/png",
          maxSize: 10_000,
          sourceType: "camera",
        },
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
    {
      description: null,
      fields: [
        {
          type: "file",
          name: "applicant_documents_supporting_documents",
          title: "Identity Document",
          description:
            "Please upload a photo of your identity document such as your South African Smart ID Card, Green ID Book or Passport.",
          isRequired: true,
          allowMultiple: false,
          acceptedTypes: "image/png",
          maxSize: 10_000,
          sourceType: "camera",
        },
      ],
      title: "Supporting Documents",
    },
  ],
};

export function FormRoute() {
  return (
    <>
      <FormComponent data={{}} form={FORM} onSubmit={async () => {}} />
    </>
  );
}
