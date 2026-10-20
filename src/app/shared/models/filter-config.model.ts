export interface FilterConfig {
  formName: string;
  labelTemplate?: string;
  mappings: {
    formFieldName: string;
    paramName: string;
    paramApiName: string;
  }[];
  formatLabel: (value: any, filterConfig?: FilterConfig) => string;
}
