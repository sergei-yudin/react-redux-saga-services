export interface ServiceSummary {
  id: number;
  name: string;
  price: number;
}

export interface ServiceDetails extends ServiceSummary {
  content: string;
}
