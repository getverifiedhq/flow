export type IRecord = {
  created: number;
  data: { [key: string]: any };
  disabled: boolean;
  id: string;
  metadata: { [key: string]: string | undefined };
  payment: {
    transaction: {
      reference: string;
    };
  } | null;
  updated: number;
};
