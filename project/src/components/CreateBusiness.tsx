import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Save, ArrowLeft } from "lucide-react";
import { AgentContext } from "@/contexts/AgentContext";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

interface CreateBusinessProps {
  onBack: () => void;
}

const categories = [
  "Beauty & Wellness",
  "Healthcare",
  "Fitness",
  "Restaurant",
  "Automotive",
  "Professional Services",
  "Home Services",
  "Education",
  "Entertainment",
  "Retail",
  "Other",
];

const businessSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  location: z.string().optional(),
  phone: z.string().optional(),
});

type BusinessForm = z.infer<typeof businessSchema>;

const CreateBusiness: React.FC<CreateBusinessProps> = ({ onBack }) => {
  const { userId } = useContext(AuthContext);
  const { createAgent } = useContext(AgentContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<BusinessForm>({
    resolver: zodResolver(businessSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: BusinessForm) => {
    const agent = await createAgent({ ...data, account_id: userId });
    onBack();
  };

  const InputField = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder,
  }: {
    label: string;
    name: keyof BusinessForm;
    type?: string;
    required?: boolean;
    placeholder?: string;
  }) => (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Business
            </h1>
            <p className="text-gray-600">
              Set up your business profile and chatbot configuration
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Business Name"
                name="name"
                required
                placeholder="Enter your business name"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
              />

              <InputField
                label="Location"
                name="location"
                placeholder="123 Main St, City, State"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              <Save className="h-4 w-4" /> Create Business
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBusiness;
