import React, { useContext, useState } from "react";
import {
  Link,
  Unlink,
  CheckCircle,
  AlertCircle,
  Settings as SettingsIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { CalendarConnectButton } from "./google/CalendarConnectButton";
import { AgentContext } from "@/contexts/AgentContext";

interface Business {
  id: string;
  name: string;
  category: string;
}

interface SettingsProps {
  selectedBusiness: Business | null;
}

const Settings: React.FC<SettingsProps> = ({ selectedBusiness }) => {
  const { agent } = useContext(AgentContext);
  const [googleAccount, setGoogleAccount] = useState({
    connected: agent?.google_connections?.length > 0,
    email: agent?.google_connections?.[0]?.email || "",
    lastSync: agent?.google_connections?.[0]?.created_at || "",
  });

  const [metaAccount, setMetaAccount] = useState({
    connected: false,
    email: "",
    lastSync: "",
  });

  const handleConnectGoogle = () => {
    // Implementation for Google account connection
    console.log("Connecting Google account...");
  };

  const handleDisconnectGoogle = () => {
    setGoogleAccount({
      connected: false,
      email: "",
      lastSync: "",
    });
  };

  const handleConnectMeta = () => {
    setMetaAccount({
      connected: true,
      email: "business@example.com",
      lastSync: "Just now",
    });
  };

  const handleDisconnectMeta = () => {
    setMetaAccount({
      connected: false,
      email: "",
      lastSync: "",
    });
  };

  if (!selectedBusiness) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <SettingsIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Business Selected
          </h3>
          <p className="text-muted-foreground">
            Create or select a business to manage settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-muted">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {selectedBusiness.name}
          </h1>
          <p className="text-muted-foreground mt-1">Account Settings</p>
        </div>

        {/* Google Account Integration */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Google Account</CardTitle>
                <CardDescription>
                  Connect your Google account for calendar integration
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {googleAccount.connected ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              )}
              <span
                className={`text-sm font-medium ${
                  googleAccount.connected
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {googleAccount.connected ? "Connected" : "Not Connected"}
              </span>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            {googleAccount.connected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 mt-5">
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {googleAccount.email}
                    </p>
                    <p className="text-sm text-green-700">
                      Last sync: {googleAccount.lastSync}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDisconnectGoogle}
                  >
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Connect your Google account to enable calendar integration
                </p>
                <CalendarConnectButton>
                  <Button onClick={handleConnectGoogle} className="mx-auto">
                    <Link className="h-4 w-4 mr-2" />
                    Connect Google Account
                  </Button>
                </CalendarConnectButton>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Meta Account Integration */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Meta Account</CardTitle>
                <CardDescription>
                  Connect your Meta account for Facebook and Instagram
                  integration
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {metaAccount.connected ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              )}
              <span
                className={`text-sm font-medium ${
                  metaAccount.connected
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {metaAccount.connected ? "Connected" : "Not Connected"}
              </span>
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            {metaAccount.connected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 mt-5">
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {metaAccount.email}
                    </p>
                    <p className="text-sm text-green-700">
                      Last sync: {metaAccount.lastSync}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDisconnectMeta}
                  >
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Connect your Meta account to enable Facebook and Instagram
                  integration
                </p>
                <Button onClick={handleConnectMeta} className="mx-auto">
                  <Link className="h-4 w-4 mr-2" />
                  Connect Meta Account
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
