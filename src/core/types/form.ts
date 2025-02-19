import { ISection } from "./section";

export type IForm = {
  image: string;

  payment: boolean;

  sections: Array<ISection>;

  title: string;
};
