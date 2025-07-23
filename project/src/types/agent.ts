import { GoogleConnection } from "./google";

export interface AgentType {
  id: string;
  name: string;
  created_at: Date;
  account_id: string;
  additional_details: string;
  location: string;
  reminders: string;
  category_id: number;
  phone_number: string;
  phone_number_id: number;
  google_connections: GoogleConnection[];
}
