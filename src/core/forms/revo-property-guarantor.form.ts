import { subYears } from "date-fns";
import { IForm } from "../types";

export const FORM_REVO_PROPERTY_GUARANTOR: IForm = {
  id: "revo-property-guarantor",
  image:
    "https://www.jotform.com/uploads/RevoProperty/form_files/Screenshot%202023-08-01%20at%2007.10.28.64c8a8305d94d3.56571317.png",
  payment: {
    amount: 995_00,
  },
  sections: [
    {
      description: null,
      fields: [
        {
          type: "text",
          name: "guarantor_first_name",
          title: "First Name",
          description: "Enter your first name as it appears on your ID.",
          isRequired: true,
        },
        {
          type: "text",
          name: "guarantor_last_name",
          title: "Last Name",
          description: "Enter your last name as it appears on your ID.",
          isRequired: true,
        },
        {
          type: "text",
          name: "guarantor_date_of_birth",
          title: "Date of Birth",
          isRequired: true,
          inputType: "date",
          max: subYears(new Date(), 16).toISOString(),
        },
        {
          type: "text",
          name: "guarantor_identity_number",
          title: "South African ID or Passport Number",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "guarantor_marital_status",
          title: "Marital Status",
          isRequired: true,
          choices: ["Single", "Married", "Divorced", "Other"],
        },
        {
          type: "text",
          name: "guarantor_email_address",
          title: "Email Address",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "text",
          name: "guarantor_mobile_number",
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
          name: "guarantor_documents_identity_document",
          title: "Identity Document",
          tags: ["identity-document"],
          description:
            "Please upload a photo of your identity document such as your South African Smart ID Card, Green ID Book or Passport.",
          isRequired: true,
          sourceType: "camera",
        },
        {
          type: "photo",
          name: "guarantor_documents_photo",
          title: "Photo",
          description: "Please upload a photo of yourself",
          isRequired: true,
        },
      ],
      title: "Identity Verification",
    },
    {
      description: null,
      fields: [
        {
          type: "text",
          name: "guarantor_employment_employer_name",
          title: "Employer Name",
          isRequired: true,
          placeholder: "Mister Spex (Pty) Ltd",
        },
        {
          type: "text",
          name: "guarantor_employment_occupation",
          title: "Occupation",
          isRequired: true,
          placeholder: "Supervisor",
        },
        {
          type: "text",
          name: "guarantor_employment_salary",
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
          name: "guarantor_documents_supporting_documents",
          title: "Bank Statements and Payslips",
          tags: ["bank-statement", "other"],
          description:
            "Please upload your bank statements and payslips from the past 3 months.",
          isRequired: true,
          sourceType: "camera",
        },
      ],
      title: "Supporting Documents",
    },
    {
      description: null,
      fields: [
        {
          type: "signature-pad",
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
