import { addDays, subYears } from "date-fns";
import { IForm } from "./types";

export const BASE_FORM: IForm = {
  id: "",
  image: "",
  payment: null,
  sections: [
    {
      description: null,
      fields: [
        {
          type: "dropdown",
          name: "listing",
          title: "Which property are you applying for?",
          isRequired: true,
          placeholder: "Start typing...",
          choices: [
            "14 Milton Rd, Sea Point, Cape Town, 8060, South Africa",
            "37 Hely Hutchinson Ave, Bakoven, Cape Town, 8005, South Africa",
            "47 Main Rd, Green Point, Cape Town, 8051, South Africa",
            "63 Blaauwberg Rd, Table View, Cape Town, 7439, South Africa",
          ],
          choicesByUrl: {
            path: "",
            titleName: "label",
            url: "",
            valueName: "id",
          },
        },
        {
          type: "text",
          name: "move_in_date",
          title: "When would you like to move-in?",
          isRequired: true,
          inputType: "date",
          min: addDays(new Date(), 8).toISOString(),
        },
        {
          type: "text",
          name: "move_out_date",
          title: "When would you like to move-out? (optional)",
          isRequired: false,
          inputType: "month",
          min: addDays(new Date(), 8).toISOString(),
        },
        {
          type: "dropdown",
          name: "agent",
          title: "Which rental agent have you been in touch with?",
          isRequired: true,
          choices: [
            "Steve",
            "Nicole",
            "Andre",
            "Tatum",
            "Retha",
            "JP",
            "Kelly",
          ],
          choicesOrder: "asc",
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
          max: subYears(new Date(), 16).toISOString(),
        },
        {
          type: "text",
          name: "applicant_identity_number",
          // title: "Identity Number",
          title: "South African ID or Passport Number",
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
          inputType: "currency",
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
          title: "Bank Statements and Payslips",
          description:
            "Please upload your bank statements and payslips from the past 3 months.",
          isRequired: true,
          allowMultiple: false,
          acceptedTypes: "image/png",
          maxSize: 10_000,
          sourceType: "camera",
        },
      ],
      title: "Supporting Documents",
    },
    {
      description: null,
      fields: [
        {
          type: "signaturepad",
          name: "signature",
          title: "Signature",
          description:
            "By signing below, I hereby declare and that the information provided is true and correct to the best of my knowledge and this application does not constitute a binding rental contract between me and Revo Property.<br /><br />I agree and consent to Revo Property Pty Ltd, using the above information to run a credit check and other background checks in order to verify the information provided. I give consent for Revo Pty Ltd and its group of companies, Anchor Group Limited (FSP:39834), Carl Greaves Brokers (Pty) Ltd (FSP 13147) and the Betterbond Group (Bettersure Financial Consultants (Pty) Ltd) to contact me using the above contact information in order for them to assist me with real estate, investment, insurance and bond origination advice or services.<br /><br />Please note that if you are approved, there will be a once-off lease drafting fee calculated at 11.5% including VAT on the monthly rental value.",
          isRequired: true,
          placeholder: "Sign",
        },
      ],
      title: "Consent",
    },
  ],
  title: "Rental Application",
};

export const FORM_GET_VERIFIED: IForm = {
  id: "get-verified",
  image: "/images/get-verified.png",
  payment: {
    amount: 225_00,
  },
  sections: [
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
          max: subYears(new Date(), 16).toISOString(),
        },
        {
          type: "text",
          name: "applicant_identity_number",
          // title: "Identity Number",
          title: "South African ID or Passport Number",
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
          inputType: "currency",
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
          title: "Bank Statements and Payslips",
          description:
            "Please upload your bank statements and payslips from the past 3 months.",
          isRequired: true,
          allowMultiple: false,
          acceptedTypes: "image/png",
          maxSize: 10_000,
          sourceType: "camera",
        },
      ],
      title: "Supporting Documents",
    },
    {
      description: null,
      fields: [
        {
          type: "signaturepad",
          name: "signature",
          title: "Signature",
          description:
            "I hereby consent to Get Verified and its authorized agents to access my credit information for the purpose of assessing my creditworthiness in relation to a rental agreement.<br /><br />I understand that this may involve obtaining my credit report from registered credit bureaus in accordance with the National Credit Act and the Protection of Personal Information Act (POPIA).",
          isRequired: true,
          placeholder: "Sign",
        },
      ],
      title: "Consent",
    },
  ],
  title: "Rental Application",
};

export const FORM_QUAY1_INTERNATIONAL_REALTY: IForm = {
  ...BASE_FORM,
  id: "quay1-international-realty",
  image: "/images/quay-1-international-realty.svg",
  payment: {
    amount: 350_00,
  },
};

export const FORM_REVO_PROPERTY: IForm = {
  ...BASE_FORM,
  id: "revo-property",
  image:
    "https://www.jotform.com/uploads/RevoProperty/form_files/Screenshot%202023-08-01%20at%2007.10.28.64c8a8305d94d3.56571317.png",
  payment: {
    amount: 995_00,
  },
};
