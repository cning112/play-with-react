export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  startWith: string;
}

export interface Step {
  id: string;
  name: string;
  description: string;
  parameters?: FormField[];
  results?: object;
}

export interface FormField {
  id: string;
  name: string;
  description?: string;
  type: string;
  value?: any; // only available in a saved work
  defaultValue?: any;
  requird?: boolean;
  readOnly?: boolean;
  accept?: string;
  options?: string[] | number[];
}
