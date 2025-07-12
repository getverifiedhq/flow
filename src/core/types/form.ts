import { ISection } from "./section";

export type IForm = {
  id: string;

  image: string | null;

  sections: Array<ISection>;

  title: string | null;

  url: string | null;

  webhook: string | null;
};
