import React from "react";
import {
  BarChart3,
  Settings,
  Sliders,
  ChevronsUpDown,
  Bot,
  Building,
  Check,
  PlusCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface Business {
  id: string;
  name: string;
  category: string;
}

interface SidebarProps {
  businesses: Business[];
  selectedBusiness: Business | null;
  onSelectBusiness: (business: Business) => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  isBusinessDropdownOpen: boolean; // Not used in new design, but kept for compatibility
  onToggleBusinessDropdown: () => void; // Not used in new design, but kept for compatibility
  onCreateBusiness: () => void;
}

const navigationItems = [
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "adjustments", label: "Adjustments", icon: Sliders },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  businesses,
  selectedBusiness,
  onSelectBusiness,
  currentPage,
  onPageChange,
  onCreateBusiness,
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-40 h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                NiggerBot Portal
              </h1>
              <p className="text-sm text-gray-500">Management Console</p>
            </div>
          </div>
          {/* Business Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between items-center text-left h-auto py-3 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200"
              >
                {selectedBusiness ? (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {selectedBusiness.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {selectedBusiness.category.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>Select a business</p>
                )}
                <ChevronsUpDown className="w-4 h-4 text-gray-500 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] p-2">
              <DropdownMenuLabel>Select a Business</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {businesses.map((business) => (
                  <DropdownMenuItem
                    key={business.id}
                    onSelect={() => onSelectBusiness(business)}
                    className="py-2"
                  >
                    <Building className="w-4 h-4 mr-2" />
                    <span>{business.name}</span>
                    {selectedBusiness?.id === business.id && (
                      <Check className="ml-auto w-4 h-4 text-blue-600" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={onCreateBusiness}
                className="py-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Create New Business</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  disabled={!selectedBusiness}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left
                  ${
                    isActive && selectedBusiness
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : selectedBusiness
                      ? "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      : "text-gray-400 cursor-not-allowed opacity-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
      <div className="flex-1 ml-72">{/* Page content goes here */}</div>
    </div>
  );
};

export default Sidebar;
