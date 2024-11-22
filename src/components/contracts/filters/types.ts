export type FilterOperator = 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'between' | 'in';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: string | number | string[];
  logic?: 'AND' | 'OR';
}

export interface FilterGroup {
  logic: 'AND' | 'OR';
  conditions: (FilterCondition | FilterGroup)[];
}

export const FILTER_FIELDS = [
  { id: 'name', label: 'Contract Name', type: 'text' },
  { id: 'type', label: 'Contract Type', type: 'select' },
  { id: 'status', label: 'Status', type: 'select' },
  { id: 'value', label: 'Value', type: 'number' },
  { id: 'dateUploaded', label: 'Upload Date', type: 'date' },
] as const;

export const OPERATORS: Record<string, { label: string; appliesTo: string[] }> = {
  equals: { label: 'Equals', appliesTo: ['text', 'select', 'number', 'date'] },
  contains: { label: 'Contains', appliesTo: ['text'] },
  greaterThan: { label: 'Greater than', appliesTo: ['number', 'date'] },
  lessThan: { label: 'Less than', appliesTo: ['number', 'date'] },
  between: { label: 'Between', appliesTo: ['number', 'date'] },
  in: { label: 'Is any of', appliesTo: ['text', 'select'] },
};