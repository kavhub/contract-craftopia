export interface Contract {
  id: number;
  name: string;
  type: string;
  dateUploaded: string;
  status: string;
  currency?: string;
  value?: number;
  parties?: string[];
  restrictions?: string;
  terms?: Record<string, string>;
}