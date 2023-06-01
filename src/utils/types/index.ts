export type TMessage = {
  id: number;
  sender: string;
  content: string;
  replaceBy?: string;
};

export enum EInputType {
  button = "button",
  textInput = "textInput",
  dropdown = "dropdown",
}

export type TypeComponent = {
  id: number;
  type: EInputType;
};
