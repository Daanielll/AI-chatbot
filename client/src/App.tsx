import React from "react";
import { Link, useLocation } from "react-router-dom";
// import { createPageUrl } from "@/utils";
import { BusinessProvider, useBusiness } from "@/components/BusinessContext";
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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Analytics", url: "Analytics", icon: BarChart3 },
  { title: "Adjustments", url: "Adjustments", icon: Sliders },
  { title: "Settings", url: "Settings", icon: Settings },
];

function BusinessSelector() {
  const { businesses, selectedBusiness, handleBusinessChange, isLoading } =
    useBusiness();

  if (isLoading) {
    return (
      <div className="w-full h-[76px] bg-gray-100 rounded-lg animate-pulse" />
    );
  }

  return (
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
              onSelect={() => handleBusinessChange(business)}
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
        <DropdownMenuItem disabled className="py-2">
          <PlusCircle className="w-4 h-4 mr-2" />
          <span>Create New Business</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppLayout({ children, currentPageName }) {
  const location = useLocation();
  const { selectedBusiness } = useBusiness();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                ChatBot Pro
              </h1>
              <p className="text-sm text-gray-500">Management Console</p>
            </div>
          </div>
          <BusinessSelector />
        </div>

        {/* Navigation */}
        {/* <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === createPageUrl(item.url);
              return (
                <Link
                  key={item.title}
                  to={createPageUrl(item.url)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav> */}

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium">A</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-xs">System Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {currentPageName}
              </h2>
              {selectedBusiness && (
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  Managing {selectedBusiness.name} •{" "}
                  {selectedBusiness.category.replace("_", " ")}
                </p>
              )}
            </div>
            {selectedBusiness && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">
                  Active
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default function LayoutWrapper(props) {
  return (
    <BusinessProvider>
      <AppLayout {...props} />
    </BusinessProvider>
  );
}
