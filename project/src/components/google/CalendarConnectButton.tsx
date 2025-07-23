import { updateGoogleCredentials } from "@/api/google";
import { AgentContext } from "@/contexts/AgentContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";

export const CalendarConnectButton = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const { agent } = useContext(AgentContext);
  const login = useGoogleLogin({
    flow: "auth-code", // use auth code flow
    ux_mode: "popup", // or 'redirect' if preferred
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: async (codeResponse) => {
      const { code } = codeResponse;
      const body = { code, account_id: userId, chatbot_id: agent?.id };
      await updateGoogleCredentials(body);
    },
    onError: (error) => console.error("Login failed", error),
  });

  if (children) {
    return <button onClick={() => login()}>{children}</button>;
  }
  return <button onClick={() => login()}>Connect Google Calendar</button>;
};
