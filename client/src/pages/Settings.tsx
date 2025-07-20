import React, { useState, useEffect } from "react";
import Business from "@/entities/Business.json";
import { useBusiness } from "@/components/BusinessContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  ExternalLink,
  Check,
  X,
  Target,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Settings() {
  const { selectedBusiness, isLoading: isBusinessLoading } = useBusiness();
  const [businessData, setBusinessData] = useState(null);
  const [isConnecting, setIsConnecting] = useState({
    google: false,
    meta: false,
  });
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    if (selectedBusiness) {
      const defaultIntegrations = {
        google_account: { connected: false, email: "", calendar_id: "" },
        meta_account: { connected: false, page_id: "", page_name: "" },
      };
      setBusinessData({
        ...selectedBusiness,
        integrations: selectedBusiness.integrations || defaultIntegrations,
      });
    }
  }, [selectedBusiness]);

  const handleConnectionToggle = async (type, connect) => {
    setIsConnecting((prev) => ({ ...prev, [type]: true }));

    // Simulate API call
    setTimeout(async () => {
      try {
        let updatedIntegrations;
        if (type === "google") {
          updatedIntegrations = {
            ...businessData.integrations,
            google_account: connect
              ? {
                  connected: true,
                  email: "admin@example.com",
                  calendar_id: "primary",
                }
              : { connected: false, email: "", calendar_id: "" },
          };
        } else {
          // meta
          updatedIntegrations = {
            ...businessData.integrations,
            meta_account: connect
              ? {
                  connected: true,
                  page_id: "123456789",
                  page_name: "Business Page",
                }
              : { connected: false, page_id: "", page_name: "" },
          };
        }

        await Business.update(businessData.id, {
          integrations: updatedIntegrations,
        });
        setBusinessData((prev) => ({
          ...prev,
          integrations: updatedIntegrations,
        }));
        setSaveMessage({
          type: "success",
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} account ${
            connect ? "connected" : "disconnected"
          } successfully!`,
        });
      } catch (error) {
        setSaveMessage({
          type: "error",
          text: `Failed to ${
            connect ? "connect" : "disconnect"
          } ${type} account.`,
        });
      }

      setIsConnecting((prev) => ({ ...prev, [type]: false }));
      setTimeout(() => setSaveMessage(null), 3000);
    }, 1500);
  };

  if (isBusinessLoading) {
    return (
      <div className="p-8 space-y-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="w-full h-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (!selectedBusiness || !businessData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Business Selected
          </h3>
          <p className="text-gray-500">
            Please select a business from the sidebar to manage settings.
          </p>
        </div>
      </div>
    );
  }

  const googleConnected = businessData.integrations.google_account.connected;
  const metaConnected = businessData.integrations.meta_account.connected;

  return (
    <div className="p-8">
      {saveMessage && (
        <Alert
          className={`mb-6 ${
            saveMessage.type === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription
            className={
              saveMessage.type === "success" ? "text-green-700" : "text-red-700"
            }
          >
            {saveMessage.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded border border-gray-300 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">G</span>
              </div>
              Google Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  Google Calendar & Drive
                </p>
                <p className="text-sm text-gray-500">
                  {googleConnected
                    ? `Connected as ${businessData.integrations.google_account.email}`
                    : "Sync appointments and files"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={googleConnected ? "default" : "secondary"}
                  className={
                    googleConnected
                      ? "bg-green-100 text-green-700 border-green-300"
                      : ""
                  }
                >
                  {googleConnected ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3 mr-1" />
                      Disconnected
                    </>
                  )}
                </Badge>
                <Button
                  onClick={() =>
                    handleConnectionToggle("google", !googleConnected)
                  }
                  disabled={isConnecting.google}
                  size="sm"
                  variant={googleConnected ? "outline" : "default"}
                  className={
                    googleConnected
                      ? "text-red-600 border-red-300 hover:bg-red-50"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  {isConnecting.google ? (
                    "..."
                  ) : googleConnected ? (
                    "Disconnect"
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">f</span>
              </div>
              Meta Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  Facebook & Instagram
                </p>
                <p className="text-sm text-gray-500">
                  {metaConnected
                    ? `Connected to ${businessData.integrations.meta_account.page_name}`
                    : "Manage social media interactions"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={metaConnected ? "default" : "secondary"}
                  className={
                    metaConnected
                      ? "bg-green-100 text-green-700 border-green-300"
                      : ""
                  }
                >
                  {metaConnected ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3 mr-1" />
                      Disconnected
                    </>
                  )}
                </Badge>
                <Button
                  onClick={() => handleConnectionToggle("meta", !metaConnected)}
                  disabled={isConnecting.meta}
                  size="sm"
                  variant={metaConnected ? "outline" : "default"}
                  className={
                    metaConnected
                      ? "text-red-600 border-red-300 hover:bg-red-50"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  {isConnecting.meta ? (
                    "..."
                  ) : metaConnected ? (
                    "Disconnect"
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
