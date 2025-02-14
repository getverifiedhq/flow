import { IField } from "./field";

export type ISection = {
  description: string | null;

  fields: Array<IField>;

  title: string;
};
