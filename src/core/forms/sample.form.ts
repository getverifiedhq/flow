import { IForm } from "../types";

export const FORM_SAMPLE: IForm = {
  id: "sample",
  image: "/images/get-verified.png",
  sections: [
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
          type: "file",
          name: "applicant_documents_supporting_documents",
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
  ],
  title: "Sample Application",
  webhook: null,
};
