import { subYears } from "date-fns";
import { IForm } from "../types";

export const FORM_GET_VERIFIED: IForm = {
  id: "get-verified",
  image: "/images/get-verified.png",
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
          title: "South African ID Number",
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
          tags: ["identity-document"],
          description:
            "Please upload a photo of your identity document such as your South African Smart ID Card or Green ID Book",
          isRequired: true,
          sourceType: "camera",
        },
        {
          type: "photo",
          name: "applicant_documents_photo",
          title: "Photo",
          description: "Please upload a photo of yourself",
          isRequired: true,
        },
      ],
      title: "Identity Verification",
    },
    {
      description: "Who should receive your credit report?",
      fields: [
        {
          type: "text",
          name: "recipient_name",
          title: "Name",
          isRequired: true,
        },
        {
          type: "text",
          name: "recipient_email_address",
          title: "Email Address",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "text",
          name: "recipient_mobile_number",
          title: "Mobile Number",
          isRequired: true,
          inputType: "tel",
        },
      ],
      title: "Recipient",
    },
    {
      description: null,
      fields: [
        {
          type: "signature-pad",
          name: "signature",
          title: "Signature",
          description:
            "I, hereby consent to <b>Get Verified</b> and its authorized agents to access my credit information for the purpose of assessing my creditworthiness in relation to <b>a rental agreement</b>.<br /><br />I understand that this may involve obtaining my credit report from registered credit bureaus in accordance with the <a href=https://www.gov.za/sites/default/files/gcis_document/201409/a34-050_1.pdf target=_blank>National Credit Act</a> and the <a href=https://www.gov.za/sites/default/files/gcis_document/201409/3706726-11act4of2013popi.pdf target=_blank>Protection of Personal Information Act (POPIA)</a>.",
          isRequired: true,
          placeholder: "Sign",
        },
      ],
      title: "Consent",
    },
  ],
  title: "Rental Application",
};
