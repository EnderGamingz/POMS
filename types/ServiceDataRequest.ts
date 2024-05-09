export type ServiceDataRequestBody = {
  token: string;
  incidents: ServiceIncident[]
}

export type ServiceIncident = {
  location?: string[];
  area_codes: number[];
  start_time: string;
  end_time?: string;
  planned: boolean;
  description: string;
  additional_information?: string;
  affected_customers?: number;
};