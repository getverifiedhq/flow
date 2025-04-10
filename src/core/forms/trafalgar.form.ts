import { addDays, addMonths, endOfMonth, startOfDay, subYears } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { IForm } from "../types";

export const FORM_TRAFALGAR: IForm = {
  id: "trafalgar",
  image: "https://www.trafalgar.co.za/front/images/header-logo.webp",
  sections: [
    {
      description: null,
      fields: [
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
          inputType: "date",
          min: addDays(new Date(), 8).toISOString(),
        },
        {
          type: "dropdown",
          name: "source",
          title: "How did you find this property?",
          isRequired: true,
          choices: [
            "Our Website",
            "DigsConnect",
            "Facebook",
            "Instagram",
            "Private Property",
            "Property24",
            "Word of Mouth",
          ],
        },
      ],
      onChange: (obj, formik) => {
        if (obj["move_in_date"]) {
          const date = startOfDay(
            fromZonedTime(
              obj["move_in_date"],
              Intl.DateTimeFormat().resolvedOptions().timeZone
            )
          );

          formik.setFieldValue(
            "move_out_date",
            formatInTimeZone(
              endOfMonth(addMonths(date, date.getDate() === 1 ? 11 : 12)),
              Intl.DateTimeFormat().resolvedOptions().timeZone,
              "yyyy-MM-dd HH:mm:ss"
            )
          );
        }
      },
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
          tags: ["identity-document"],
          description:
            "Please upload a photo of your identity document such as your South African Smart ID Card, Green ID Book or Passport.",
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
          name: "applicant_documents_bank_statements",
          title: "Bank Statements",
          tags: ["bank-statement"],
          description:
            "Please upload your bank statements from the past 3 months.",
          isRequired: true,
          sourceType: "camera",
        },
        {
          type: "file",
          name: "applicant_documents_payslips",
          title: "Payslips",
          tags: ["payslip", "other"],
          description: "Please upload your payslips from the past 3 months.",
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
          type: "text",
          name: "applicant_reference_address",
          title: "Current or most recent address",
          isRequired: true,
          placeholder:
            "Unit B22, 14 Milton Road, Sea Point, Cape Town, 8060, South Africa",
        },
        {
          type: "text",
          name: "applicant_reference_contact_name",
          title: "Name of Landlord/Agency",
          isRequired: true,
        },
        {
          type: "text",
          name: "applicant_reference_contact_email_address",
          title: "Email Address of Landlord/Agency",
          isRequired: true,
          inputType: "email",
        },
        {
          type: "text",
          name: "applicant_reference_contact_mobile_number",
          title: "Mobile Number of Landlord/Agency",
          isRequired: true,
          inputType: "tel",
        },
      ],
      title: "Reference",
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
  url: null,
  webhook: null,
};
