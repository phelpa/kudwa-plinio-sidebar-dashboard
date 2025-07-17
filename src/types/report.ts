export interface UniqueReference {
  sheetType: string;
  integrationSourceId: number;
  sourceType: string;
  accountId: string;
  accountName: string;
  metric: boolean;
}

export interface ActualData {
  id: number;
  topLevelFieldId: number | null;
  fieldId: number;
  value: number[];
  yearly: number[];
  quarterly: number[];
  yearlyPastMonth: number[];
  quarterlyPastMonth: number[];
  yearlyResult: number[];
  quarterlyResult: number[];
}

export interface ReportField {
  id: number;
  topLevelFieldId: number;
  name: string;
  code: string | null;
  uniqueReference: UniqueReference;
  order: number | null;
  description: string | null;
  style: string | null;
  fieldType: string | null;
  createdAt: string;
  updatedAt: string;
  fieldId: number | null;
  outputs: unknown[];
  actualData: ActualData[];
  fields?: ReportField[]; // For nested fields
}

export interface TopLevelField {
  id: number;
  financialReportId: number;
  name: string;
  type: string;
  description: string | null;
  style: string | null;
  createdAt: string;
  updatedAt: string;
  outputs: unknown[];
  actualData: ActualData[];
  fields: ReportField[];
}

export interface ReportResult {
  id: number;
  scenarioId: number;
  startingDate: string;
  endingDate: string;
  createdAt: string;
  updatedAt: string;
  profitnLoss: TopLevelField[];
  cashFlow?: TopLevelField[];
  balanceSheet?: TopLevelField[];
}

export interface ReportData {
  reportResult: ReportResult;
}

export type PeriodType = "monthly" | "quarterly" | "yearly";
