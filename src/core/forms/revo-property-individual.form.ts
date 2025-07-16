import { addDays, addMonths, endOfMonth, startOfDay, subYears } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { IForm } from "../types";

export const FORM_REVO_PROPERTY_INDIVIDUAL: IForm = {
  id: "individual",
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
          placeholder: "Start typing...",
          choicesByUrl: {
            path: "",
            titleName: "Display Name",
            url: "https://api.getverified.co.za/api/v1/google/sheets/1_3UVauf8_w-miT2b_mCX9T-19j5psAXaZOnh6NFeT9A?name=Listings",
            valueName: "Address",
          },
        },
        {
          type: "text",
          name: "listing_room_or_unit_number",
          title: "Room or Unit Number (optional)",
          description: "Please specify your room or unit number",
          isRequired: false,
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
          inputType: "date",
          min: addDays(new Date(), 8).toISOString(),
        },
        {
          type: "dropdown",
          name: "agent",
          title: "Which rental agent have you been in touch with?",
          isRequired: true,
          choicesByUrl: {
            path: "",
            titleName: "Name",
            url: "https://api.getverified.co.za/api/v1/google/sheets/1_3UVauf8_w-miT2b_mCX9T-19j5psAXaZOnh6NFeT9A?name=Agents",
            valueName: "Email Address",
          },
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
        {
          type: "file",
          name: "applicant_documents_visa",
          title: "Visa",
          tags: [],
          description: "Please upload a photo of your visa (if applicable)",
          isRequired: false,
          sourceType: "camera",
        },
      ],
      title: "Supporting Documents",
    },
    {
      description: null,
      fields: [
        {
          type: "long_text",
          name: "applicant_pets",
          title: "Do you have any pets?",
          isRequired: false,
          placeholder:
            "Please list the type and number of the pets you have (if any).",
        },
        {
          type: "long_text",
          name: "applicant_vehicles",
          title: "Do you have a vehicle?",
          isRequired: false,
          placeholder:
            "Please list the make, color and number plate of the vehicles you have (if any).",
        },
      ],
      title: "Additional Information",
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
          type: "checkbox",
          name: "financial_advice_a",
          title:
            "Insurance for my possessions (e.g. cellphone, laptop, car, etc)",
          isRequired: false,
        },
        {
          type: "checkbox",
          name: "financial_advice_b",
          title:
            "Investment advice such as tax-free saving accounts, retirement and other investments",
          isRequired: false,
        },
        {
          type: "checkbox",
          name: "financial_advice_c",
          title:
            "Home loan pre-approval - I'm looking at purchasing a home soon",
          isRequired: false,
        },
        {
          type: "checkbox",
          name: "financial_advice_d",
          title: "Medical aid (e.g. Discovery, Momentum, etc)",
          isRequired: false,
        },
        {
          type: "checkbox",
          name: "financial_advice_e",
          title: "Life insurance or income protection",
          isRequired: false,
        },
      ],
      title: "Financial Advice",
    },
    {
      description: null,
      fields: [
        {
          type: "signature-pad",
          name: "applicant_signature",
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
  url: null,
  webhook:
    "https://hirebarend.app.n8n.cloud/webhook/4320297d-34b7-4a55-958a-443ae6f8229d",
};
