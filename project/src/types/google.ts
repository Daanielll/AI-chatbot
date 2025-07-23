export type GoogleConnection = {
  id: string;
  email: string;
  expiry: string; // ISO timestamp, can be parsed as Date if needed
  scopes: string[];
  client_id: string;
  token_uri: string;
  account_id: string;
  chatbot_id: number;
  created_at: string;
  access_token: string;
  client_secret: string;
  refresh_token: string;
};
