export type IRecord = {
  created: number;
  data: { [key: string]: any };
  disabled: boolean;
  id: string;
  paystack: {
    transaction: {
      reference: string;
    };
  } | null;
  updated: number;
};
