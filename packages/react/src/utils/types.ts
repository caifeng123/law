export type Paper = {
  path: string,
  raw?: string,
  html?: string,
  formItems?: string[]
};

export type Config = {
  packages: Record<string, Record<string, Paper>>;
  forms: Record<string, string>;
  showPaperKey: string;
  showPackageKey: string;
};
