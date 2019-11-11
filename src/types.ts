export interface ProjectInfo {
  id: string;
  name: string;
  description: string;
  endpoint: string;
}

export interface StepInfo {
  name: string;
  description: string;
  endpoint?: string;
  method?: string;
  parameters?: StepParam[];
}

export interface StepParam {
  id: string;
  type: string;
  name: string;
  // description?: string;
  // required?: boolean;
}
