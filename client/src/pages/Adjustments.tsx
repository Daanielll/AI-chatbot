import React, { useState, useEffect } from "react";
import Business from "@/entities/Business.json";
import { useBusiness } from "@/components/BusinessContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Tag,
  Clock,
  DollarSign,
  Settings,
  Target,
  AlertCircle,
  AlertTriangle,
  Bell,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BUSINESS_CATEGORIES = [
  "restaurant",
  "salon",
  "fitness",
  "healthcare",
  "retail",
  "professional_services",
  "automotive",
  "beauty",
  "education",
  "entertainment",
];

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function Adjustments() {
  const { selectedBusiness, isLoading: isBusinessLoading } = useBusiness();
  const [businessData, setBusinessData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    if (selectedBusiness) {
      const defaultData = {
        ...selectedBusiness,
        custom_prompt: selectedBusiness.custom_prompt || "",
        immediate_constraint: selectedBusiness.immediate_constraint || "",
        business_hours: selectedBusiness.business_hours || getDefaultHours(),
        pricing: selectedBusiness.pricing || {
          currency: "USD",
          base_rate: 50,
          premium_rate: 75,
          consultation_fee: 25,
        },
        constraints: selectedBusiness.constraints || {
          max_daily_appointments: 50,
          booking_window_days: 30,
          cancellation_hours: 24,
          max_party_size: 6,
        },
        notifications: selectedBusiness.notifications || {
          reminders_enabled: true,
          reminder_hours_before: 24,
          booking_success_message:
            "Your appointment is confirmed! We look forward to seeing you.",
        },
      };
      setBusinessData(defaultData);
    }
  }, [selectedBusiness]);

  const getDefaultHours = () => {
    const defaultHours = {};
    DAYS.forEach((day) => {
      defaultHours[day] = {
        open: "09:00",
        close: "17:00",
        closed: day === "sunday",
      };
    });
    return defaultHours;
  };

  const handleSave = async () => {
    if (!businessData) return;
    setIsSaving(true);
    try {
      await Business.update(businessData.id, businessData);
      setSaveMessage({ type: "success", text: "Changes saved successfully!" });
    } catch (error) {
      setSaveMessage({
        type: "error",
        text: "Failed to save changes. Please try again.",
      });
    }
    setIsSaving(false);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const updateBusinessData = (field, value) =>
    setBusinessData((prev) => ({ ...prev, [field]: value }));
  const updateNestedData = (parent, field, value) =>
    setBusinessData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  const updateHours = (day, field, value) =>
    setBusinessData((prev) => ({
      ...prev,
      business_hours: {
        ...prev.business_hours,
        [day]: { ...prev.business_hours[day], [field]: value },
      },
    }));

  if (isBusinessLoading) {
    return (
      <div className="p-8 space-y-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
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
            Please select a business from the sidebar to make adjustments.
          </p>
        </div>
      </div>
    );
  }

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
        <Card className="border-red-400 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Immediate Action
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label
                htmlFor="immediate_constraint"
                className="text-sm font-medium text-gray-700"
              >
                Immediate Override
              </Label>
              <Textarea
                id="immediate_constraint"
                value={businessData.immediate_constraint || ""}
                onChange={(e) =>
                  updateBusinessData("immediate_constraint", e.target.value)
                }
                placeholder="e.g., Closed today due to emergency."
                className="mt-1 min-h-[80px] bg-white"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-red-600">
                This will override standard operations. Clear it when no longer
                needed.
              </p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => updateBusinessData("immediate_constraint", "")}
              >
                Clear Override
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Business Category & Prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </Label>
              <select
                id="category"
                value={businessData.category}
                onChange={(e) => updateBusinessData("category", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1).replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label
                htmlFor="prompt"
                className="text-sm font-medium text-gray-700"
              >
                Custom Business Data
              </Label>
              <Textarea
                id="prompt"
                value={businessData.custom_prompt}
                onChange={(e) =>
                  updateBusinessData("custom_prompt", e.target.value)
                }
                placeholder="Add specific information about your business, services, policies, etc."
                className="mt-1 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DAYS.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24">
                    <Label className="text-sm font-medium text-gray-700 capitalize">
                      {day}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!businessData.business_hours[day]?.closed}
                      onCheckedChange={(checked) =>
                        updateHours(day, "closed", !checked)
                      }
                    />
                    <span className="text-sm text-gray-500">Open</span>
                  </div>
                  {!businessData.business_hours[day]?.closed && (
                    <>
                      <Input
                        type="time"
                        value={
                          businessData.business_hours[day]?.open || "09:00"
                        }
                        onChange={(e) =>
                          updateHours(day, "open", e.target.value)
                        }
                        className="w-32"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        value={
                          businessData.business_hours[day]?.close || "17:00"
                        }
                        onChange={(e) =>
                          updateHours(day, "close", e.target.value)
                        }
                        className="w-32"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Customer Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Appointment Reminders
              </Label>
              <div className="flex items-center space-x-2 mt-2 p-3 bg-gray-50 rounded-lg border">
                <Switch
                  id="reminders_enabled"
                  checked={businessData.notifications.reminders_enabled}
                  onCheckedChange={(c) =>
                    updateNestedData("notifications", "reminders_enabled", c)
                  }
                />
                <Label htmlFor="reminders_enabled" className="cursor-pointer">
                  Enable automatic reminders
                </Label>
              </div>
              {businessData.notifications.reminders_enabled && (
                <div className="mt-4 pl-4">
                  <Label htmlFor="reminder_hours_before">
                    Send reminder (hours before)
                  </Label>
                  <Input
                    id="reminder_hours_before"
                    type="number"
                    value={businessData.notifications.reminder_hours_before}
                    onChange={(e) =>
                      updateNestedData(
                        "notifications",
                        "reminder_hours_before",
                        parseInt(e.target.value)
                      )
                    }
                    className="mt-1 w-32"
                  />
                </div>
              )}
            </div>
            <Separator />
            <div>
              <Label htmlFor="booking_success_message">
                Booking Success Message
              </Label>
              <Textarea
                id="booking_success_message"
                value={businessData.notifications.booking_success_message}
                onChange={(e) =>
                  updateNestedData(
                    "notifications",
                    "booking_success_message",
                    e.target.value
                  )
                }
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseRate">Base Rate</Label>
                <Input
                  id="baseRate"
                  type="number"
                  value={businessData.pricing.base_rate}
                  onChange={(e) =>
                    updateNestedData(
                      "pricing",
                      "base_rate",
                      parseFloat(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="premiumRate">Premium Rate</Label>
                <Input
                  id="premiumRate"
                  type="number"
                  value={businessData.pricing.premium_rate}
                  onChange={(e) =>
                    updateNestedData(
                      "pricing",
                      "premium_rate",
                      parseFloat(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="consultationFee">Consultation Fee</Label>
                <Input
                  id="consultationFee"
                  type="number"
                  value={businessData.pricing.consultation_fee}
                  onChange={(e) =>
                    updateNestedData(
                      "pricing",
                      "consultation_fee",
                      parseFloat(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={businessData.pricing.currency}
                  onChange={(e) =>
                    updateNestedData("pricing", "currency", e.target.value)
                  }
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Constraints
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxAppointments">Max Daily Appointments</Label>
                <Input
                  id="maxAppointments"
                  type="number"
                  value={businessData.constraints.max_daily_appointments}
                  onChange={(e) =>
                    updateNestedData(
                      "constraints",
                      "max_daily_appointments",
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bookingWindow">Booking Window (Days)</Label>
                <Input
                  id="bookingWindow"
                  type="number"
                  value={businessData.constraints.booking_window_days}
                  onChange={(e) =>
                    updateNestedData(
                      "constraints",
                      "booking_window_days",
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cancellationHours">Cancellation Hours</Label>
                <Input
                  id="cancellationHours"
                  type="number"
                  value={businessData.constraints.cancellation_hours}
                  onChange={(e) =>
                    updateNestedData(
                      "constraints",
                      "cancellation_hours",
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxPartySize">Max Party Size</Label>
                <Input
                  id="maxPartySize"
                  type="number"
                  value={businessData.constraints.max_party_size}
                  onChange={(e) =>
                    updateNestedData(
                      "constraints",
                      "max_party_size",
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
