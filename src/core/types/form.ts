import { ISection } from "./section";

export type IForm = {
  id: string;

  image: string | null;

  payment: {
    amount: number;
  } | null;

  sections: Array<ISection>;

  title: string | null;
};
