import React from "react";
import {
  Clock,
  DollarSign,
  AlertCircle,
  Save,
  Zap,
  Bell,
  X,
  Tag,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Business {
  id: string;
  name: string;
  category: string;
}

interface AdjustmentsProps {
  selectedBusiness: Business | null;
}

// Mock data for all states
const mockData = {
  businessHours: {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "10:00", close: "15:00", closed: false },
    sunday: { open: "10:00", close: "15:00", closed: true },
  },
  pricing: {
    basePrice: "50",
    maxDiscount: "20",
    rushHourMultiplier: "1.5",
  },
  constraints: {
    maxDailyAppointments: "50",
    minAdvanceBooking: "1",
    maxAdvanceBooking: "30",
    cancellationWindow: "24",
  },
  businessData: {
    description: "Professional salon services with experienced stylists",
    specialties: "Hair cuts, coloring, styling, treatments",
    policies: "Please arrive 10 minutes early for your appointment",
  },
  immediateConstraint: "",
  activeConstraints: [
    {
      id: "1",
      text: "Closed for maintenance on Dec 15th",
      timestamp: "2 hours ago",
    },
    { id: "2", text: "No walk-ins accepted this week", timestamp: "1 day ago" },
  ],
};

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const Adjustments: React.FC<AdjustmentsProps> = ({ selectedBusiness }) => {
  // All data comes from mockData
  const businessHours = mockData.businessHours;
  const pricing = mockData.pricing;
  const constraints = mockData.constraints;
  const businessData = mockData.businessData;
  const immediateConstraint = mockData.immediateConstraint;
  const activeConstraints = mockData.activeConstraints;

  if (!selectedBusiness) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Business Selected
          </h3>
          <p className="text-gray-500">
            Please select a business to make adjustments
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedBusiness.name}
          </h1>
          <p className="text-gray-600 mt-1">Business Adjustments</p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            <span className="text-sm font-medium">
              Category: {selectedBusiness.category}
            </span>
          </div>
        </div>

        {/* Immediate Constraints */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">
                Immediate Constraints
              </span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                Live Updates
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={immediateConstraint}
                  placeholder="e.g., I'm going on vacation for a week, Cancel all appointments today"
                  disabled
                />
                <Button
                  disabled
                  variant="default"
                  className="opacity-50 cursor-not-allowed"
                >
                  Apply Now
                </Button>
              </div>
              {activeConstraints.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Active Constraints:
                  </h4>
                  {activeConstraints.map((constraint) => (
                    <div
                      key={constraint.id}
                      className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-orange-900">
                          {constraint.text}
                        </p>
                        <p className="text-xs text-orange-700">
                          Applied {constraint.timestamp}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled
                        className="text-orange-600 opacity-50 cursor-not-allowed"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Data */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              <span className="text-2xl font-bold text-gray-900">
                Business Category & Prompt
              </span>
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
              <Select disabled value="test">
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3].map((c) => (
                    <SelectItem key={c} value={String(c)}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                value={businessData.description}
                disabled
                placeholder="Add specific information about your business, services, policies, etc."
                className="mt-1 min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointment reminders */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <span className="text-2xl font-bold text-gray-900">
                Customer Notifications
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Appointment Reminders
              </Label>
              <div className="flex items-center space-x-2 mt-2 p-3 bg-gray-50 rounded-lg border">
                <Switch id="reminders_enabled" checked={false} disabled />
                <Label htmlFor="reminders_enabled" className="cursor-pointer">
                  Enable automatic reminders
                </Label>
              </div>
              <div className="mt-4 pl-4">
                <Label htmlFor="reminder_hours_before">
                  Send reminder (hours before)
                </Label>
                <Input
                  id="reminder_hours_before"
                  type="number"
                  value="test"
                  disabled
                  className="mt-1 w-32"
                />
              </div>
            </div>
            <Separator />
            <div>
              <Label htmlFor="booking_success_message">
                Booking Success Message
              </Label>
              <Textarea
                id="booking_success_message"
                value="test"
                disabled
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-bold text-gray-900">
                Business Hours
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24">
                    <Label className="text-sm font-medium text-gray-700 capitalize">
                      {day}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={
                        !businessHours[day as keyof typeof businessHours].closed
                      }
                      disabled
                    />
                    <span className="text-sm text-gray-500">Open</span>
                  </div>
                  {!businessHours[day as keyof typeof businessHours].closed && (
                    <>
                      <Input
                        type="time"
                        value={
                          businessHours[day as keyof typeof businessHours].open
                        }
                        disabled
                        className="w-32"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="time"
                        value={
                          businessHours[day as keyof typeof businessHours].close
                        }
                        disabled
                        className="w-32"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <span className="text-2xl font-bold text-gray-900">Pricing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Price ($)
                </Label>
                <Input type="number" value={pricing.basePrice} disabled />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Discount (%)
                </Label>
                <Input type="number" value={pricing.maxDiscount} disabled />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Rush Hour Multiplier
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricing.rushHourMultiplier}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* t */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing & Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {(businessData.pricing.services || []).map((service, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-[1fr_100px_120px_auto] gap-3 items-end p-3 bg-gray-50 rounded-lg border"
                >
                  <div>
                    <Label htmlFor={`serviceName-${index}`} className="text-xs">
                      Service Name
                    </Label>
                    <Input
                      id={`serviceName-${index}`}
                      value={service.name || ""}
                      onChange={(e) =>
                        handleServiceChange(index, "name", e.target.value)
                      }
                      className="mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`servicePrice-${index}`}
                      className="text-xs"
                    >
                      Price (USD)
                    </Label>
                    <Input
                      id={`servicePrice-${index}`}
                      type="number"
                      value={service.price || 0}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`serviceDuration-${index}`}
                      className="text-xs"
                    >
                      Duration (min)
                    </Label>
                    <Input
                      id={`serviceDuration-${index}`}
                      type="number"
                      value={service.duration || 0}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "duration",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="mt-1 bg-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeService(index)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <Button
                  variant="ghost"
                  onClick={addService}
                  className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Service
                </Button>
              </div>

              {(businessData.pricing.services || []).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No services added yet. Click "Add New Service" to get started.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Operational Constraints */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-gray-600" />
              <span className="text-2xl font-bold text-gray-900">
                Operational Constraints
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Daily Appointments
                </Label>
                <Input
                  type="number"
                  value={constraints.maxDailyAppointments}
                  disabled
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Advance Booking (hours)
                </Label>
                <Input
                  type="number"
                  value={constraints.minAdvanceBooking}
                  disabled
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Advance Booking (days)
                </Label>
                <Input
                  type="number"
                  value={constraints.maxAdvanceBooking}
                  disabled
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Window (hours)
                </Label>
                <Input
                  type="number"
                  value={constraints.cancellationWindow}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            disabled
            className="flex items-center gap-2 opacity-50 cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Adjustments;
