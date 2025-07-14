export type IRecord = {
  created: number;

  data: Record<string, any>;

  disabled: boolean;

  id: string;

  metadata: Record<string, string | undefined>;

  payment: {
    transaction: {
      reference: string;
    };
  } | null;

  webhook: string | null;

  updated: number;
};
