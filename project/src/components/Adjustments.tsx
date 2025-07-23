import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Clock,
  DollarSign,
  AlertCircle,
  Zap,
  Bell,
  X,
  Tag,
  Trash2,
  Plus,
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
import { AdjustmentsProps, FormData } from "../types/type";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const data: FormData = {
  businessHours: {
    monday: [
      { open: "09:00", close: "12:00" },
      { open: "13:00", close: "17:00" },
    ],
    tuesday: [{ open: "09:00", close: "17:00" }],
    wednesday: [{ open: "09:00", close: "17:00" }],
    thursday: [{ open: "09:00", close: "17:00" }],
    friday: [{ open: "09:00", close: "17:00" }],
    saturday: [{ open: "10:00", close: "15:00" }],
    sunday: [{ open: "10:00", close: "15:00" }],
  },
  pricing: {
    services: [],
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
  remindersEnabled: false,
  reminderHoursBefore: "24",
  bookingSuccessMessage: "Your booking was successful!",
  category: "salon",
};

const categories = [
  { value: "salon", label: "Salon" },
  { value: "spa", label: "Spa" },
  { value: "clinic", label: "Clinic" },
];

const Adjustments: React.FC<AdjustmentsProps> = ({ selectedBusiness }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      ...data,
    },
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "pricing.services",
  });

  const {
    fields: constraintFields,
    append: appendConstraint,
    remove: removeConstraint,
  } = useFieldArray({
    control,
    name: "activeConstraints",
  });

  const watchedValues = watch();

  const onReset = () => {
    reset(data);
  };

  const handleImmediateConstraintApply = () => {
    const immediateConstraint = getValues("immediateConstraint");
    if (immediateConstraint.trim()) {
      appendConstraint({
        id: Date.now().toString(),
        text: immediateConstraint,
        timestamp: "just now",
      });
      setValue("immediateConstraint", "");
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    alert("Changes saved!");
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                  {...register("immediateConstraint")}
                  placeholder="e.g., I'm going on vacation for a week, Cancel all appointments today"
                />
                <Button
                  type="button"
                  variant="default"
                  onClick={handleImmediateConstraintApply}
                  disabled={!watchedValues.immediateConstraint?.trim()}
                >
                  Apply Now
                </Button>
              </div>
              {constraintFields.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Active Constraints:
                  </h4>
                  {constraintFields.map((constraint, index) => (
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
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeConstraint(index)}
                        className="text-orange-600"
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
              <Select
                value={watchedValues.category || data.category}
                onValueChange={(value) => setValue("category", value)}
              >
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Custom Business Data
              </Label>
              <Textarea
                {...register("businessData.description")}
                id="description"
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
                <Switch
                  id="reminders_enabled"
                  checked={watchedValues.remindersEnabled}
                  onCheckedChange={(checked) =>
                    setValue("remindersEnabled", checked)
                  }
                />
                <Label htmlFor="reminders_enabled" className="cursor-pointer">
                  Enable automatic reminders
                </Label>
              </div>
              <div className="mt-4 pl-4">
                <Label htmlFor="reminder_hours_before">
                  Send reminder (hours before)
                </Label>
                <Input
                  {...register("reminderHoursBefore")}
                  id="reminder_hours_before"
                  type="number"
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
                {...register("bookingSuccessMessage")}
                id="booking_success_message"
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
                <div key={day} className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <div className="w-full group">
                      <Label className="text-sm font-medium text-gray-700 capitalize flex gap-3">
                        {day}
                        <button
                          type="button"
                          onClick={() => {
                            const ranges = [
                              ...(watchedValues.businessHours?.[day] || []),
                            ];
                            ranges.push({
                              open: "09:00",
                              close: "17:00",
                            });
                            setValue(`businessHours.${day}`, ranges);
                          }}
                          className="text-xs bg-secondary text-muted-foreground p-[2px] px-2 rounded-full opacity-0 group-hover:opacity-100 duration-200"
                        >
                          + Add
                        </button>
                      </Label>
                    </div>
                  </div>
                  <div className="flex gap-4 ">
                    <Switch
                      checked={watch(`businessHours.${day}`)?.length !== 0}
                      onCheckedChange={() =>
                        watch(`businessHours.${day}`)?.length !== 0
                          ? setValue(`businessHours.${day}`, [], {
                              shouldDirty: true,
                            })
                          : setValue(
                              `businessHours.${day}`,
                              [{ open: "09:00", close: "17:00" }],
                              { shouldDirty: true }
                            )
                      }
                      className="mt-2"
                    />
                    <div className="flex gap-4 flex-col">
                      {watchedValues.businessHours?.[day]?.map(
                        (range, rangeIdx) => (
                          <div
                            key={rangeIdx}
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-gray-500">Open</span>
                            {range && (
                              <>
                                <Input
                                  {...register(
                                    `businessHours.${day}.${rangeIdx}.open`
                                  )}
                                  type="time"
                                  className="w-32"
                                />
                                <span className="text-gray-500">to</span>
                                <Input
                                  {...register(
                                    `businessHours.${day}.${rangeIdx}.close`
                                  )}
                                  type="time"
                                  className="w-32"
                                />
                              </>
                            )}
                            {rangeIdx !== 0 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const ranges = [
                                    ...(watchedValues.businessHours?.[day] ||
                                      []),
                                  ];
                                  ranges.splice(rangeIdx, 1);
                                  setValue(`businessHours.${day}`, ranges, {
                                    shouldDirty: true,
                                  });
                                }}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Services */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-gray-600" />
              <span className="text-2xl font-bold text-gray-900">Pricing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {serviceFields.map((service, index) => (
                <div
                  key={service.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_100px_120px_auto] gap-3 items-end p-3 bg-gray-50 rounded-lg border"
                >
                  <div>
                    <Label htmlFor={`serviceName-${index}`} className="text-xs">
                      Service Name
                    </Label>
                    <Input
                      {...register(`pricing.services.${index}.name`)}
                      id={`serviceName-${index}`}
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
                      {...register(`pricing.services.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      id={`servicePrice-${index}`}
                      type="number"
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
                      {...register(`pricing.services.${index}.duration`, {
                        valueAsNumber: true,
                      })}
                      id={`serviceDuration-${index}`}
                      type="number"
                      className="mt-1 bg-white"
                    />
                  </div>
                  <Button
                    type="button"
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
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    appendService({ name: "", price: 0, duration: 0 })
                  }
                  className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Service
                </Button>
              </div>

              {serviceFields.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No services added yet. Click "Add New Service" to get started.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Save changes */}
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl px-4 py-3 transition-all duration-300 ease-in-out w-fit border ${
            isDirty
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Caution! You have unsaved changes.
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                disabled={!isDirty}
                onClick={onReset}
                type="button"
              >
                Reset
              </Button>
              <Button disabled={!isDirty} type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adjustments;
