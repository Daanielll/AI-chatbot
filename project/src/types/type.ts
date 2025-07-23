interface Business {
  id: string;
  name: string;
  category: string;
}

interface Service {
  name: string;
  price: number;
  duration: number;
}

interface DayHours {
  open: string;
  close: string;
}

interface BusinessHours {
  monday: DayHours[];
  tuesday: DayHours[];
  wednesday: DayHours[];
  thursday: DayHours[];
  friday: DayHours[];
  saturday: DayHours[];
  sunday: DayHours[];
}

interface Constraint {
  id: string;
  text: string;
  timestamp: string;
}

export interface FormData {
  businessHours: BusinessHours;
  pricing: {
    services: Service[];
  };

  businessData: {
    description: string;
    specialties: string;
    policies: string;
  };
  immediateConstraint: string;
  activeConstraints: Constraint[];
  remindersEnabled: boolean;
  reminderHoursBefore: string;
  bookingSuccessMessage: string;
  category: string;
}

export interface AdjustmentsProps {
  selectedBusiness: Business | null;
}
